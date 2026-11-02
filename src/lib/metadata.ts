import type { Metadata } from "next";
import { site } from "@/content/site";

interface ShareImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export const defaultShareImage: ShareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline} A calm living room in soft daylight.`,
};

/** Consistent title, canonical URL and social metadata for a route. */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultShareImage,
}: {
  title?: string;
  description: string;
  path: string;
  image?: ShareImage;
}): Metadata {
  const shareTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: shareTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
