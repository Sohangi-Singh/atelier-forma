import type { NavItem } from "./types";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Brand-level settings. To adapt the site for a real studio, start here,
 * then edit the content files alongside it.
 */
export const site = {
  name: "ATELIER FORMA",
  tagline: "Spaces shaped by intention.",
  description:
    "ATELIER FORMA is a fictional interior architecture and design studio — a portfolio concept exploring calm, considered residential, hospitality and commercial interiors.",
  url: resolveSiteUrl(),
  locale: "en_GB",
  disclaimer:
    "Independent design concept created for portfolio demonstration. Not an operating interior design studio.",
  /** Reserved .example domain: unmistakably fictional and not deliverable. */
  demoEmail: "hello@atelier-forma.example",
  consultationLabel: "Arrange a consultation",
  copyright: "© 2026 ATELIER FORMA — design concept",
} as const;

export const navigation: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
