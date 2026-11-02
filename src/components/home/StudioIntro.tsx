import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink, SectionLabel } from "@/components/ui/primitives";

export function StudioIntro() {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-title"
      className="container-site scroll-mt-20 py-28 lg:py-44"
    >
      <div className="grid gap-y-12 lg:grid-cols-12">
        <SectionLabel as="h2" id="introduction-title" index="01" className="lg:col-span-12">
          The studio
        </SectionLabel>
        <Reveal className="lg:col-span-10 lg:col-start-2">
          <p className="font-serif text-statement font-light">
            We create interiors that feel <em>timeless</em>, <em>personal</em> and{" "}
            <em>considered</em> — rooms that settle quietly into the lives of the people who use
            them, and grow more meaningful with time.
          </p>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-8" delay={0.1}>
          <p className="leading-relaxed text-stone">
            ATELIER FORMA is an imagined interior architecture studio. Its concept work explores how
            light, proportion and a short list of natural materials can make a space feel both
            calm and deeply lived in.
          </p>
          <ArrowLink href="/studio" className="mt-8">
            About the studio
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
