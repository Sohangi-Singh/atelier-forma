# ATELIER FORMA — Spaces shaped by intention.

A luxury editorial website for a **fictional** interior architecture and design studio, built as a portfolio and sales demo for a freelance web development practice.

> **Concept notice.** ATELIER FORMA is an independent design concept created for portfolio demonstration. It is not an operating interior design studio. The projects are concept studies illustrated with licensed third-party photography; there are no real clients, commissions, team members, awards or testimonials. The contact email uses the reserved `.example` domain and is not monitored. The same notice appears in the site footer, on the Studio page and in the FAQ.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components + Partial Prefetching) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Motion | Motion for React 14 (`LazyMotion` + `domAnimation`), honouring `prefers-reduced-motion` |
| Icons | Lucide React |
| Fonts | `next/font/google`: Newsreader (display serif, without the optical-size axis) + Albert Sans (body) |
| Images | `next/image` with local, pre-optimised JPEGs, blur placeholders and WebP delivery |
| Forms | React Hook Form + Zod (one schema shared by client and server) |
| Email | Resend REST API via a Next.js Route Handler (no SDK dependency) |

## Getting started

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (`npm run start -- -p 3100` for another port) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit` |
| `npm run check` | Lint, typecheck and build in sequence |

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored) and fill in what you need.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended outside Vercel | Canonical URLs, Open Graph, `robots.txt`, `sitemap.xml`. On Vercel the production domain is detected from `VERCEL_PROJECT_PRODUCTION_URL`. |
| `RESEND_API_KEY` | For enquiries | Resend API key (server-side only). |
| `ENQUIRY_TO_EMAIL` | For enquiries | Inbox that receives enquiries. |
| `ENQUIRY_FROM_EMAIL` | For enquiries | Sender on a domain verified in Resend, e.g. `Studio Enquiries <enquiries@yourdomain.com>`. |

### How the enquiry form behaves

- **Not configured (default):** the contact page shows a notice before anyone types, and a submission returns `503 not_configured`. The UI says *"Not sent"*. It never shows a success message.
- **Configured:** `POST /api/enquiry` validates the payload with the shared Zod schema, then sends a plain-text email through Resend with `reply_to` set to the sender. The success message appears **only** when Resend accepts the email and the route returns `{ ok: true }`.
- **Anti-spam:** a hidden honeypot field, a minimum fill time (3 seconds from page load), a same-origin `Origin` check, a 16 KB body limit and a best-effort rate limit (5 requests per 10 minutes per IP, per server instance).
- **Privacy:** enquiries are not stored or logged. On failure the server logs only the provider's HTTP status.

To enable delivery: create a Resend account, verify a sending domain, create an API key and set the three variables above — locally in `.env.local` (then restart `npm run dev`), or in Vercel → Project → Settings → Environment Variables (then redeploy).

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, **Add New → Project**, import the repository. The framework preset (Next.js) and build settings are detected automatically; no overrides are needed.
3. Optional: add `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and `ENQUIRY_FROM_EMAIL` under Environment Variables to enable the form. Add `NEXT_PUBLIC_SITE_URL` if you use a custom domain and want canonical URLs to use it before it is set as the production domain.
4. Deploy.

Or from the command line:

```bash
npx vercel
```

```bash
npx vercel --prod
```

## Project structure

```
src/
  app/                    Routes (App Router)
    page.tsx              Home
    projects/             Index with filters, and [slug] detail pages (generateStaticParams)
    studio/ services/ contact/
    api/enquiry/route.ts  Validated enquiry endpoint (Resend)
    not-found.tsx         Custom 404
    sitemap.ts robots.ts  SEO files
    icon.svg apple-icon.png
  components/             Layout, motion, media, home sections, projects, services, contact
  content/                Typed content — edit these to rebrand
    site.ts               Name, tagline, navigation, disclaimer, demo email
    projects.ts           Six concept projects (story blocks, palettes, settings)
    studio.ts             Services, process, principles, tenets, FAQ
    images.ts             Generated image manifest (dimensions, alt text, blur, credits)
    types.ts
  lib/                    Shared schema, metadata helper, config reader
  proxy.ts                Returns a real 404 status for unknown project slugs
public/
  images/                 Optimised photography (site/ and projects/)
  og.jpg                  1200×630 social preview
```

