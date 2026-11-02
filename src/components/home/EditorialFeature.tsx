import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/primitives";
import { images } from "@/content/images";

export function EditorialFeature() {
  return (
    <section aria-labelledby="notes-title" className="container-site py-28 lg:py-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* Layered pair: the small frame overlaps the corner of the large one. */}
        <div className="relative pb-24 sm:pb-32 lg:col-span-6">
          <EditorialImage
            image={images["home-editorial-arch"]}
            aspect="aspect-[3/4]"
            sizes="(min-width: 1440px) 500px, (min-width: 1024px) 35vw, 78vw"
            className="w-[78%]"
          />
          <EditorialImage
            image={images["home-editorial-vase"]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1440px) 250px, (min-width: 1024px) 17vw, 38vw"
            className="absolute right-0 bottom-0 w-[38%] ring-[10px] ring-ivory"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <SectionLabel index="06">Notes from the studio</SectionLabel>
            <h2 id="notes-title" className="mt-6 font-serif text-display-md font-light">
              Restraint is a form of <em>generosity.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-md space-y-5 leading-relaxed text-stone">
            <p>
              Restraint is not the absence of character. It is the discipline of choosing — one
              material where three would do, a single well-placed light, an opening sized exactly
              to its view — so that what remains can be felt.
            </p>
            <p>
              An edited room gives more back to the people within it. There is space to move, to
              add, to let a life accumulate over time. The aim is never an empty room, only an
              uncrowded one.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <ArrowLink href="/studio">Read the studio philosophy</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
