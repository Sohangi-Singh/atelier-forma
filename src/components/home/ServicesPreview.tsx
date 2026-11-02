import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/primitives";
import { services } from "@/content/studio";

export function ServicesPreview() {
  return (
    <section aria-labelledby="services-title" className="container-site py-28 lg:py-44">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <SectionLabel index="04">Services</SectionLabel>
          <h2 id="services-title" className="mt-6 font-serif text-display-md font-light">
            Four ways of working
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-stone">
            From a single room to a full renovation concept, each service follows the same
            measured process and the same attention to light and material.
          </p>
          <ArrowLink href="/services" className="mt-10">
            Explore services
          </ArrowLink>
        </Reveal>

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
