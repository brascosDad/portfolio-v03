export interface SiteData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedIn: string;
  resumeUrl: string;
}

export interface CaseStudyMeta {
  company: string;
  role: string;
  projectType: string;
  year: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
  imageLabel?: string;
}

export interface BentoMediaItem {
  type: "video" | "image" | "placeholder";
  src?: string;
  alt?: string;
  scale?: number;
  translateY?: number;
  loopDelay?: number;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  meta: CaseStudyMeta;
  problem: string;
  outcome: string;
  problemPoints?: string[];
  outcomePoints?: string[];
  sections: CaseStudySection[];
  bentoLayout?: "hero-split" | "hero-hero" | "hero-triple";
  bentoMedia?: BentoMediaItem[];
  nextSlug?: string;
  nextTitle?: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
}

export interface HardwareEntry {
  name: string;
  company: string;
  roles: string[];
  image: string;
  scale?: number;
  translateY?: number;
}
