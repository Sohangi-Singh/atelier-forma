import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, SectionLabel } from "@/components/ui/primitives";
import { site } from "@/content/site";

/** What a first enquiry needs — kept short so beginning feels easy. */
const enquiryPrompts = [
  { title: "The space", body: "Where it is, roughly how large, and how it is used today." },
  { title: "The feeling", body: "How you would like it to feel, and what isn't working now." },
  { title: "The timing", body: "When you hope to begin, and any dates that matter." },
];

export function ClosingCta({
  title = (
    <>
      Let&rsquo;s imagine something <em>extraordinary.</em>
    </>
  ),
  body = "A first enquiry needs only a few lines. Every conversation begins with listening — to the space, its light and how you hope to live or work in it.",
  cta = site.consultationLabel,
}: {
  title?: React.ReactNode;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="bg-sand">
      <div className="container-site grid gap-14 py-28 lg:grid-cols-12 lg:gap-8 lg:py-36">
        <Reveal className="lg:col-span-6">
          <SectionLabel>Begin a project</SectionLabel>
          <h2 className="mt-6 font-serif text-display-lg font-light">{title}</h2>
          <p className="mt-8 max-w-md leading-relaxed text-stone">{body}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="label text-olive-deep">Share a few lines about</p>
          <ol className="mt-5 border-t border-ink/15">
            {enquiryPrompts.map((prompt, index) => (
              <li
                key={prompt.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-ink/15 py-5"
              >
                <span aria-hidden="true" className="font-serif text-[1.125rem] text-olive-deep italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-stone">
                  <span className="font-serif text-[1.25rem] font-light text-ink">{prompt.title}</span>
                  <br />
                  {prompt.body}
                </p>
              </li>
            ))}
          </ol>
          <ButtonLink href="/contact" className="mt-10">
            {cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
