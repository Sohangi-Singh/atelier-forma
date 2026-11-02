"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/cn";

type Filter = "All" | ProjectCategory;

const ease = [0.22, 1, 0.36, 1] as const;

const sizes = {
  landscape: "(min-width: 1440px) 790px, (min-width: 1024px) 56vw, 100vw",
  portrait: "(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw",
};

export function ProjectIndex({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...categories];
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((option) => {
            const count =
              option === "All" ? projects.length : projects.filter((p) => p.category === option).length;
            const active = option === filter;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 border px-4 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-colors duration-300",
                  active
                    ? "border-ink bg-ink text-ivory"
                    : "border-line text-ink hover:border-ink/60",
                )}
              >
                {option}
                <span className={cn("tabular-nums", active ? "text-ivory/70" : "text-stone")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-[0.875rem] text-stone">
          Showing {visible.length} concept {visible.length === 1 ? "project" : "projects"}
          {filter !== "All" && ` · ${filter}`}
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.45, ease }}
          className="mt-16 grid gap-x-8 gap-y-20 lg:mt-20 lg:grid-cols-12 lg:gap-y-28"
        >
          {visible.map((project, index) => {
            const portrait = project.cover.orientation === "portrait";
            const right = index % 2 === 1;
            return (
              <li
                key={project.slug}
                className={cn(
                  portrait
                    ? "sm:w-4/5 lg:col-span-5 lg:w-auto lg:justify-self-auto"
                    : "lg:col-span-7",
                  portrait && right && "sm:justify-self-end",
                  right ? "lg:col-end-13 lg:mt-40" : "lg:col-start-1",
                )}
              >
                <ProjectCard
                  project={project}
                  headingLevel="h2"
                  showSummary
                  reveal={false}
                  sizes={portrait ? sizes.portrait : sizes.landscape}
                />
              </li>
            );
          })}
        </m.ul>
      </AnimatePresence>
    </>
  );
}
