import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { PageIntro, SectionLabel } from "@/components/ui/primitives";
import { images } from "@/content/images";
import { faqs, services } from "@/content/studio";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Residential interiors, spatial planning, furniture and material curation, and renovation concepts — the four areas of practice explored by the ATELIER FORMA design concept.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Services"
        title={
          <>
            Interiors considered from <em>plan to object.</em>
          </>
        }
        lede="Four areas of practice that can stand alone or work together. Each follows the same measured process and the same care for light, proportion and material."
      >
        <nav aria-label="Services on this page" className="mt-14 border-t border-line pt-6 lg:mt-20">
          <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="group flex items-baseline gap-3 py-1 text-[0.9375rem]"
                >
                  <span className="label text-stone">{service.number}</span>
                  <span className="link-underline-group">{service.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageIntro>

      <div className="container-site">
        <EditorialImage
          image={images["services-hero"]}
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1440px) 1300px, 100vw"
          priority
        />
      </div>

      <div className="py-16 lg:py-24">
        {services.map((service, index) => {
          const imageRight = index % 2 === 1;
          const portrait = service.image.height > service.image.width;
          return (
            <section
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="container-site scroll-mt-24 py-16 lg:py-24"
            >
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
                <EditorialImage
                  image={service.image}
                  aspect={portrait ? "aspect-[4/5]" : "aspect-[4/3]"}
                  sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw"
                  className={cn(
                    "lg:col-span-5",
                    portrait && "sm:w-3/4 lg:w-full",
                    imageRight && "lg:order-2 lg:col-start-8",
                  )}
                />
                <Reveal
                  className={cn(
                    "lg:col-span-6",
                    imageRight ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
                  )}
                >
                  <SectionLabel index={service.number}>Service</SectionLabel>
                  <h2
                    id={`${service.slug}-title`}
                    className="mt-6 font-serif text-display-md font-light"
                  >
                    {service.title}
                  </h2>
                  <p className="mt-4 font-serif text-[1.375rem] leading-snug text-olive-deep italic">
                    {service.headline}
                  </p>
                  <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-stone">
                    {service.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <h3 className="label mt-10 text-ink">What it can include</h3>
                  <ul className="mt-4 max-w-xl border-t border-line">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-line py-3 text-[0.9375rem]"
                      >
                        <span aria-hidden="true" className="text-olive">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      <ProcessTimeline
        title="How a project unfolds"
        intro="A simple, four-stage timeline. The emphasis of each stage shifts with the brief, but the sequence stays the same — so decisions are always made with the right information."
        detailed
      />

      <section aria-labelledby="faq-title" className="container-site py-28 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="mt-6 font-serif text-display-md font-light">
              Frequently asked
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-stone">
              Answers describe how a studio like this would typically work. This concept site does
              not publish pricing or make offers of service.
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
