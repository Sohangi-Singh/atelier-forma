import Image from "next/image";
import { ButtonLink } from "@/components/ui/primitives";
import { images } from "@/content/images";

const hero = images["home-hero"];

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[36rem] items-end overflow-hidden bg-ink text-ivory"
    >
      <div className="absolute inset-0 -z-20 motion-safe:animate-settle">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.blurDataURL}
          // Narrow screens frame the shelving and sofa end rather than the bare wall.
          className="object-cover object-[80%_55%] lg:object-[50%_55%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(38_39_34/0.42)_0%,rgb(38_39_34/0)_22%,rgb(38_39_34/0)_45%,rgb(38_39_34/0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(38_39_34/0.42)_0%,rgb(38_39_34/0.1)_45%,transparent_65%)]"
      />

      <div className="container-site pb-16 sm:pb-20 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label text-ivory/85 motion-safe:animate-rise">
              Interior architecture <span aria-hidden="true">·</span> Concept studio
            </p>
            <h1
              id="hero-title"
              className="mt-6 font-serif text-display-xl font-light motion-safe:animate-rise motion-safe:[animation-delay:120ms]"
            >
              <span className="block">Spaces shaped</span>
              <span className="block italic">by intention.</span>
            </h1>
          </div>
          <div className="motion-safe:animate-rise motion-safe:[animation-delay:260ms] lg:col-span-3 lg:col-start-10 lg:pb-3">
            <p className="max-w-xs text-[1rem] leading-relaxed text-ivory/85">
              Residential, hospitality and commercial interiors composed with natural light,
              honest materials and restraint.
            </p>
            <ButtonLink href="/projects" variant="outline-light" className="mt-8">
              Explore our work
            </ButtonLink>
          </div>
        </div>
      </div>

      <a
        href="#introduction"
        className="focus-light absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 pb-0 md:flex"
      >
        <span className="label text-[0.625rem] text-ivory/75">Scroll</span>
        <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 block bg-ivory/80 motion-safe:animate-drip" />
        </span>
        <span className="sr-only">to the introduction</span>
      </a>
    </section>
  );
}
