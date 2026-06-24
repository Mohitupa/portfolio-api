import { Types } from "mongoose";

export interface IImage {
  mediaId: Types.ObjectId;
  alt?: string;
}

export interface IButton {
  text: string;
  link: string;
}

export interface IHeroStat {
  value: string;
  label: string;
  icon?: string;
  displayOrder: number;
}

export interface IOpenToWorkBadge {
  text: string;
  icon?: string;
}

export interface IHero {
  greeting: string;
  name: string;
  title: string;
  shortDescription: string;
  profileImage: IImage;
  email: string;
  phone: string;
  location: string;
  primaryButton: IButton;
  secondaryButton: IButton;
  isOpenToWork: boolean;
  openToWorkBadge: IOpenToWorkBadge;
  stats: IHeroStat[];
}

// ── Expertise ────────────────────────────────────────────────
export interface IExpertiseCard {
  title: string;
  icon: string;
  description: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface IExpertiseSection {
  subtitle: string;
  title: string;
  expertise: IExpertiseCard[];
}

// ── Skills ───────────────────────────────────────────────────
export interface ISkill {
  name: string;
  icon: string;
  category: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface ISkillTag {
  name: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface ISkillsSection {
  subtitle: string;
  title: string;
  skills: ISkill[];
  skillTags: ISkillTag[];
}

// ── Experience ───────────────────────────────────────────────
export interface IExperience {
  company: string;
  companyLogo?: IImage;
  position: string;
  employmentType: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  location?: string;
  highlights: string[];
  displayOrder: number;
}

export interface IExperienceSection {
  subtitle: string;
  title: string;
  experience: IExperience[];
}

// ── Projects ─────────────────────────────────────────────────
export interface IProject {
  slug: string;
  title: string;
  year: string;
  status: string;
  coverImage: IImage;
  gallery: IImage[];
  description: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  displayOrder: number;                  // ✅ was `order` — now consistent
}

export interface IProjectsSection {
  subtitle: string;
  title: string;
  description?: string;
  projects: IProject[];
}

// ── Education ────────────────────────────────────────────────
export interface IEducation {
  degree: string;
  institution: string;
  institutionLogo?: IImage;
  location: string;
  startYear: string;
  endYear: string;
  grade?: string;
  displayOrder: number;
}

export interface IEducationSection {
  subtitle: string;
  title: string;
  education: IEducation[];
}

// ── Contact ──────────────────────────────────────────────────
export interface IContactItem {
  key: string;
  label: string;
  value: string;
  icon?: string;
  url: string;
}

export interface IContact {
  items: IContactItem[];
}

export interface IContactSection {
  subtitle: string;
  title: string;
  description?: string;
  contact: IContact;
}

// ── Misc ─────────────────────────────────────────────────────
export interface ISocialLink {
  platform: string;
  icon?: string;
  url: string;
}

export interface INavigation {
  label: string;
  link: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface IBranding {
  logoText: string;
  logoImage?: IImage;
  favicon?: IImage;
}

export interface IFooter {
  name: string;
  designation: string;
  location: string;
}

export interface ISeo {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage?: IImage;
}

export interface ITheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  logo?: IImage;
  resumeFile?: Types.ObjectId;
}

export interface ISectionConfig {
  key: string;
  name: string;
  displayOrder: number;
  isVisible: boolean;
  showInNavigation: boolean;
  editable: boolean;
  icon?: string;
}

// ── Root ─────────────────────────────────────────────────────
export interface IPortfolioContent {
  portfolioId: Types.ObjectId;
  hero: IHero;
  expertiseSection: IExpertiseSection;
  skillsSection: ISkillsSection;
  experienceSection: IExperienceSection;
  projectsSection: IProjectsSection;
  educationSection: IEducationSection;
  contactSection: IContactSection;
  socialLinks: ISocialLink[];
  navigation: INavigation[];
  branding: IBranding;
  footer: IFooter;
  seo: ISeo;
  theme: ITheme;
  sectionConfig: ISectionConfig[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
