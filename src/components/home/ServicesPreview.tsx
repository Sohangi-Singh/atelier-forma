import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, ButtonLink, SectionLabel } from "@/components/ui/primitives";
import { site } from "@/content/site";
import { services } from "@/content/studio";

export function ServicesPreview() {
  return (
    <section aria-labelledby="services-title" className="container-site py-28 lg:py-40">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <SectionLabel index="04">Services</SectionLabel>
            <h2 id="services-title" className="mt-6 font-serif text-display-md font-light">
              Four ways of working
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-stone">
              From a single room to a full renovation concept, each service follows the same
              measured process and the same attention to light and material. They can stand alone
              or be combined into one brief.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink href="/contact" variant="outline">
                {site.consultationLabel}
              </ButtonLink>
              <ArrowLink href="/services">Explore services</ArrowLink>
            </div>
          </Reveal>
        </div>

        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {services.map((service, index) => (
            <li key={service.slug} className="border-b border-line">
              <Reveal delay={index * 0.06}>
                <article className="group relative grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-8 sm:grid-cols-[4rem_1fr_auto] sm:py-10">
                  <span aria-hidden="true" className="label text-stone">
                    {service.number}
                  </span>
                  <div className="transition-transform duration-700 ease-quiet group-hover:translate-x-2">
                    <h3 className="font-serif text-display-sm font-light">
                      <Link
                        href={`/services#${service.slug}`}
                        className="stretched-link link-underline-group"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-stone">
                      {service.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.8125rem] text-ink/80">
                      {service.includes.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span aria-hidden="true" className="h-px w-3 bg-olive" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.25}
                    className="size-6 self-center text-olive transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
