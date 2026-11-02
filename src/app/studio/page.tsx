import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { PageIntro, SectionLabel } from "@/components/ui/primitives";
import { images } from "@/content/images";
import { projectImages, projects } from "@/content/projects";
import { services, tenets } from "@/content/studio";
import type { SiteImage } from "@/content/types";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Studio",
  description:
    "The philosophy and process behind ATELIER FORMA — a fictional interior architecture studio created as an independent portfolio concept.",
  path: "/studio",
});

const creditGroups: { title: string; images: SiteImage[] }[] = [
  {
    title: "Home",
    images: [
      images["home-hero"],
      images["home-philosophy"],
      images["home-editorial-arch"],
      images["home-editorial-vase"],
    ],
  },
  ...projects.map((project) => ({
    title: `${project.title} (concept project)`,
    images: projectImages(project),
  })),
  { title: "Services", images: [images["services-hero"], ...services.map((s) => s.image)] },
  { title: "Studio", images: [images["studio-hero"], images["studio-vessels"]] },
  { title: "Contact and page not found", images: [images["contact-shelf"], images["not-found-room"]] },
];

export default function StudioPage() {
  return (
    <>
      <PageIntro
        label="Studio"
        title={
          <>
            A studio shaped around <em>attention.</em>
          </>
        }
        lede="ATELIER FORMA is an imagined interior architecture practice — a design concept exploring how a calm, considered studio might present its work and way of thinking."
      />

      <div className="container-site">
        <EditorialImage
          image={images["studio-hero"]}
          aspect="aspect-[4/3] md:aspect-[21/9]"
          sizes="(min-width: 1440px) 1300px, 100vw"
          priority
        />
      </div>

      <section aria-labelledby="beliefs-title" className="container-site py-28 lg:py-40">
        <Reveal className="grid gap-8 lg:grid-cols-12">
          <SectionLabel index="01" className="self-start lg:col-span-3 lg:pt-5">
            Beliefs
          </SectionLabel>
          <h2 id="beliefs-title" className="font-serif text-statement font-light lg:col-span-8 lg:col-start-5">
            The best interiors are rarely the loudest. They are the ones you keep returning to —
            because they make ordinary moments feel <em>unhurried.</em>
          </h2>
        </Reveal>
        <ol className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-10">
          {tenets.map((tenet, index) => (
            <li key={tenet.title}>
              <Reveal delay={index * 0.1}>
                <span aria-hidden="true" className="label text-stone">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-display-sm font-light">{tenet.title}</h3>
                <p className="mt-4 max-w-sm leading-relaxed text-stone">{tenet.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="approach-title" className="bg-sand py-28 lg:py-40">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center">
          <EditorialImage
            image={images["studio-vessels"]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1440px) 520px, (min-width: 1024px) 36vw, 100vw"
            className="sm:w-3/4 lg:col-span-4 lg:col-start-2 lg:w-full"
          />
          <Reveal className="lg:col-span-5 lg:col-start-7">
            <SectionLabel index="02">Approach</SectionLabel>
            <h2 id="approach-title" className="mt-6 font-serif text-display-md font-light">
              Fewer projects, <em>more attention.</em>
            </h2>
            <div className="mt-8 space-y-5 leading-relaxed text-stone">
              <p>
                The concept imagines a practice that works on a small number of projects at once,
                so that every decision — from the line of a skirting to the colour temperature of a
                lamp — receives the same care as the plan.
              </p>
              <p>
                Work moves between drawing and making: sketches are tested against real samples,
                and samples are tested in the light of the actual room. Nothing is specified from a
                screen alone.
              </p>
              <p>
                The result is an interior that feels resolved rather than styled — one that leaves
                room for the people who use it to complete it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ProcessTimeline index="03" />

      <section
        id="about-this-concept"
        aria-labelledby="about-concept-title"
        className="container-site scroll-mt-24 py-28 lg:py-40"
      >
        <div className="grid gap-12 border border-line p-8 sm:p-12 lg:grid-cols-12 lg:p-16">
          <div className="lg:col-span-5">
            <SectionLabel index="04">Transparency</SectionLabel>
            <h2 id="about-concept-title" className="mt-6 font-serif text-display-md font-light">
              About this concept
            </h2>
          </div>
          <div className="space-y-5 leading-relaxed text-stone lg:col-span-6 lg:col-start-7">
            <p className="text-ink">
              ATELIER FORMA is not an operating interior design studio. It is an independent design
              concept created for portfolio demonstration — a showcase of how a premium studio
              website could look, read and work.
            </p>
            <p>
              The studio, its projects, settings and voice are fictional. There is no team, no
              client list, no awards and no completed commissions. The contact email uses a
              reserved example domain and is not monitored.
            </p>
            <p>
              Photography is real and is used under the Unsplash License, credited below and on
              each project page. It is used to illustrate ideas, not to represent work by ATELIER
              FORMA.
            </p>
          </div>
        </div>
      </section>

      <section
        id="image-credits"
        aria-labelledby="image-credits-title"
        className="container-site scroll-mt-24 pb-28 lg:pb-40"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="image-credits-title" className="font-serif text-display-sm font-light">
              Image credits
            </h2>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-stone">
              All photographs are from Unsplash and used under the Unsplash License. With thanks to
              each photographer.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {creditGroups.map((group) => (
              <div key={group.title}>
                <h3 className="label border-b border-line pb-3 text-ink">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-[0.875rem] text-stone">
                  {group.images.map((image) => (
                    <li key={image.src}>
                      <a
                        href={image.credit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-ink"
                      >
                        {image.credit.photographer}
                        <span className="sr-only"> (opens Unsplash in a new tab)</span>
                      </a>
                      <span className="block text-[0.8125rem]">{image.alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
