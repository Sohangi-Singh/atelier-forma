import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { StoryBlock } from "@/components/projects/StoryBlock";
import { getNextProject, getProject, projectImages, projects } from "@/content/projects";
import type { SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return pageMetadata({
    title: `${project.title} — Concept project`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // Portrait-format heroes rely on a focused crop, so they share the default card instead.
    image:
      project.heroFormat === "portrait"
        ? undefined
        : {
            url: project.hero.src,
            width: project.hero.width,
            height: project.hero.height,
            alt: project.hero.alt,
          },
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const byPhotographer = new Map<string, SiteImage[]>();
  for (const image of projectImages(project)) {
    const name = image.credit.photographer;
    byPhotographer.set(name, [...(byPhotographer.get(name) ?? []), image]);
  }
  const credits = [...byPhotographer].map(([photographer, images]) => ({ photographer, images }));
  const facts = [
    { term: "Typology", detail: project.typology },
    { term: "Category", detail: project.category },
    { term: "Setting", detail: project.setting },
    { term: "Status", detail: "Design concept — not a built commission" },
  ];
  const portraitHero = project.heroFormat === "portrait";
  const categoryLabel = (
    <p className="label text-olive-deep motion-safe:animate-rise motion-safe:[animation-delay:60ms]">
      Concept project <span aria-hidden="true">·</span> {project.category}
    </p>
  );

  return (
    <article>
      <header className="container-site pt-32 pb-12 sm:pt-40 lg:pb-16">
        <nav aria-label="Breadcrumb" className="motion-safe:animate-rise">
          <ol className="label flex flex-wrap items-center gap-2 text-stone">
            <li>
              <Link href="/projects" className="link-underline hover:text-ink">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {project.title}
            </li>
          </ol>
        </nav>
        {portraitHero ? (
          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-5 lg:pb-2">
              {categoryLabel}
              <h1 className="mt-6 font-serif text-display-lg font-light motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
                {project.title}
              </h1>
              <p className="mt-10 max-w-md text-lede text-stone motion-safe:animate-rise motion-safe:[animation-delay:200ms]">
                {project.lede}
              </p>
            </div>
            <EditorialImage
              image={project.hero}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1440px) 640px, (min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
              priority
              className="sm:ml-auto sm:w-4/5 lg:col-span-6 lg:col-start-7 lg:w-full"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              {categoryLabel}
              <h1 className="mt-6 font-serif text-display-xl font-light motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
                {project.title}
              </h1>
            </div>
            <p className="text-lede text-stone motion-safe:animate-rise motion-safe:[animation-delay:200ms] lg:col-span-4 lg:pb-3">
              {project.lede}
            </p>
          </div>
        )}
      </header>

      {!portraitHero && (
        <div className="container-site">
          <EditorialImage
            image={project.hero}
            aspect="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/9]"
            sizes="(min-width: 1440px) 1300px, 100vw"
            priority
          />
        </div>
      )}

      <section aria-labelledby={`${project.slug}-concept`} className="container-site py-24 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="self-start border-t border-line pt-8 lg:sticky lg:top-28 lg:col-span-4">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1">
              {facts.map((fact) => (
                <div key={fact.term}>
                  <dt className="label text-stone">{fact.term}</dt>
                  <dd className="mt-2 text-[0.9375rem]">{fact.detail}</dd>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="label text-stone">Concept scope</dt>
                <dd className="mt-2">
                  <ul className="space-y-1 text-[0.9375rem]">
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <Reveal className="lg:col-span-7 lg:col-start-6">
            <h2 id={`${project.slug}-concept`} className="label text-olive-deep">
              The concept
            </h2>
            <p className="mt-8 font-serif text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-[1.38] font-light">
              {project.narrative[0]}
            </p>
            <div className="mt-10 max-w-xl space-y-5 leading-relaxed text-stone lg:ml-auto">
              {project.narrative.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pb-12 lg:pb-20">
        {project.story.map((block, index) => (
          <StoryBlock key={`${block.type}-${index}`} block={block} />
        ))}
      </div>

      <section aria-labelledby={`${project.slug}-palette`} className="bg-sand py-24 lg:py-32">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h2 id={`${project.slug}-palette`} className="font-serif text-display-md font-light lg:col-span-6">
              Material palette
            </h2>
            <p className="max-w-md leading-relaxed text-stone lg:col-span-5 lg:col-start-8">
              A short list of materials, chosen to work together and to age with grace. Swatches
              are indicative of tone rather than exact specification.
            </p>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {project.palette.map((material, index) => (
              <li key={material.name}>
                <Reveal delay={index * 0.06}>
                  <span
                    aria-hidden="true"
                    className="block aspect-square w-full border border-ink/10"
                    style={{ backgroundColor: material.swatch }}
                  />
                  <p className="mt-4 font-serif text-[1.25rem] leading-tight">{material.name}</p>
                  <p className="mt-1 text-[0.875rem] text-stone">{material.note}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby={`${project.slug}-credits`} className="container-site py-16 lg:py-20">
        <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12">
          <h2 id={`${project.slug}-credits`} className="label text-stone lg:col-span-3">
            Image credits
          </h2>
          <div className="text-[0.875rem] leading-relaxed text-stone lg:col-span-8 lg:col-start-5">
            <p>
              Photography by{" "}
              {credits.map((group, index) => (
                <span key={group.photographer}>
                  {group.images.length === 1 ? (
                    <a
                      href={group.images[0].credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline-static text-ink"
                    >
                      {group.photographer}
                      <span className="sr-only"> (photo on Unsplash, opens in a new tab)</span>
                    </a>
                  ) : (
                    <>
                      <span className="text-ink">{group.photographer}</span> (photos{" "}
                      {group.images.map((image, photoIndex) => (
                        <span key={image.src}>
                          <a
                            href={image.credit.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-underline-static text-ink"
                          >
                            <span className="sr-only">{group.photographer}, photo </span>
                            {photoIndex + 1}
                            <span className="sr-only"> on Unsplash (opens in a new tab)</span>
                          </a>
                          {photoIndex < group.images.length - 1 && ", "}
                        </span>
                      ))}
                      )
                    </>
                  )}
                  {index < credits.length - 2 ? ", " : index === credits.length - 2 ? " and " : ""}
                </span>
              ))}{" "}
              on Unsplash, used under the Unsplash License.
            </p>
            <p className="mt-2">
              These images illustrate the concept only. They do not depict a project designed or
              delivered by ATELIER FORMA.
            </p>
          </div>
        </div>
      </section>

      <nav aria-label="Next project" className="border-t border-line">
        <Link
          href={`/projects/${next.slug}`}
          className="group container-site grid items-center gap-10 py-20 lg:grid-cols-12 lg:py-28"
        >
          <div className="lg:col-span-6">
            <p className="label text-stone">Next concept project</p>
            <p className="mt-6 flex items-center gap-5 font-serif text-display-lg font-light">
              <span className="link-underline-group">{next.title}</span>
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1}
                className="size-10 shrink-0 text-olive transition-transform duration-700 ease-quiet group-hover:translate-x-2 lg:size-14"
              />
            </p>
            <p className="mt-4 text-stone">
              {next.category} <span aria-hidden="true">·</span> {next.typology}
            </p>
          </div>
          <div
            className={cn(
              "relative overflow-hidden bg-sand",
              next.heroFormat === "portrait"
                ? "aspect-[4/5] w-3/5 sm:w-2/5 lg:col-span-3 lg:col-start-10 lg:w-full"
                : "aspect-[16/10] lg:col-span-5 lg:col-start-8",
            )}
          >
            <Image
              src={next.hero.src}
              alt=""
              fill
              sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              blurDataURL={next.hero.blurDataURL}
              className="object-cover transition-transform duration-[1600ms] ease-quiet group-hover:scale-[1.03]"
              style={next.hero.focus ? { objectPosition: next.hero.focus } : undefined}
            />
          </div>
        </Link>
      </nav>
    </article>
  );
}
