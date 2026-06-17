import { z } from "zod";

const imageValidationSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
});

const buttonValidationSchema = z.object({
  text: z.string(),
  link: z.string(),
});

const heroStatSchema = z.object({
  value: z.string(),
  label: z.string(),
  icon: z.string().optional(),
  displayOrder: z.number().optional(),
});

const openToWorkBadgeSchema = z.object({
  text: z.string(),
  icon: z.string().optional(),
});

const heroSchema = z.object({
  greeting: z.string(),
  name: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  profileImage: imageValidationSchema,
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  primaryButton: buttonValidationSchema,
  secondaryButton: buttonValidationSchema,
  isOpenToWork: z.boolean(),

  openToWorkBadge: openToWorkBadgeSchema.optional(),

  stats: z.array(heroStatSchema).optional(),
});

const expertiseCardSchema = z.object({
  title: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
  displayOrder: z.number().optional(),
  isVisible: z.boolean().optional(),
});

const expertiseSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  expertise: z.array(expertiseCardSchema).optional(),
});

const skillSchema = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
  category: z.string().optional(),
  displayOrder: z.number().optional(),
  isVisible: z.boolean().optional(),
});

const skillTagSchema = z.object({
  name: z.string().optional(),
  displayOrder: z.number().optional(),
  isVisible: z.boolean().optional(),
});

const skillsSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),

  skills: z.array(skillSchema).optional(),

  skillTags: z.array(skillTagSchema).optional(),
});

const experienceSchema = z.object({
  company: z.string().optional(),

  companyLogo: imageValidationSchema.optional(),

  position: z.string().optional(),

  employmentType: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().nullable().optional(),

  isCurrent: z.boolean().optional(),

  location: z.string().optional(),

  highlights: z.array(z.string()).optional(),

  displayOrder: z.number().optional(),
});

const experienceSectionSchema = z.object({
  subtitle: z.string().optional(),

  title: z.string().optional(),

  experience: z.array(experienceSchema).optional(),
});

const projectSchema = z.object({
  slug: z.string().optional(),

  title: z.string().optional(),

  year: z.string().optional(),

  status: z.string().optional(),

  coverImage: imageValidationSchema.optional(),

  gallery: z.array(imageValidationSchema).optional(),

  description: z.string().optional(),

  features: z.array(z.string()).optional(),

  technologies: z.array(z.string()).optional(),

  liveUrl: z.string().optional(),

  githubUrl: z.string().optional(),

  displayOrder: z.number().optional(),
});

const projectsSectionSchema = z.object({
  subtitle: z.string().optional(),

  title: z.string().optional(),

  description: z.string().optional(),

  projects: z.array(projectSchema).optional(),
});

const educationSchema = z.object({
  degree: z.string().optional(),

  institution: z.string().optional(),

  institutionLogo: imageValidationSchema.optional(),

  location: z.string().optional(),

  startYear: z.string().optional(),

  endYear: z.string().optional(),

  grade: z.string().optional(),

  displayOrder: z.number().optional(),
});

const educationSectionSchema = z.object({
  subtitle: z.string().optional(),

  title: z.string().optional(),

  education: z.array(educationSchema).optional(),
});

const contactItemSchema = z.object({
  key: z.string().optional(),

  label: z.string().optional(),

  value: z.string().optional(),

  icon: z.string().optional(),

  url: z.string().optional(),
});

const contactSchema = z.object({
  items: z.array(contactItemSchema).optional(),
});

const contactSectionSchema = z.object({
  subtitle: z.string().optional(),

  title: z.string().optional(),

  description: z.string().optional(),

  contact: contactSchema.optional(),
});

const socialLinkSchema = z.object({
  platform: z.string().optional(),

  icon: z.string().optional(),

  url: z.string().optional(),
});

const navigationSchema = z.object({
  label: z.string().optional(),

  link: z.string().optional(),

  displayOrder: z.number().optional(),

  isVisible: z.boolean().optional(),
});

const brandingSchema = z.object({
  logoText: z.string().optional(),

  logoImage: imageValidationSchema.optional(),

  favicon: imageValidationSchema.optional(),
});

const footerSchema = z.object({
  name: z.string().optional(),

  designation: z.string().optional(),

  location: z.string().optional(),
});

const seoSchema = z.object({
  metaTitle: z.string().optional(),

  metaDescription: z.string().optional(),

  metaKeywords: z.array(z.string()).optional(),

  ogImage: imageValidationSchema.optional(),
});

const themeSchema = z.object({
  primaryColor: z.string().optional(),

  secondaryColor: z.string().optional(),

  backgroundColor: z.string().optional(),

  logo: imageValidationSchema.optional(),

  resumeFile: z.string().optional(),
});

const sectionConfigSchema = z.object({
  key: z.string().optional(),

  name: z.string().optional(),

  displayOrder: z.number().optional(),

  isVisible: z.boolean().optional(),

  showInNavigation: z.boolean().optional(),

  editable: z.boolean().optional(),

  icon: z.string().optional(),
});

const createPortfolioContentSchema =
  z.object({
    body: z.object({
      portfolioId: z.string(),

      hero: heroSchema.optional(),

      expertiseSection:
        expertiseSectionSchema.optional(),

      skillsSection:
        skillsSectionSchema.optional(),

      experienceSection:
        experienceSectionSchema.optional(),

      projectsSection:
        projectsSectionSchema.optional(),

      educationSection:
        educationSectionSchema.optional(),

      contactSection:
        contactSectionSchema.optional(),

      socialLinks:
        z.array(socialLinkSchema).optional(),

      navigation:
        z.array(navigationSchema).optional(),

      branding:
        brandingSchema.optional(),

      footer:
        footerSchema.optional(),

      seo:
        seoSchema.optional(),

      theme:
        themeSchema.optional(),

      sectionConfig:
        z.array(sectionConfigSchema).optional()
    })
  });


export const updatePortfolioContentSchema = z.object({
  body: z.object({
    hero: heroSchema.optional(),
    expertiseSection: expertiseSectionSchema.optional(),
    skillsSection: skillsSectionSchema.optional(),
    experienceSection: experienceSectionSchema.optional(),
    projectsSection: projectsSectionSchema.optional(),
    educationSection: educationSectionSchema.optional(),
    contactSection: contactSectionSchema.optional(),
    socialLinks: z.array(socialLinkSchema).optional(),
    navigation: z.array(navigationSchema).optional(),
    branding: brandingSchema.optional(),
    footer: footerSchema.optional(),
    seo: seoSchema.optional(),
    theme: themeSchema.optional(),
    sectionConfig: z.array(sectionConfigSchema).optional()
  }).partial(),
});

export const PortfolioContentValidation = {
  createPortfolioContentSchema,
  updatePortfolioContentSchema,
};  