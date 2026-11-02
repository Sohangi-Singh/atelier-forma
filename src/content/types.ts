export interface ImageCredit {
  photographer: string;
  /** Unsplash photo page; all imagery is used under the Unsplash License. */
  url: string;
}

export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
  credit: ImageCredit;
  /** CSS object-position for tight crops, e.g. to keep a subject in a portrait frame. */
  focus?: string;
}

export type ProjectCategory = "Residential" | "Hospitality" | "Commercial";

export interface Material {
  name: string;
  note: string;
  /** Approximate swatch colour used for the palette chip. */
  swatch: string;
}

export type StoryBlock =
  | { type: "wide"; image: SiteImage; caption?: string }
  | { type: "duo"; images: [SiteImage, SiteImage] }
  | { type: "offset"; images: [SiteImage, SiteImage] }
  | {
      type: "split";
      image: SiteImage;
      heading: string;
      body: string;
      align: "image-left" | "image-right";
    };

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  typology: string;
  /** Always an imagined setting; never a real address, client or building. */
  setting: string;
  summary: string;
  lede: string;
  narrative: string[];
  scope: string[];
  hero: SiteImage;
  /** "portrait" sets the hero as a tall frame beside the title instead of full width. */
  heroFormat?: "wide" | "portrait";
  cover: { image: SiteImage; orientation: "landscape" | "portrait" };
  story: StoryBlock[];
  palette: Material[];
  featured?: boolean;
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  headline: string;
  summary: string;
  description: string[];
  includes: string[];
  image: SiteImage;
}

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  focus: string[];
}

export interface Principle {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}
