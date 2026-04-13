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
  imageSrc?: string;
  videoSrc?: string;
  quotes?: string[];
  portraitSrc?: string;
  images?: { src: string; label: string }[];
  customComponent?: string;
  subtitle?: string;
  bodyExtra?: string;
  gateBlock?: { heading: string; body: string };
}

export interface BentoMediaItem {
  type: "video" | "image" | "placeholder" | "component";
  src?: string;
  alt?: string;
  scale?: number;
  translateY?: number;
  loopDelay?: number;
  componentId?: string;
}

export interface SolutionImage {
  src: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  meta: CaseStudyMeta;
  eyebrow?: string;
  brief?: string;
  problem: string;
  outcome: string;
  problemPoints?: string[];
  outcomePoints?: string[];
  sections: CaseStudySection[];
  solutionHeading?: string;
  solutionBody?: string;
  solutionImages?: SolutionImage[];
  metrics?: Metric[];
  solutionInsertIndex?: number;
  bentoLayout?: "hero-split" | "hero-hero" | "hero-triple" | "side-by-side";
  bentoMedia?: BentoMediaItem[];
  nextSlug?: string;
  nextTitle?: string;
  ctaText?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
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
