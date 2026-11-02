import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content/projects";

const knownSlugs = new Set(projects.map((project) => project.slug));

/**
 * Project pages stream from a static shell, so a `notFound()` inside the page
 * can only produce a soft 404 (status 200 + noindex). Checking the slug here,
 * before rendering starts, lets unknown projects return a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/project-not-found", request.url));
  }
}

export const config = {
  matcher: "/projects/:slug",
};
