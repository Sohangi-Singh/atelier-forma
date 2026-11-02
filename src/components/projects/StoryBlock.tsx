import { EditorialImage } from "@/components/media/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import type { SiteImage, StoryBlock as StoryBlockData } from "@/content/types";
import { cn } from "@/lib/cn";

const isPortrait = (image: SiteImage) => image.height > image.width * 1.05;

export function StoryBlock({ block }: { block: StoryBlockData }) {
  switch (block.type) {
    case "wide":
      return (
        <div className="container-site py-12 lg:py-20">
          <EditorialImage
            image={block.image}
            aspect="aspect-[4/3] md:aspect-[16/9]"
            sizes="(min-width: 1440px) 1300px, 100vw"
            caption={block.caption}
          />
        </div>
      );

    case "duo":
      return (
        <div className="container-site grid gap-8 py-12 sm:grid-cols-2 lg:gap-12 lg:py-20">
          <EditorialImage
            image={block.images[0]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1440px) 640px, (min-width: 640px) 50vw, 100vw"
          />
          <EditorialImage
            image={block.images[1]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1440px) 640px, (min-width: 640px) 50vw, 100vw"
            className="sm:mt-24"
          />
        </div>
      );

    case "offset":
      return (
        <div className="container-site grid gap-8 py-12 lg:grid-cols-12 lg:py-20">
          <EditorialImage
            image={block.images[0]}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1440px) 790px, (min-width: 1024px) 56vw, 100vw"
            className="lg:col-span-7"
          />
          <EditorialImage
            image={block.images[1]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1440px) 440px, (min-width: 1024px) 31vw, 100vw"
            className="w-3/4 justify-self-end lg:col-span-4 lg:col-start-9 lg:mt-40 lg:w-full"
          />
        </div>
      );

    case "split": {
      const imageRight = block.align === "image-right";
      const portrait = isPortrait(block.image);
      // Portrait frames take five columns so the text keeps its weight beside them.
      return (
        <div className="container-site grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <EditorialImage
            image={block.image}
            aspect={portrait ? "aspect-[4/5]" : "aspect-[4/3]"}
            sizes={
              portrait
                ? "(min-width: 1440px) 540px, (min-width: 1024px) 40vw, 100vw"
                : "(min-width: 1440px) 660px, (min-width: 1024px) 48vw, 100vw"
            }
            className={cn(
              portrait ? "sm:w-3/4 lg:col-span-5 lg:w-full" : "lg:col-span-6",
              imageRight && (portrait ? "lg:order-2 lg:col-start-8" : "lg:order-2 lg:col-start-7"),
            )}
          />
          <Reveal
            className={cn(
              "lg:col-span-4",
              imageRight ? "lg:order-1 lg:col-start-2" : portrait ? "lg:col-start-7" : "lg:col-start-8",
            )}
          >
            <h2 className="font-serif text-display-sm font-light">{block.heading}</h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-stone">{block.body}</p>
          </Reveal>
        </div>
      );
    }
  }
}
