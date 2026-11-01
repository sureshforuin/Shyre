export type SpatialDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface DirectionOffset {
  x: string | number;
  y: string | number;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
}

export interface SiteMeta {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  est: string;
  navigation: NavigationItem[];
  socials: {
    instagram: string;
    pinterest: string;
    email: string;
    whatsapp: string;
  };
}

export interface HeroSectionData {
  type: 'hero';
  heading: string;
  subheading?: string;
  tagline?: string;
  description: string;
  image?: string;
  primaryAction?: {
    label: string;
    path: string;
  };
  secondaryAction?: {
    label: string;
    path: string;
  };
  stats?: Array<{
    number: string;
    label: string;
  }>;
}

export interface TextSectionData {
  type: 'text';
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  quote?: string;
  quoteAuthor?: string;
}

export interface ImageSectionData {
  type: 'image';
  title?: string;
  caption?: string;
  imageUrl: string;
  aspectRatio?: 'square' | 'wide' | 'portrait';
  fullWidth?: boolean;
}

export interface FeatureListSectionData {
  type: 'features';
  eyebrow?: string;
  title: string;
  description?: string;
  items: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

export interface ProjectItem {
  id: string;
  enabled: boolean;
  title: string;
  category: string;
  year: string;
  thumbnail: string;
  description: string;
  longDescription?: string;
  link: string;
  featured?: boolean;
  client?: string;
  materials?: string[];
  gallery?: string[];
}

export interface ProjectGridSectionData {
  type: 'projectGrid';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  filterCategories?: string[];
  limit?: number;
}

export interface ContactSectionData {
  type: 'contact';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  email: string;
  phone?: string;
  studioLocation?: string;
  availability?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    handle: string;
  }>;
}

export interface PhilosophySectionData {
  type: 'philosophy';
  eyebrow?: string;
  title: string;
  statement: string;
  values: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export type SectionData =
  | HeroSectionData
  | TextSectionData
  | ImageSectionData
  | FeatureListSectionData
  | ProjectGridSectionData
  | ContactSectionData
  | PhilosophySectionData;

export interface PageConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  metaDescription?: string;
  sections: SectionData[];
}

export interface SiteConfig {
  site: SiteMeta;
  pages: {
    home: PageConfig;
    about: PageConfig;
    work: PageConfig;
    contact: PageConfig;
    [key: string]: PageConfig;
  };
  projects: ProjectItem[];
}
