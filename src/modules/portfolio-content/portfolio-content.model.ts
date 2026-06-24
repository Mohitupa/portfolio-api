import { Schema, model } from "mongoose";
import { IPortfolioContent } from "./portfolio-content.types";

const imageSchema = new Schema(
  {
    mediaId: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      default: null,
    },
    alt: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

const buttonSchema = new Schema(
  { text: String, link: String },
  { _id: false }
);

const heroStatSchema = new Schema(
  { value: String, label: String, icon: String, displayOrder: Number },
  { _id: false }
);

const openToWorkBadgeSchema = new Schema(
  { text: String, icon: String },
  { _id: false }
);

const heroSchema = new Schema(
  {
    greeting: String,
    name: String,
    title: String,
    shortDescription: String,
    profileImage: imageSchema,
    email: String,
    phone: String,
    location: String,
    primaryButton: buttonSchema,
    secondaryButton: buttonSchema,
    isOpenToWork: Boolean,
    openToWorkBadge: openToWorkBadgeSchema,
    stats: { type: [heroStatSchema], default: [] },
  },
  { _id: false }
);

const expertiseCardSchema = new Schema(
  {
    title: String,
    icon: String,
    description: String,
    displayOrder: Number,
    isVisible: Boolean,
  },
  { _id: false }
);

const expertiseSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    expertise: { type: [expertiseCardSchema], default: [] },
  },
  { _id: false }
);

const skillSchema = new Schema(
  { name: String, icon: String, category: String, displayOrder: Number, isVisible: Boolean },
  { _id: false }
);

const skillTagSchema = new Schema(
  { name: String, displayOrder: Number, isVisible: Boolean },
  { _id: false }
);

const skillsSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    skills: { type: [skillSchema], default: [] },
    skillTags: { type: [skillTagSchema], default: [] },
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    company: String,
    companyLogo: imageSchema,
    position: String,
    employmentType: String,
    startDate: String,
    endDate: { type: String, default: null },
    isCurrent: Boolean,
    location: String,
    highlights: { type: [String], default: [] },
    displayOrder: Number,
  },
  { _id: false }
);

const experienceSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    experience: { type: [experienceSchema], default: [] },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    slug: String,
    title: {
      type: String,
      default: ""
    },
    year: String,
    status: String,
    coverImage: imageSchema,
    gallery: { type: [imageSchema], default: [] },
    description: {
      type: String,
      default: ""
    },
    features: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    liveUrl: String,
    githubUrl: String,
    displayOrder: Number,
  },
  { _id: false }
);

const projectsSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    projects: { type: [projectSchema], default: [] },
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    degree: String,
    institution: String,
    institutionLogo: imageSchema,
    location: String,
    startYear: String,
    endYear: String,
    grade: String,
    displayOrder: Number,
  },
  { _id: false }
);

const educationSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    education: { type: [educationSchema], default: [] },
  },
  { _id: false }
);

const contactItemSchema = new Schema(
  { key: String, label: String, value: String, icon: String, url: String },
  { _id: false }
);

const contactSchema = new Schema(
  { items: { type: [contactItemSchema], default: [] } },
  { _id: false }
);

const contactSectionSchema = new Schema(
  {
    subtitle: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: String,
    contact: { type: contactSchema, default: {} },
  },
  { _id: false }
);

const socialLinkSchema = new Schema(
  { platform: String, icon: String, url: String },
  { _id: false }
);

const navigationSchema = new Schema(
  { label: String, link: String, displayOrder: Number, isVisible: Boolean },
  { _id: false }
);

const brandingSchema = new Schema(
  { logoText: String, logoImage: imageSchema, favicon: imageSchema },
  { _id: false }
);

const footerSchema = new Schema(
  { name: String, designation: String, location: String },
  { _id: false }
);

const seoSchema = new Schema(
  {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: { type: [String], default: [] },
    ogImage: imageSchema,
  },
  { _id: false }
);

const themeSchema = new Schema(
  {
    primaryColor: String,
    secondaryColor: String,
    backgroundColor: String,
    logo: imageSchema,
    resumeFile: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      default: null
    }
  },
  { _id: false }
);

const sectionConfigSchema = new Schema(
  {
    key: String,
    name: String,
    displayOrder: Number,
    isVisible: Boolean,
    showInNavigation: Boolean,
    editable: Boolean,
    icon: String,
  },
  { _id: false }
);

const portfolioContentSchema = new Schema<IPortfolioContent>(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
      unique: true,
    },
    hero: { type: heroSchema, default: {} },
    expertiseSection: { type: expertiseSectionSchema, default: {} },
    skillsSection: { type: skillsSectionSchema, default: {} },
    experienceSection: { type: experienceSectionSchema, default: {} },
    projectsSection: { type: projectsSectionSchema, default: {} },
    educationSection: { type: educationSectionSchema, default: {} },
    contactSection: { type: contactSectionSchema, default: {} },
    socialLinks: { type: [socialLinkSchema], default: [] },
    navigation: { type: [navigationSchema], default: [] },
    branding: { type: brandingSchema, default: {} },
    footer: { type: footerSchema, default: {} },
    seo: { type: seoSchema, default: {} },
    theme: { type: themeSchema, default: {} },
    sectionConfig: { type: [sectionConfigSchema], default: [] },
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
  },
  { timestamps: true }
);

export const PortfolioContentModel = model<IPortfolioContent>(
  "PortfolioContent",
  portfolioContentSchema
);