### Customising for a real studio

1. Edit `src/content/site.ts` (name, tagline, navigation, disclaimer, contact details).
2. Replace projects in `src/content/projects.ts`. Each project is a typed object with a hero, cover, ordered story blocks (`wide`, `duo`, `offset`, `split`) and a material palette. Set `heroFormat: "portrait"` to show the hero as a tall frame beside the title instead of full width.
3. Replace photography in `public/images/` and update `src/content/images.ts` with each file's `width`, `height`, `alt`, `blurDataURL` and credit. An optional `focus` (a CSS `object-position`, e.g. `"20% 50%"`) keeps the subject in frame when an image is cropped tightly.
4. Update services, process, principles and FAQ in `src/content/studio.ts`.
5. Regenerate `public/og.jpg`, `src/app/icon.svg` and `src/app/apple-icon.png` for the new brand.
6. Remove or rewrite the concept disclaimers only if the site genuinely represents a real, operating studio.

## Design system

- **Palette** (from the brief): ivory `#F7F5F0`, charcoal `#262722`, muted grey `#74736D`, olive `#777B66`, border `#DDDAD2`, sand `#EAE7DF`.
- **Contrast adjustment:** the brief's muted grey (4.36:1 on ivory) and olive (4.01:1) fall just short of WCAG AA for body-size text. They are kept for lines, fills and large type, and two text-safe variants are used for small text: `stone` `#67665F` (5.29:1 on ivory) and `olive-deep` `#5E6152` (5.83:1).
- **Typography:** fluid `clamp()` scales (`text-display-xl` → `text-label`) defined as Tailwind theme tokens.
- **Layout:** 1440px max container with fluid gutters, a 12-column asymmetric grid on desktop, single column on mobile.
- **Fonts:** Newsreader is loaded without its optical-size axis. The axis more than doubled the font payload (~270 KB → ~120 KB without it) and was the largest factor in mobile LCP; the display serif is very slightly sturdier as a result.
- **Motion:** CSS for above-the-fold entrances (no JavaScript needed for first paint), Motion for scroll reveals, the mobile menu and the project filter. Reduced-motion users get fades without movement, and content stays visible without JavaScript.

## Accessibility and engineering notes

- Semantic landmarks, a skip link, one `h1` per page and an ordered heading hierarchy.
- Mobile menu: `aria-expanded`/`aria-controls`, focus moves into the menu, the page behind becomes `inert` with scroll locked, Escape closes and returns focus to the toggle, and any navigation closes it.
- Project filters are toggle buttons with `aria-pressed` and a polite live region announcing the result count.
- FAQ uses buttons with `aria-expanded` and `aria-controls`; panels stay in the DOM so `aria-controls` always resolves.
- Form fields have visible labels, inline errors linked by `aria-describedby`, `aria-invalid`, focus on the first error, and a focused status message after submission.
- Cache Components keeps recently visited routes mounted (hidden). Section IDs are scoped per route so hidden pages never duplicate IDs referenced by `aria-labelledby`.
- Unknown project slugs return HTTP 404 via `src/proxy.ts`; without it, a streamed page could only produce a "soft 404".
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are set in `next.config.ts`.

## Image credits

All photographs are from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license), which permits free commercial and non-commercial use without permission. Attribution is not legally required but is given throughout the site (on every project page and the Studio page) and below. Each image was checked to be a standard free Unsplash photo, not an Unsplash+ licensed image. Images were downloaded once, resized (max 2400px) and re-encoded locally; `next/image` serves responsive WebP versions.

The photographs illustrate concept ideas only. They do not depict work designed or delivered by ATELIER FORMA, and the projects are not presented as real commissions. Unsplash's license does not cover identifiable trademarks, people or artworks within photos; none of the selected images is used to imply endorsement.

