import { Types } from "mongoose";
import { PortfolioContentModel } from "./portfolio-content.model";
import { IPortfolioContent } from "./portfolio-content.types";
import Portfolio from "../portfolio/portfolio.model";

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}

export class ConflictException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictException";
  }
}

const createPortfolioContent = async (
  payload: Partial<IPortfolioContent>
) => {

  const portfolio = await Portfolio.findById(
    payload.portfolioId
  );

  if (!portfolio) {
    throw new NotFoundException(
      "Portfolio not found"
    );
  }

  const existingContent =
    await PortfolioContentModel.findOne({
      portfolioId: payload.portfolioId,
    });

  if (existingContent) {
    throw new ConflictException(
      "Portfolio content already exists"
    );
  }

  const result =
    await PortfolioContentModel.create(payload);

  return result;
};

const getPortfolioContentByPortfolioId =
  async (portfolioId: string) => {

    const result =
      await PortfolioContentModel.findOne({
        portfolioId,
      }).populate("portfolioId");

    if (!result) {
      throw new NotFoundException(
        "Portfolio content not found"
      );
    }

    return result;
  };


const updatePortfolioContent = async (
  portfolioId: string,
  payload: Partial<IPortfolioContent>
) => {

  const existingContent =
    await PortfolioContentModel.findOne({
      portfolioId,
    });

  if (!existingContent) {
    throw new NotFoundException(
      "Portfolio content not found"
    );
  }

  const result =
    await PortfolioContentModel.findOneAndUpdate(
      { portfolioId },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return result;
};

const getPublicPortfolioBySlug = async (slug: string) => {
  const portfolio = await Portfolio.findOne({
    slug,
    isActive: true,
  });

  if (!portfolio) {
    throw new NotFoundException("Portfolio not found");
  }

  const content = await PortfolioContentModel.findOne({
    portfolioId: portfolio._id,
    isPublished: true,
  }).populate(
    "hero.profileImage.mediaId", 'originalName fileName filePath mimeType size'
  ).populate(
    "experienceSection.experience.companyLogo.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "educationSection.education.institutionLogo.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "projectsSection.projects.coverImage.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "branding.logoImage.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "branding.favicon.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "seo.ogImage.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "theme.logo.mediaId", "originalName fileName filePath mimeType size"
  ).populate(
    "theme.resumeFile", "originalName fileName filePath mimeType size"
  );

  if (!content) {
    throw new NotFoundException("Portfolio content not published");
  }

  return {
    _id: content._id,

    portfolio: {
      id: portfolio._id,
      name: portfolio.name,
      slug: portfolio.slug,
    },

    hero: content.hero,
    expertiseSection: content.expertiseSection,
    skillsSection: content.skillsSection,
    experienceSection: content.experienceSection,
    projectsSection: content.projectsSection,
    educationSection: content.educationSection,
    contactSection: content.contactSection,
    seo: content.seo,
    branding: content.branding,
    footer: content.footer,
    theme: content.theme,
    navigation: content.navigation,
    sectionConfig: content.sectionConfig,
    socialLinks: content.socialLinks,
    isPublished: content.isPublished,
    publishedAt: content.publishedAt,
    createdAt: content.createdAt,
    updatedAt: content.updatedAt,
  };
};

const publishPortfolioContent = async (
  portfolioId: string
) => {

  const result =
    await PortfolioContentModel.findOneAndUpdate(
      { portfolioId },
      {
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        new: true,
      }
    );

  if (!result) {
    throw new NotFoundException(
      "Portfolio content not found"
    );
  }

  return result;
};

const unpublishPortfolioContent = async (
  portfolioId: string
) => {

  const result =
    await PortfolioContentModel.findOneAndUpdate(
      { portfolioId },
      {
        isPublished: false,
      },
      {
        new: true,
      }
    );

  if (!result) {
    throw new NotFoundException(
      "Portfolio content not found"
    );
  }

  return result;
};


export const PortfolioContentService = {
  createPortfolioContent,
  getPortfolioContentByPortfolioId,
  updatePortfolioContent,
  getPublicPortfolioBySlug,
  publishPortfolioContent,
  unpublishPortfolioContent
};