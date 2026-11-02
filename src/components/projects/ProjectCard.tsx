import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialImage } from "@/components/media/EditorialImage";
import type { Project, SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";

interface ProjectCardProps {
  project: Project;
  sizes: string;
  /** Override the crop; defaults to the cover orientation. */
  aspect?: string;
  /** Override the cover image, e.g. to use a landscape frame in a wide slot. */
  image?: SiteImage;
  headingLevel?: "h2" | "h3";
  showSummary?: boolean;
  /** Disable the scroll reveal, e.g. when a parent already animates the card in. */
  reveal?: boolean;
  className?: string;
}

export function ProjectCard({
  project,
  sizes,
  aspect,
  image,
  headingLevel: Heading = "h3",
  showSummary = false,
  reveal = true,
  className,
}: ProjectCardProps) {
  const crop =
    aspect ?? (project.cover.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]");

  return (
    <article className={cn("group relative", className)}>
      <EditorialImage
        image={image ?? project.cover.image}
        aspect={crop}
        sizes={sizes}
        reveal={reveal}
        imageClassName="transition-transform duration-[1600ms] ease-quiet group-hover:scale-[1.03]"
      />
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="label text-stone">
            Concept project <span aria-hidden="true">·</span> {project.category}
          </p>
          <Heading className="mt-3 font-serif text-display-sm font-light">
            <Link href={`/projects/${project.slug}`} className="stretched-link link-underline-group">
              {project.title}
            </Link>
          </Heading>
          <p className="mt-2 text-[0.9375rem] text-stone">{project.setting}</p>
          {showSummary && (
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone">{project.summary}</p>
          )}
        </div>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.25}
          className="mt-8 size-6 shrink-0 text-olive transition-transform duration-500 ease-quiet group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </article>
  );
}
