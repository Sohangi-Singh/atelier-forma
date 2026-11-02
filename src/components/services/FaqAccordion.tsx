"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Disclosure accordion. Panels stay in the DOM so `aria-controls` always
 * resolves; collapsed panels are `visibility: hidden`, which also removes
 * them from the accessibility tree and tab order once the height transition ends.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-7 text-left"
              >
                <span className="font-serif text-[1.375rem] leading-snug font-light sm:text-[1.625rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-2.5 block size-4 shrink-0 text-olive-deep sm:mt-3.5"
                >
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-500 ease-quiet",
                      expanded && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows,visibility] duration-500 ease-quiet",
                expanded ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-2xl pb-8 leading-relaxed text-stone">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
