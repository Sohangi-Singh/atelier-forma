import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navigation, site } from "@/content/site";

const conceptLinks = [
  { label: "About this concept", href: "/studio#about-this-concept" },
  { label: "Image credits", href: "/studio#image-credits" },
];

export function SiteFooter() {
  return (
    <footer data-page-content className="bg-ink text-ivory">
      <div className="container-site pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[0.8125rem] font-medium tracking-[0.32em] uppercase">{site.name}</p>
            <p className="mt-6 max-w-sm font-serif text-display-sm font-light text-ivory/90">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <h2 className="label text-ivory/60">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-light link-underline text-ivory/85 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-ivory/60">Concept</h2>
            <ul className="mt-5 space-y-3">
              {conceptLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-light link-underline text-ivory/85 hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-ivory/60">Enquiries</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/contact" className="focus-light link-underline text-ivory/85 hover:text-ivory">
                  Enquiry form
                </Link>
              </li>
              <li className="text-ivory/70">
                <span className="[overflow-wrap:anywhere]">{site.demoEmail}</span>
                <span className="mt-1 block text-[0.75rem] text-ivory/60">
                  Fictional address — not monitored
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-ivory/15 pt-8">
          <p className="max-w-2xl text-[0.875rem] leading-relaxed text-ivory/80">{site.disclaimer}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6 text-[0.75rem] text-ivory/60">
            <p>{site.copyright}</p>
            <a
              href="#top"
              className="focus-light group inline-flex min-h-11 items-center gap-2 text-ivory/80 hover:text-ivory"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
