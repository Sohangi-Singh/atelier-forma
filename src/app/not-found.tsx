import type { Metadata } from "next";
import { EditorialImage } from "@/components/media/EditorialImage";
import { ArrowLink, ButtonLink } from "@/components/ui/primitives";
import { images } from "@/content/images";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found.",
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="container-site pt-36 pb-28 sm:pt-44 lg:pb-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="label text-olive-deep">Error 404 · Page not found</p>
          <h1 id="not-found-title" className="mt-6 font-serif text-display-lg font-light">
            This room hasn&rsquo;t been <em>designed yet.</em>
          </h1>
          <p className="mt-8 max-w-md text-lede text-stone">
            The page you were looking for may have moved, or perhaps it was only ever an idea. Let
            us take you somewhere more considered.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            <ButtonLink href="/">Return home</ButtonLink>
            <ArrowLink href="/projects">View concept projects</ArrowLink>
          </div>
        </div>
        <EditorialImage
          image={images["not-found-room"]}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1440px) 600px, (min-width: 1024px) 42vw, 100vw"
          className="lg:col-span-5 lg:col-start-8"
          priority
        />
      </div>
    </section>
  );
}
