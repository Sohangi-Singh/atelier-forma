import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { images } from "@/content/images";
import { principles } from "@/content/studio";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="bg-sand py-28 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center">
        <EditorialImage
          image={images["home-philosophy"]}
          aspect="aspect-[4/5]"
          sizes="(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw"
          className="sm:w-3/4 lg:col-span-5 lg:w-full"
        />
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <SectionLabel index="03">Philosophy</SectionLabel>
            <h2 id="philosophy-title" className="mt-6 font-serif text-display-lg font-light">
              The art of <em>living well.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-xl space-y-5 text-lede text-stone">
            <p>
              Living well has little to do with luxury in the usual sense. It is found in the
              weight of a door handle, the way morning light reaches the table, a chair that
              invites you to stay a little longer.
            </p>
            <p>
              The work is to notice these things and design for them deliberately — so that a
              home, a restaurant or a workplace feels effortless to be in, even when a great deal
              of thought sits behind it.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-site mt-24 lg:mt-32">
        <h3 className="label text-olive-deep">Design principles</h3>
        <ol className="mt-8 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              className="border-b border-ink/15 py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <Reveal delay={index * 0.08}>
                <span aria-hidden="true" className="font-serif text-[1.125rem] text-olive-deep italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-4 font-serif text-[1.625rem] leading-tight font-light">
                  {principle.title}
                </h4>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{principle.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
