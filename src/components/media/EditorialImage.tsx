import Image from "next/image";
import { ImageReveal } from "@/components/motion/Reveal";
import type { SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";

interface EditorialImageProps {
  image: SiteImage;
  /** Tailwind aspect-ratio classes that define the crop, e.g. "aspect-[4/5]". */
  aspect: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Above-the-fold images load eagerly with high priority and skip the reveal. */
  priority?: boolean;
  reveal?: boolean;
  caption?: string;
  /** Show the photographer credit beneath the image. */
  credit?: boolean;
  objectPosition?: string;
}

export function EditorialImage({
  image,
  aspect,
  sizes,
  className,
  imageClassName,
  priority = false,
  reveal = true,
  caption,
  credit = false,
  objectPosition = image.focus,
}: EditorialImageProps) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-cover", imageClassName)}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );

  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden bg-sand", aspect)}>
        {reveal && !priority ? (
          <ImageReveal className="absolute inset-0">{img}</ImageReveal>
        ) : (
          img
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[0.8125rem] leading-snug text-stone">
          {caption && <span>{caption}</span>}
          {credit && (
            <span className="text-[0.75rem]">
              Photo:{" "}
              <a
                href={image.credit.url}
                className="link-underline-static"
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.credit.photographer}
                <span className="sr-only"> on Unsplash (opens in a new tab)</span>
              </a>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
