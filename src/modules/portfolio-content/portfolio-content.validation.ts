import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .url("Invalid URL")
  .or(z.literal(""));

const imageObjectSchema = z.object({
  url: optionalUrlSchema.default(""),
  alt: z.string().optional(),
});

const imageSchema = z
  .union([
    imageObjectSchema,
    z.string().transform((url) => ({ url })),
  ])
  .transform((image) => (typeof image === "string" ? { url: image } : image));

const buttonSchema = z.object({
  text: z.string().min(1, "Button text is required"),
  link: z.string().min(1, "Button link is required"),
});

const heroStatSchema = z.object({
  value: z.string().min(1, "Stat value is required"),
  label: z.string().min(1, "Stat label is required"),
  icon: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
});

const openToWorkBadgeSchema = z.object({
  text: z.string().min(1, "Badge text is required"),
  icon: z.string().optional(),
});

const heroSchema = z.object({
  greeting: z.string().optional(),
  name: z.string().optional(),
  title: z.string().optional(),
  shortDescription: z.string().optional(),
  profileImage: imageSchema.optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  primaryButton: buttonSchema.optional(),
  secondaryButton: buttonSchema.optional(),
  isOpenToWork: z.boolean().optional(),
  openToWorkBadge: openToWorkBadgeSchema.optional(),
  stats: z.array(heroStatSchema).default([]),
});

const expertiseCardSchema = z.object({
  title: z.string().min(1, "Expertise title is required"),
  icon: z.string().optional(),
  description: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

const expertiseSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  expertise: z.array(expertiseCardSchema).default([]),
});

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  icon: z.string().optional(),
  category: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

const skillTagObjectSchema = z.object({
  name: z.string().min(1, "Skill tag name is required"),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

const skillTagSchema = z.union([
  skillTagObjectSchema,
  z.string().min(1, "Skill tag name is required").transform((name) => ({
    name,
    displayOrder: 0,
    isVisible: true,
  })),
]);

const skillsSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  skills: z.array(skillSchema).default([]),
  skillTags: z.array(skillTagSchema).default([]),
});

const experienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  companyLogo: imageSchema.optional(),
  position: z.string().min(1, "Position is required"),
  employmentType: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().nullable().optional(),
  isCurrent: z.boolean().default(false),
  location: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  displayOrder: z.number().int().min(0).default(0),
});

const experienceSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  experience: z.array(experienceSchema).default([]),
});

const projectSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    slug: z
      .string()
      .min(1, "Project slug is required")
      .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
    title: z.string().min(1, "Project title is required"),
    year: z.string().optional(),
    status: z.string().optional(),
    coverImage: imageSchema.optional(),
    gallery: z.array(imageSchema).default([]),
    description: z.string().optional(),
    features: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    liveUrl: optionalUrlSchema.optional(),
    githubUrl: optionalUrlSchema.optional(),
    order: z.number().int().min(0).optional(),
    displayOrder: z.number().int().min(0).optional(),
  })
  .transform(({ order, displayOrder, ...project }) => ({
    ...project,
    displayOrder: displayOrder ?? order ?? 0,
  }));

const projectsSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  projects: z.array(projectSchema).default([]),
});

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  institutionLogo: imageSchema.optional(),
  location: z.string().optional(),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
  grade: z.string().optional(),
  displayOrder: z.number().int().min(0).default(0),
});

const educationSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  education: z.array(educationSchema).default([]),
});

const contactItemSchema = z.object({
  key: z.string().min(1, "Contact item key is required"),
  label: z.string().min(1, "Contact item label is required").optional(),
  value: z.string().min(1, "Contact item value is required"),
  icon: z.string().optional(),
  url: z.string().optional(),
}).transform((item) => ({
  ...item,
  label: item.label ?? item.key,
}));

const contactSchema = z.object({
  items: z.array(contactItemSchema).default([]),
});

const keyedContactSchema = z
  .record(
    z.string(),
    z.object({
      label: z.string().optional(),
      value: z.string().default(""),
      icon: z.string().optional(),
      url: z.string().optional(),
    })
  )
  .transform((contact) => ({
    items: Object.entries(contact)
      .filter(([, item]) => item.value || item.url)
      .map(([key, item]) => ({
        key,
        label: item.label ?? key,
        value: item.value,
        icon: item.icon,
        url: item.url,
      })),
  }));

const contactSectionSchema = z.object({
  subtitle: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  contact: z.union([contactSchema, keyedContactSchema]).default({ items: [] }),
});

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  icon: z.string().optional(),
  url: optionalUrlSchema,
});

