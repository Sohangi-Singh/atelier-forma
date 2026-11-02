import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/ui/primitives";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Six concept interiors by ATELIER FORMA — residential, hospitality and commercial design studies illustrated with licensed, credited photography.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="Portfolio · Concept work"
        title={
          <>
            Concept <em>projects</em>
          </>
        }
        lede="Six imagined interiors — residential, hospitality and commercial — each developed as a design study. Photography is licensed from Unsplash and credited on every project."
      />
      <section aria-label="Project index" className="container-site pb-28 lg:pb-44">
        <ProjectIndex projects={projects} categories={projectCategories} />
      </section>
      <ClosingCta
        title={
          <>
            Have a space in <em>mind?</em>
          </>
        }
      />
    </>
  );
}
