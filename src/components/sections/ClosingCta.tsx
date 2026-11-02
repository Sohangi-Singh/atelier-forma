import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/primitives";

export function ClosingCta({
  title = (
    <>
      Let&rsquo;s imagine something <em>extraordinary.</em>
    </>
  ),
  body = "Tell us about the space you have in mind — its light, its history and how you hope it will feel. Every conversation begins with listening.",
  cta = "Begin a conversation",
}: {
  title?: React.ReactNode;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="bg-sand">
      <div className="container-site py-28 lg:py-40">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="font-serif text-display-lg font-light lg:col-span-8">
            {title}
          </h2>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm leading-relaxed text-stone">{body}</p>
            <ButtonLink href="/contact" className="mt-8">
              {cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