const navigationSchema = z.object({
  label: z.string().min(1, "Navigation label is required"),
  link: z.string().min(1, "Navigation link is required"),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});

const brandingSchema = z.object({
  logoText: z.string().optional(),
  logoImage: imageSchema.optional(),
  favicon: imageSchema.optional(),
});

const footerSchema = z.object({
  name: z.string().optional(),
  designation: z.string().optional(),
  location: z.string().optional(),
});

const seoSchema = z.object({
  metaTitle: z.string().max(60, "Meta title should not exceed 60 characters").optional(),
  metaDescription: z.string().max(160, "Meta description should not exceed 160 characters").optional(),
  metaKeywords: z.array(z.string()).default([]),
  ogImage: imageSchema.optional(),
});

const themeSchema = z.object({
  primaryColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color")
    .optional()
    .or(z.literal("")),
  secondaryColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color")
    .optional()
    .or(z.literal("")),
  backgroundColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid hex color")
    .optional()
    .or(z.literal("")),
  logo: imageSchema.optional(),
  resumeFile: z.string().optional(),
});

const sectionConfigSchema = z.object({
  key: z.string().min(1, "Section key is required"),
  name: z.string().min(1, "Section name is required"),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
  showInNavigation: z.boolean().default(true),
  editable: z.boolean().default(true),
  icon: z.string().optional(),
});

export const portfolioContentSectionSchemas = {
  hero: heroSchema,
  expertiseSection: expertiseSectionSchema,
  skillsSection: skillsSectionSchema,
  experienceSection: experienceSectionSchema,
  projectsSection: projectsSectionSchema,
  educationSection: educationSectionSchema,
  contactSection: contactSectionSchema,
  socialLinks: z.array(socialLinkSchema),
  navigation: z.array(navigationSchema),
  branding: brandingSchema,
  footer: footerSchema,
  seo: seoSchema,
  theme: themeSchema,
  sectionConfig: z.array(sectionConfigSchema),
} as const;

// POST /portfolio-content/:portfolioId  (create — no body needed)
export const createPortfolioContentSchema = z.object({
  params: z.object({
    portfolioId: z.string().min(1, "Portfolio ID is required"),
  }),
});

// GET /portfolio-content/:portfolioId
export const getPortfolioContentSchema = z.object({
  params: z.object({
    portfolioId: z.string().min(1, "Portfolio ID is required"),
  }),
});

// PATCH /portfolio-content/:portfolioId  (bulk field update)
export const updatePortfolioContentSchema = z.object({
  params: z.object({
    portfolioId: z.string().min(1, "Portfolio ID is required"),
  }),
  body: z.object({
    hero: portfolioContentSectionSchemas.hero.optional(),
    expertiseSection: portfolioContentSectionSchemas.expertiseSection.optional(),
    skillsSection: portfolioContentSectionSchemas.skillsSection.optional(),
    experienceSection: portfolioContentSectionSchemas.experienceSection.optional(),
    projectsSection: portfolioContentSectionSchemas.projectsSection.optional(),
    educationSection: portfolioContentSectionSchemas.educationSection.optional(),
    contactSection: portfolioContentSectionSchemas.contactSection.optional(),
    socialLinks: portfolioContentSectionSchemas.socialLinks.optional(),
    navigation: portfolioContentSectionSchemas.navigation.optional(),
    branding: portfolioContentSectionSchemas.branding.optional(),
    footer: portfolioContentSectionSchemas.footer.optional(),
    seo: portfolioContentSectionSchemas.seo.optional(),
    theme: portfolioContentSectionSchemas.theme.optional(),
    sectionConfig: portfolioContentSectionSchemas.sectionConfig.optional(),
  }),
});

// PATCH /portfolio-content/:portfolioId/section/:section  (single section update)
export const updateSectionSchema = z.object({
  params: z.object({
    portfolioId: z.string().min(1, "Portfolio ID is required"),
    section: z.enum([
      "hero",
      "expertiseSection",
      "skillsSection",
      "experienceSection",
      "projectsSection",
      "educationSection",
      "contactSection",
      "socialLinks",
      "navigation",
      "branding",
      "footer",
      "seo",
      "theme",
      "sectionConfig",
    ]),
  }),
});

// PATCH /portfolio-content/:portfolioId/publish
// PATCH /portfolio-content/:portfolioId/unpublish
export const publishPortfolioContentSchema = z.object({
  params: z.object({
    portfolioId: z.string().min(1, "Portfolio ID is required"),
  }),
});

// GET /public/portfolios/:slug
export const getPublicPortfolioBySlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  }),
});
