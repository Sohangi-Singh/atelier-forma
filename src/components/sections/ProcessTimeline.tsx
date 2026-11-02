import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { processSteps } from "@/content/studio";
import { cn } from "@/lib/cn";

interface ProcessTimelineProps {
  index?: string;
  title?: string;
  intro?: string;
  /** Show the focus list beneath each step (used on the services page). */
  detailed?: boolean;
  tone?: "dark" | "light";
}

export function ProcessTimeline({
  index,
  title = "A considered process",
  intro = "Every concept moves through four deliberate stages. Each one ends with a clear decision, so the work gathers momentum without losing its calm.",
  detailed = false,
  tone = "dark",
}: ProcessTimelineProps) {
  const dark = tone === "dark";

  return (
    <section className={cn("py-28 lg:py-40", dark ? "bg-ink text-ivory" : "bg-ivory text-ink")}>
      <div className="container-site">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel index={index} tone={dark ? "light" : "default"}>
              Process
            </SectionLabel>
            <h2 className="mt-6 font-serif text-display-md font-light">
              {title}
            </h2>
          </div>
          <p
            className={cn(
              "max-w-md leading-relaxed lg:col-span-4 lg:col-start-9",
              dark ? "text-ivory/75" : "text-stone",
            )}
          >
            {intro}
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-24 lg:grid-cols-4 lg:gap-x-0">
          {processSteps.map((step, stepIndex) => (
            <li
              key={step.title}
              className={cn(
                "relative border-t pt-8 lg:pr-10",
                dark ? "border-ivory/20" : "border-ink/15",
              )}
            >
              {/* The marker sits outside the reveal: a transformed ancestor would become its
                  containing block and lift it off the rule until the animation ended. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-[5px] left-0 size-[9px] rounded-full",
                  dark ? "bg-ivory" : "bg-olive",
                )}
              />
              <Reveal delay={stepIndex * 0.1}>
                <p
                  className={cn(
                    "font-serif text-[3.5rem] leading-none font-extralight",
                    dark ? "text-ivory/45" : "text-olive",
                  )}
                >
                  <span className="sr-only">Stage </span>
                  {step.number}
                </p>
                <h3 className="mt-6 font-serif text-[1.875rem] leading-tight font-light">{step.title}</h3>
                <p
                  className={cn(
                    "mt-4 text-[0.9375rem] leading-relaxed",
                    dark ? "text-ivory/75" : "text-stone",
                  )}
                >
                  {step.summary}
                </p>
                {detailed && (
                  <ul
                    className={cn(
                      "mt-6 space-y-2 border-t pt-5 text-[0.875rem]",
                      dark ? "border-ivory/15 text-ivory/80" : "border-ink/10 text-stone",
                    )}
                  >
                    {step.focus.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className={dark ? "text-ivory/40" : "text-olive"}>
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
