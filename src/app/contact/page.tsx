import { Suspense } from "react";
import { connection } from "next/server";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { EditorialImage } from "@/components/media/EditorialImage";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { getEnquiryConfig } from "@/lib/enquiry-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Send an enquiry through the ATELIER FORMA concept site. The form is validated and honest about whether online delivery is configured.",
  path: "/contact",
});

/** Reads delivery configuration per request, so the page shell can stay static. */
async function ConfiguredEnquiryForm() {
  await connection();
  return <EnquiryForm configured={getEnquiryConfig() !== null} />;
}

const details = [
  { term: "Enquiries", detail: "Through the form on this page." },
  {
    term: "Email",
    detail: (
      <>
        <span className="[overflow-wrap:anywhere]">{site.demoEmail}</span>
        <span className="mt-1 block text-[0.8125rem] text-stone">
          Fictional example address — it is not monitored.
        </span>
      </>
    ),
  },
  {
    term: "Studio",
    detail: "A design concept — there is no physical studio to visit.",
  },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="container-site pt-36 pb-28 sm:pt-44 lg:pb-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="label text-olive-deep motion-safe:animate-rise">Contact</p>
          <h1
            id="contact-title"
            className="mt-6 font-serif text-display-lg font-light motion-safe:animate-rise motion-safe:[animation-delay:80ms]"
          >
            Begin a <em>conversation.</em>
          </h1>
          <p className="mt-8 max-w-md text-lede text-stone motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
            Share a little about your space and what you hope it could become. Messages sent here
            reach the creator of this demonstration site — not an interior design studio.
          </p>

          <dl className="mt-12 max-w-md border-t border-line">
            {details.map((item) => (
              <div key={item.term} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-5">
                <dt className="label pt-1 text-stone">{item.term}</dt>
                <dd className="text-[0.9375rem]">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <EditorialImage
            image={images["contact-shelf"]}
            aspect="aspect-[4/5]"
            sizes="(min-width: 1024px) 22vw, 60vw"
            className="mt-14 hidden w-3/5 lg:block"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border-t border-ink pt-10 lg:mt-3">
            <h2 className="font-serif text-display-sm font-light">Project enquiry</h2>
            <div className="mt-8">
              <Suspense fallback={<EnquiryForm configured={null} />}>
                <ConfiguredEnquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
