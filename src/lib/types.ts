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

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  meta: CaseStudyMeta;
  problem: string;
  outcome: string;
  sections: CaseStudySection[];
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
  description: string;
  category: string;
}
