import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  index,
  className,
  tone = "default",
  as: Tag = "p",
  id,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  tone?: "default" | "light";
  /** Render as a heading when the label is the section's only title. */
  as?: "p" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "label flex items-center gap-3",
        tone === "light" ? "text-ivory/80" : "text-olive-deep",
        className,
      )}
    >
      {index && <span aria-hidden="true">{index}</span>}
      {index && (
        <span
          aria-hidden="true"
          className={cn("h-px w-8", tone === "light" ? "bg-ivory/50" : "bg-olive")}
        />
      )}
      <span>{children}</span>
    </Tag>
  );
}

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
}

/** Understated text link with a travelling arrow. */
export function ArrowLink({ href, children, className, tone = "default" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 text-[0.9375rem] font-medium",
        tone === "light" ? "focus-light text-ivory" : "text-ink",
        className,
      )}
    >
      <span className="link-underline-static pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-500 ease-quiet group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "outline-light";
}

export function ButtonLink({ href, children, className, variant = "solid" }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.8125rem] font-medium tracking-[0.12em] uppercase transition-colors duration-500",
        variant === "solid" && "bg-ink text-ivory hover:bg-olive-deep",
        variant === "outline" && "border border-ink/70 text-ink hover:bg-ink hover:text-ivory",
        variant === "outline-light" &&
          "focus-light border border-ivory/70 text-ivory hover:bg-ivory hover:text-ink",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-500 ease-quiet group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}

/** Opening block for interior pages: label, headline and optional lede. */
export function PageIntro({
  label,
  title,
  lede,
  children,
}: {
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="container-site pt-36 pb-16 sm:pt-44 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="label text-olive-deep motion-safe:animate-rise">{label}</p>
          <h1 className="mt-6 font-serif text-display-lg font-light motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
            {title}
          </h1>
        </div>
        {lede && (
          <div className="text-lede text-stone motion-safe:animate-rise motion-safe:[animation-delay:160ms] lg:col-span-4 lg:pb-3">
            {lede}
          </div>
        )}
      </div>
      {children}
    </header>
  );
}
