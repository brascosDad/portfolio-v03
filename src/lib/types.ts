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
  imageCarousel?: {
    src: string;
    alt: string;
    selected?: boolean;
    caption?: { label: string; body: string };
  }[];
  // "cover" (default) fills the slot and may crop; "contain" fits the
  // entire image with background padding so nothing is cropped.
  imageCarouselFit?: "cover" | "contain";
  customComponent?: string;
  // Default "stacked" renders heading + body + custom component vertically.
  // "side-by-side" renders the section in the same 2-col layout as regular
  // image/video sections, with the custom component as the media slot.
  customComponentLayout?: "stacked" | "side-by-side";
  subtitle?: string;
  bodyExtra?: string;
  // Renders a registered component between paragraphs of bodyExtra.
  // afterParagraph is the 0-indexed split position: 0 = after body, 1 = after
  // the first bodyExtra paragraph, etc.
  inlineComponent?: { id: string; afterParagraph: number };
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
  // Optional override for the bullets shown in the case study's Result
  // section. When omitted, the Result section falls back to outcomePoints.
  // Lets the home-page work card show a tight outcome summary while the
  // detail page lists fuller, longer-form result bullets.
  resultPoints?: string[];
  sections: CaseStudySection[];
  solutionHeading?: string;
  solutionBody?: string;
  solutionImages?: SolutionImage[];
  metrics?: Metric[];
  solutionInsertIndex?: number;
  // When set, bentoMedia[0] renders between sections at this index
  // instead of after all sections.
  mediaInsertIndex?: number;
  bentoLayout?: "hero-split" | "hero-hero" | "hero-triple" | "side-by-side";
  bentoMedia?: BentoMediaItem[];
  aiTools?: string[];
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
