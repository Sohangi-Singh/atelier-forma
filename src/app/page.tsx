import { EditorialFeature } from "@/components/home/EditorialFeature";
import { HomeHero } from "@/components/home/HomeHero";
import { Philosophy } from "@/components/home/Philosophy";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { StudioIntro } from "@/components/home/StudioIntro";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StudioIntro />
      <SelectedWork />
      <Philosophy />
      <ServicesPreview />
      <ProcessTimeline index="05" />
      <EditorialFeature />
      <ClosingCta />
    </>
  );
}