| File | Used on | Photographer | Source |
| --- | --- | --- | --- |
| `public/images/site/home-hero.jpg` | Home | Prydumano Design | [Unsplash](https://unsplash.com/photos/a-modern-living-room-with-a-large-window-vIbxvHj9m9g) |
| `public/images/site/home-philosophy.jpg` | Home | Mathilde Langevin | [Unsplash](https://unsplash.com/photos/white-and-brown-window-curtain-LdPzzJcrPLM) |
| `public/images/site/home-editorial-arch.jpg` | Home | Inside Weather | [Unsplash](https://unsplash.com/photos/black-and-brown-leather-padded-tub-sofa-Uxqlfigh6oE) |
| `public/images/site/home-editorial-vase.jpg` | Home | Mathieu Perrier | [Unsplash](https://unsplash.com/photos/white-flowers-in-white-ceramic-vase-on-top-of-white-table-44OaWM_ObWk) |
| `public/images/site/service-residential.jpg` | Services | Suhyeon Choi | [Unsplash](https://unsplash.com/photos/sunlit-interior-with-sofa-and-table-ehxwis6Ltxg) |
| `public/images/site/service-spatial.jpg` | Services | Alesia Kazantceva | [Unsplash](https://unsplash.com/photos/minimalist-concrete-staircase-with-vase-0B7ijYKaKcE) |
| `public/images/site/service-material.jpg` | Services | Karolina Grabowska | [Unsplash](https://unsplash.com/photos/a-lamp-and-books-on-a-table-ulh3-dLSXjI) |
| `public/images/site/service-renovation.jpg` | Services | Margo Evardson | [Unsplash](https://unsplash.com/photos/an-empty-old-room-with-two-windows-and-distressed-walls-MQE7ld8vxLI) |
| `public/images/site/services-hero.jpg` | Services | Dorsa Masghati | [Unsplash](https://unsplash.com/photos/white-concrete-wall-during-daytime-NRLnzGXtoE4) |
| `public/images/site/studio-hero.jpg` | Studio | Anton Lammert | [Unsplash](https://unsplash.com/photos/the-shadow-of-a-building-on-the-side-of-it-oMCC7gKDBYE) |
| `public/images/site/studio-vessels.jpg` | Studio | Alona Gross | [Unsplash](https://unsplash.com/photos/a-couple-of-vases-that-have-flowers-in-them--1ZOkqWiI98) |
| `public/images/site/contact-shelf.jpg` | Contact | Sarah PASA | [Unsplash](https://unsplash.com/photos/a-wooden-shelf-with-a-vase-of-flowers-on-top-of-it-Gti_gcDiWX8) |
| `public/images/site/not-found-room.jpg` | 404 page | Steffen Lemmerzahl | [Unsplash](https://unsplash.com/photos/an-empty-room-with-a-sliding-glass-door-tEIlB2ma4fY) |
| `public/images/projects/still-house-hero.jpg` | The Still House | Daniel Chen | [Unsplash](https://unsplash.com/photos/brown-wooden-bench-near-window-SoNaNOFT974) |
| `public/images/projects/still-house-bench.jpg` | The Still House | AllysherLow | [Unsplash](https://unsplash.com/photos/a-wooden-bench-sitting-next-to-a-couple-of-wooden-blocks-anPRM2-kZxY) |
| `public/images/projects/still-house-chest.jpg` | The Still House | AllysherLow | [Unsplash](https://unsplash.com/photos/a-large-wooden-chest-of-drawers-in-a-room-Wn2FlrxJqa4) |
| `public/images/projects/still-house-beam.jpg` | The Still House | AllysherLow | [Unsplash](https://unsplash.com/photos/a-wooden-beam-in-the-ceiling-of-a-room-kHsrTPTmTbQ) |
| `public/images/projects/still-house-niche.jpg` | The Still House | Liana Mikah | [Unsplash](https://unsplash.com/photos/a-vase-and-a-vase-in-a-room-fcZQ9XXFhTI) |
| `public/images/projects/house-of-light-hero.jpg` | House of Light | Clay Banks | [Unsplash](https://unsplash.com/photos/modern-living-space-with-large-window-overlooking-nature-b6Bs19onFtY) |
| `public/images/projects/house-of-light-living.jpg` | House of Light | Caroline Badran | [Unsplash](https://unsplash.com/photos/modern-living-room-with-large-windows-and-scenic-view-12WFO8yWrsw) |
| `public/images/projects/house-of-light-kitchen.jpg` | House of Light | Clay Banks | [Unsplash](https://unsplash.com/photos/modern-kitchen-with-walnut-cabinetry-TDXF1KUyyTk) |
| `public/images/projects/house-of-light-curve.jpg` | House of Light | Caroline Badran | [Unsplash](https://unsplash.com/photos/modern-kitchen-with-curved-wooden-walls-and-countertop-S8Nns16S24g) |
| `public/images/projects/terra-hero.jpg` | Terra Residence | Peter Muniz | [Unsplash](https://unsplash.com/photos/modern-bathroom-with-a-long-vanity-and-shower-VJ1pilUtw9o) |
| `public/images/projects/terra-basin.jpg` | Terra Residence | Peter Muniz | [Unsplash](https://unsplash.com/photos/modern-bathroom-with-a-stone-sink-and-black-faucet-wfMM98Vggn0) |
| `public/images/projects/terra-shower.jpg` | Terra Residence | Peter Muniz | [Unsplash](https://unsplash.com/photos/modern-shower-stall-with-stone-tiles-and-bench-ZFkvylq-n9A) |
| `public/images/projects/terra-clay.jpg` | Terra Residence | Ela De Pure | [Unsplash](https://unsplash.com/photos/modern-bathroom-with-stone-sink-wooden-cabinets-and-round-mirror-3E3OowQoPMY) |
| `public/images/projects/courtyard-hero.jpg` | The Courtyard | Rajith Jayawardana | [Unsplash](https://unsplash.com/photos/a-room-with-a-brick-wall-and-a-tree-in-the-corner-yJlnlQ3Qm7k) |
| `public/images/projects/courtyard-lattice.jpg` | The Courtyard | Rajith Jayawardana | [Unsplash](https://unsplash.com/photos/a-white-couch-sitting-in-a-living-room-next-to-a-window-91-cEibWbvk) |
| `public/images/projects/courtyard-reading.jpg` | The Courtyard | Rajith Jayawardana | [Unsplash](https://unsplash.com/photos/a-white-couch-sitting-in-a-living-room-next-to-a-book-shelf-4doE-KezRXg) |
| `public/images/projects/courtyard-stair.jpg` | The Courtyard | Rajith Jayawardana | [Unsplash](https://unsplash.com/photos/a-stair-case-next-to-a-wooden-hand-rail-eWf6dPr2cAg) |
| `public/images/projects/quiet-table-hero.jpg` | The Quiet Table | White.Rainforest | [Unsplash](https://unsplash.com/photos/a-room-filled-with-wooden-tables-and-benches-CVVbynP7DQ4) |
| `public/images/projects/quiet-table-corner.jpg` | The Quiet Table | Sandie Clarke | [Unsplash](https://unsplash.com/photos/warm-interior-with-wooden-table-chairs-and-wall-light-RQrTv-1i5MM) |
| `public/images/projects/quiet-table-detail.jpg` | The Quiet Table | Haberdoedas | [Unsplash](https://unsplash.com/photos/marble-salt-cellar-with-wooden-spoon-on-paper-cOMp1Fk9gPo) |
| `public/images/projects/quiet-table-window.jpg` | The Quiet Table | Mustafa Sheikhmouss | [Unsplash](https://unsplash.com/photos/cafe-tables-with-woven-chairs-TzBFk5nzAKY) |
| `public/images/projects/quiet-table-evening.jpg` | The Quiet Table | Andrey Kremkov | [Unsplash](https://unsplash.com/photos/white-flowers-in-clear-glass-vase-on-brown-wooden-table-TNXMvUxkYyI) |
| `public/images/projects/form-hero.jpg` | Form & Function | Declan Sun | [Unsplash](https://unsplash.com/photos/concrete-coffee-counter-with-white-brewing-equipment-XJqp40ozlIE) |
| `public/images/projects/form-arch.jpg` | Form & Function | Declan Sun | [Unsplash](https://unsplash.com/photos/modern-retail-interior-with-concrete-arch-and-glass-partitions-4c_He7ut3x8) |
| `public/images/projects/form-lounge.jpg` | Form & Function | lim woojung | [Unsplash](https://unsplash.com/photos/modern-minimalist-seating-area-with-wooden-furniture-XKm9AmmSn3I) |
| `public/images/projects/form-corridor.jpg` | Form & Function | Pavel Gromov | [Unsplash](https://unsplash.com/photos/sleek-minimalist-corridor-leading-to-a-modern-office-space-_x0IIgT4Rcg) |

## Verification

Last checked on 3 November 2026 against a local production build (`npm run build && npm run start`).

**Automated checks** — `npm run check` (lint, typecheck, build) passes with no errors or warnings.

**Visual review** — every route was captured as full-page screenshots in headless Chrome at 1440px, 768px, 375px and 320px (after scrolling so scroll reveals had run) and reviewed page by page. No route has horizontal overflow at any of those widths.

**Interaction checks** (scripted in headless Chrome, 30 checks):

- Desktop navigation reaches every page and sets `aria-current`; the logo returns home.
- Every internal link on every page returns `200`; in-page anchors resolve; external links are Unsplash credit links with `rel="noopener noreferrer"`.
- All six project pages load with no broken images and link to the next project; unknown slugs and unknown paths return `404`.
- Filters show the right two projects per category, set `aria-pressed`, announce the count in a live region, and work from the keyboard.
- Mobile menu: focus moves into it, the page behind is `inert` with scroll locked, Escape closes it and returns focus to the toggle, following a link navigates and closes it.
- FAQ panels expand with `aria-expanded` / `aria-controls`.
- Contact form, **unconfigured**: the notice shows before typing; an empty submit is blocked client-side and focuses the first invalid field; a valid submit gets `503` and shows "Not sent" — never a success message.
- Contact form, **configured** (a second server started with placeholder credentials; the browser's POST was intercepted so no email provider was contacted): no "not configured" notice; a delivery failure shows an error; a `200` response without `ok: true` shows no success; only `{ ok: true }` shows the success message.

**HTTP checks** (curl): the enquiry API returns `503 not_configured` without credentials, `400` for a filled honeypot or a too-fast submission, `422` with field errors for invalid data, `403` for a cross-origin `Origin`, and `405` for `GET`.

**Lighthouse 13.5** (local production server, default simulated throttling; scores vary by a few points between runs and will differ on a real deployment). Pages changed in the 3 November review were re-measured; the others are from 2 November:

| Page | Device | Performance | Accessibility | Best practices | SEO | Measured |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Mobile | 94 | 100 | 100 | 100 | 3 Nov |
| `/` | Desktop | 99 | 100 | 100 | 100 | 3 Nov |
| `/projects` | Mobile | 90 | 100 | 100 | 100 | 3 Nov |
| `/projects/terra-residence` | Mobile | 91 | 100 | 100 | 100 | 3 Nov |
| `/projects/terra-residence` | Desktop | 100 | 100 | 100 | 100 | 3 Nov |
| `/projects/the-courtyard` | Mobile | 91 | 100 | 100 | 100 | 2 Nov |
| `/studio` | Mobile | 92 | 100 | 100 | 100 | 2 Nov |
| `/services` | Mobile | 93 | 100 | 100 | 100 | 2 Nov |
| `/contact` | Mobile | 91 | 100 | 100 | 100 | 2 Nov |
| `/contact` | Desktop | 100 | 100 | 100 | 100 | 2 Nov |

Cumulative Layout Shift was 0 on every run.

### Not tested

- **Real email delivery.** No Resend credentials were available. The server's call to Resend has not run; the success path was tested only with an intercepted response.
- **A deployed Vercel environment.** Everything above ran locally. On first deploy, each image size is optimised on its first request, so the very first visits are slower than repeat visits.
- **Screen readers** (VoiceOver, NVDA) and **non-Chromium browsers** (Safari, Firefox), and **physical touch devices**. Accessibility was checked through markup inspection, keyboard behaviour and Lighthouse audits only.
- There is no automated test suite in the repository (the interaction checks above were run from a scratch script).

### Known limitations

- The rate limiter is in memory and per server instance. On serverless platforms it is a best-effort deterrent; use a shared store (e.g. Upstash Redis) if you need a strict limit.
- The minimum fill-time check trusts a value reported by the browser. It deters simple bots, not determined ones; add a CAPTCHA-style service (e.g. Cloudflare Turnstile) if spam becomes a problem.
- Some project photography is softer than the rest. The Still House detail shots (by AllysherLow) are phone-quality and show grain at large sizes, and Terra Residence's guest-washroom photo includes a WC in frame. Replace them with sharper licensed images before using the site as a sales piece.
