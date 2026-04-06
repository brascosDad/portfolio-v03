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
}

export interface BentoMediaItem {
  type: "video" | "image" | "placeholder";
  src?: string;
  alt?: string;
  scale?: number;
  translateY?: number;
  loopDelay?: number;
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
  bentoLayout?: "hero-split" | "hero-hero" | "hero-triple";
  bentoMedia?: BentoMediaItem[];
  nextSlug?: string;
  nextTitle?: string;
  eyebrow?: string;
  thumbnails?: { label: string }[];
  restricted?: boolean;
  restrictedLabel?: string;
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
