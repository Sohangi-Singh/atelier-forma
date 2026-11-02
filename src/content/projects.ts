import { images } from "./images";
import type { Project, ProjectCategory } from "./types";

export const projectCategories: ProjectCategory[] = [
  "Residential",
  "Hospitality",
  "Commercial",
];

/**
 * Concept projects. Every entry is an imagined design study illustrated with
 * licensed third-party photography — none depict completed commissions.
 */
export const projects: Project[] = [
  {
    slug: "the-still-house",
    title: "The Still House",
    category: "Hospitality",
    typology: "Retreat guest house",
    setting: "A wooded hillside — imagined setting",
    summary:
      "A retreat concept built around stillness: reclaimed timber, limewashed walls and one round window that frames the passing day.",
    lede: "The Still House imagines a retreat in which almost nothing competes for attention. Rooms are reduced to timber, plaster and light, so guests begin to notice the weather, the grain and the quiet.",
    narrative: [
      "The concept starts from a single question: what does a room need to hold if its only purpose is rest? The answer shaped every decision — low furniture that keeps the eye close to the floor, deep window reveals that slow the light, and a palette drawn from the materials of the site itself.",
      "Reclaimed beams and hand-cut timber blocks are left visibly worked, set against limewashed walls that shift in tone through the day. Storage disappears into thickened walls, so each room shows only what is in use.",
    ],
    scope: [
      "Spatial concept",
      "Material direction",
      "Furniture curation",
      "Lighting atmosphere",
    ],
    hero: images["still-house-hero"],
    cover: { image: images["still-house-hero"], orientation: "landscape" },
    story: [
      {
        type: "duo",
        images: [images["still-house-bench"], images["still-house-chest"]],
      },
      {
        type: "split",
        image: images["still-house-niche"],
        heading: "Room to breathe",
        body: "Objects are few and deliberately placed: two pale vessels, a woven mat, a single branch. Empty space is treated as a material in its own right, giving each piece the distance it needs to be seen.",
        align: "image-left",
      },
      {
        type: "split",
        image: images["still-house-beam"],
        heading: "Structure as ornament",
        body: "Rather than concealing the frame, the concept celebrates it. Weathered beams and posts become the only decoration overhead, washed by small, low-glare lights that keep evenings dim and restful.",
        align: "image-right",
      },
    ],
    palette: [
      { name: "Limewash", note: "Soft, breathable walls", swatch: "#e4ddd1" },
      { name: "Reclaimed oak", note: "Beams, benches, blocks", swatch: "#6b4e37" },
      { name: "Rammed earth", note: "Thresholds and hearth", swatch: "#b59b7e" },
      { name: "Raw linen", note: "Curtains and cushions", swatch: "#d9d1c3" },
      { name: "Charcoal clay", note: "Vessels and fittings", swatch: "#3a3631" },
    ],
    featured: true,
  },
  {
    slug: "house-of-light",
    title: "House of Light",
    category: "Residential",
    typology: "Family residence",
    setting: "A woodland edge — imagined setting",
    summary:
      "A light-led concept for a family home where generous openings, pale oak and soft plaster let the landscape do most of the decorating.",
    lede: "House of Light is organised around the movement of daylight — from low morning sun in the kitchen to the long evening light that crosses the living room.",
    narrative: [
      "Rather than adding pieces to a room, the concept removes what stands between the household and the view. Window heights are set to seated eye level, sills become benches, and joinery is pulled back from the glass so light can travel deep into the plan.",
      "Warm oak, walnut and textured plaster balance the brightness, while a curved kitchen wall softens the passage between cooking and gathering.",
    ],
    scope: [
      "Whole-home interior concept",
      "Joinery design",
      "Lighting strategy",
      "Furniture and textiles",
    ],
    hero: images["house-of-light-hero"],
    cover: { image: images["house-of-light-living"], orientation: "portrait" },
    story: [
      {
        type: "split",
        image: images["house-of-light-living"],
        heading: "Framing the landscape",
        body: "Full-height glazing turns the hillside into the room's largest artwork. Furniture stays low and pale so that nothing interrupts the line of the horizon.",
        align: "image-left",
      },
      {
        type: "offset",
        images: [images["house-of-light-kitchen"], images["house-of-light-curve"]],
      },
    ],
    palette: [
      { name: "Pale oak", note: "Floors and joinery", swatch: "#c9a982" },
      { name: "Walnut", note: "Kitchen and cabinetry", swatch: "#5c4030" },
      { name: "Chalk plaster", note: "Walls and ceilings", swatch: "#eee9e1" },
      { name: "Wool bouclé", note: "Upholstery", swatch: "#e3ddd2" },
      { name: "Aged bronze", note: "Handles and lighting", swatch: "#8c6a43" },
    ],
    featured: true,
  },
  {
    slug: "terra-residence",
    title: "Terra Residence",
    category: "Residential",
    typology: "Primary suite and bathing rooms",
    setting: "A sunlit hillside — imagined setting",
    summary:
      "A concept for a residence's private wing, wrapped in vein-cut travertine and warm timber, where bathing becomes a slow daily ritual.",
    lede: "Terra Residence explores how a few honest materials — travertine, oak and clay — can turn the most functional rooms of a home into its calmest.",
    narrative: [
      "The bathing rooms are treated as architecture rather than fit-out. Travertine runs from floor to ceiling in long, unbroken planes, and a carved basin sits on a floating oak plinth so the floor appears to continue beneath it.",
      "Light is kept low and indirect: a concealed strip washes the shower bench, and one dark pendant anchors the vanity. A second, clay-tiled washroom introduces warmer colour while holding the same calm geometry.",
    ],
    scope: [
      "Bathroom and suite concept",
      "Stone and timber detailing",
      "Lighting design",
      "Fixture selection",
    ],
    hero: images["terra-hero"],
    heroFormat: "portrait",
    cover: { image: images["terra-basin"], orientation: "portrait" },
    story: [
      {
        type: "duo",
        images: [images["terra-basin"], images["terra-shower"]],
      },
      {
        type: "split",
        image: images["terra-clay"],
        heading: "A warmer counterpoint",
        body: "The guest washroom shifts the palette toward terracotta while keeping the same discipline — one stone basin, one round mirror, timber held low.",
        align: "image-left",
      },
    ],
    palette: [
      { name: "Vein-cut travertine", note: "Walls and floors", swatch: "#d8ccb8" },
      { name: "Smoked oak", note: "Vanity plinths", swatch: "#7a5a40" },
      { name: "Terracotta tile", note: "Guest washroom", swatch: "#b5654a" },
      { name: "Honed limestone", note: "Basins and benches", swatch: "#e4ddcf" },
      { name: "Blackened steel", note: "Taps and fittings", swatch: "#2e2d2a" },
    ],
    featured: true,
  },
  {
    slug: "the-courtyard",
    title: "The Courtyard",
    category: "Commercial",
    typology: "Reading room and studio",
    setting: "A dense city block — imagined setting",
    summary:
      "A concept for an independent publisher's reading room arranged around a planted courtyard, with brick, timber lattice and long, quiet seating.",
    lede: "The Courtyard turns a narrow urban plot inward. Every room looks onto a single tree, and timber lattice shelving works as library, screen and light filter at once.",
    narrative: [
      "The concept treats books as part of the architecture. Deep timber lattice walls hold collections on both faces, framing glimpses through to the courtyard while keeping the reading room calm and enclosed.",
      "Existing brick is retained and left unpainted. Its irregularity is balanced by smooth white plaster and a simple stair whose timber handrail is the only decorative gesture.",
    ],
    scope: [
      "Spatial planning",
      "Bespoke shelving concept",
      "Material direction",
      "Planting and threshold design",
    ],
    hero: images["courtyard-hero"],
    cover: { image: images["courtyard-hero"], orientation: "landscape" },
    story: [
      {
        type: "wide",
        image: images["courtyard-lattice"],
        caption: "Lattice shelving filters light between rooms.",
      },
      {
        type: "split",
        image: images["courtyard-reading"],
        heading: "A library you can see through",
        body: "Shelving is set deep enough to hold books on both sides, leaving openings that frame the courtyard. Reading becomes a quiet act shared across rooms.",
        align: "image-left",
      },
      {
        type: "split",
        image: images["courtyard-stair"],
        heading: "One considered gesture",
        body: "The stair is kept plain so its timber handrail can be felt rather than seen — a warm line under the hand, set against perforated brick and greenery.",
        align: "image-right",
      },
    ],
    palette: [
      { name: "Reclaimed brick", note: "Retained party walls", swatch: "#9a5b41" },
      { name: "Natural teak", note: "Lattice and handrails", swatch: "#8a5a35" },
      { name: "White plaster", note: "New walls", swatch: "#f1eee8" },
      { name: "Terrazzo", note: "Ground floor", swatch: "#cfc8bc" },
      { name: "Fern green", note: "Courtyard planting", swatch: "#5f6b4e" },
    ],
  },
  {
    slug: "the-quiet-table",
    title: "The Quiet Table",
    category: "Hospitality",
    typology: "Neighbourhood restaurant",
    setting: "A corner site on a quiet street — imagined setting",
    summary:
      "A restaurant concept built around the table itself: slatted timber, soft wall light and a pared-back palette that lets food and conversation lead.",
    lede: "The Quiet Table imagines a dining room without visual noise. A long hall of timber slats absorbs sound, while carefully placed light makes each table feel like a room of its own.",
    narrative: [
      "Acoustic comfort shaped the plan as much as appearance. Timber slats line the walls and ceiling with absorption concealed behind them, so the room stays calm even when it is full.",
      "By day, woven seats and street-facing windows keep the space informal. In the evening, light drops to the tables — warm, low and focused — with little else competing for attention.",
    ],
    scope: [
      "Front-of-house concept",
      "Acoustic and lighting intent",
      "Furniture specification",
      "Material palette",
    ],
    hero: images["quiet-table-hero"],
    cover: { image: images["quiet-table-hero"], orientation: "portrait" },
    story: [
      {
        type: "offset",
        images: [images["quiet-table-window"], images["quiet-table-corner"]],
      },
      {
        type: "split",
        image: images["quiet-table-detail"],
        heading: "Small things, considered",
        body: "A marble salt cellar, a wooden spoon, a folded paper menu. Tabletop objects are chosen with the same care as the room, because they are what guests hold.",
        align: "image-right",
      },
      {
        type: "wide",
        image: images["quiet-table-evening"],
        caption: "Evening light gathered at the table.",
      },
    ],
    palette: [
      { name: "Ash slats", note: "Walls and ceiling", swatch: "#d7c3a4" },
      { name: "Blush plaster", note: "Private dining", swatch: "#e7cdbf" },
      { name: "Polished concrete", note: "Floors", swatch: "#b9b3aa" },
      { name: "Paper cord", note: "Woven seats", swatch: "#c8b48e" },
      { name: "Smoked glass", note: "Glassware and lamps", swatch: "#4a4640" },
    ],
  },
  {
    slug: "form-and-function",
    title: "Form & Function",
    category: "Commercial",
    typology: "Concept store and coffee counter",
    setting: "A former warehouse unit — imagined setting",
    summary:
      "A retail concept in which a monolithic concrete counter, pale oak and translucent partitions form a calm stage for objects and coffee.",
    lede: "Form & Function explores a store that behaves more like a gallery. A single cast counter anchors the plan, and everything else is designed to recede.",
    narrative: [
      "The concept separates display, service and lingering into three quiet zones. A cast concrete counter forms the coffee bar at the threshold, a curved arch leads into the collection, and a long timber lounge invites visitors to stay.",
      "Translucent glass partitions borrow light without revealing clutter, and a gently curving corridor leads to the workrooms behind.",
    ],
    scope: [
      "Retail planning",
      "Counter and display design",
      "Material direction",
      "Wayfinding intent",
    ],
    hero: images["form-hero"],
    cover: { image: images["form-hero"], orientation: "landscape" },
    story: [
      {
        type: "offset",
        images: [images["form-lounge"], images["form-arch"]],
      },
      {
        type: "split",
        image: images["form-corridor"],
        heading: "Leading the eye",
        body: "A softly curving corridor, lit from the floor, draws visitors onward without signage. Back-of-house rooms open from it so the shop floor stays uncluttered.",
        align: "image-left",
      },
    ],
    palette: [
      { name: "Cast concrete", note: "Counter and plinths", swatch: "#bdb8af" },
      { name: "White oak", note: "Lounge and display", swatch: "#d9c4a3" },
      { name: "Reeded glass", note: "Partitions", swatch: "#dce0dc" },
      { name: "Brushed aluminium", note: "Frames and rails", swatch: "#a9a9a4" },
      { name: "Ink", note: "Graphics and details", swatch: "#262722" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const featuredProjects = projects.filter((project) => project.featured);

/** Every image used by a project, for credits. */
export function projectImages(project: Project) {
  const seen = new Map<string, Project["hero"]>();
  const add = (image: Project["hero"]) => seen.set(image.src, image);
  add(project.hero);
  add(project.cover.image);
  for (const block of project.story) {
    if (block.type === "wide" || block.type === "split") add(block.image);
    else block.images.forEach(add);
  }
  return [...seen.values()];
}
