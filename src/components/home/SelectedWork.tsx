import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowLink, SectionLabel } from "@/components/ui/primitives";
import { getProject } from "@/content/projects";

const lead = getProject("house-of-light")!;
const second = getProject("terra-residence")!;
const third = getProject("the-still-house")!;

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work-title" className="container-site pb-28 lg:pb-36">
      <div className="flex flex-wrap items-end justify-between gap-8 border-t border-line pt-10">
        <div>
          <SectionLabel index="02">Concept projects</SectionLabel>
          <h2 id="selected-work-title" className="mt-6 font-serif text-display-md font-light">
            Selected work
          </h2>
        </div>
        <ArrowLink href="/projects">View all projects</ArrowLink>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-20 lg:mt-24 lg:grid-cols-12">
        <ProjectCard
          project={lead}
          image={lead.hero}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1440px) 790px, (min-width: 1024px) 56vw, 100vw"
          className="lg:col-span-7"
        />
        <ProjectCard
          project={second}
          aspect="aspect-[4/5]"
          sizes="(min-width: 1440px) 440px, (min-width: 1024px) 31vw, 100vw"
          className="sm:w-3/4 sm:justify-self-end lg:col-span-4 lg:col-start-9 lg:mt-56 lg:w-auto lg:justify-self-auto"
        />
        <ProjectCard
          project={third}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1440px) 900px, (min-width: 1024px) 64vw, 100vw"
          className="lg:col-span-8 lg:col-start-3 lg:mt-12"
        />
      </div>

      <Reveal className="mt-20 border-t border-line pt-6 lg:mt-28">
        <p className="max-w-2xl text-[0.875rem] leading-relaxed text-stone">
          All projects are design concepts. Photography is by the credited photographers on
          Unsplash and is used to illustrate each idea — it does not show work completed by
          ATELIER FORMA.
        </p>
      </Reveal>
    </section>
  );
}
