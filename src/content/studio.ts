import { images } from "./images";
import type { FaqItem, Principle, ProcessStep, Service } from "./types";

export const services: Service[] = [
  {
    slug: "residential-interiors",
    number: "01",
    title: "Residential Interiors",
    headline: "Homes composed around the way you live.",
    summary:
      "Whole-home and single-room interiors shaped by daily routine, natural light and materials that improve with age.",
    description: [
      "A home is the most personal brief there is. The work begins with how a household actually moves through the day — where mornings start, where things are put down, which rooms are used in winter — and builds an interior that supports those rhythms quietly.",
      "Materials, lighting and furniture are considered together so that each room feels complete without feeling finished; there is always space left for the life that follows.",
    ],
    includes: [
      "Whole-home and room-by-room design",
      "Joinery and built-in storage concepts",
      "Lighting design and atmosphere",
      "Art and object placement",
    ],
    image: images["service-residential"],
  },
  {
    slug: "spatial-planning",
    number: "02",
    title: "Spatial Planning",
    headline: "Plans that make room for life.",
    summary:
      "Layouts, circulation and zoning studies that resolve how a space works before a single finish is chosen.",
    description: [
      "Good interiors are decided on plan. Spatial studies test where walls, openings and furniture should sit, how people move between rooms, and where light and quiet are best used.",
      "Options are drawn and compared side by side, so decisions are made with clarity rather than guesswork.",
    ],
    includes: [
      "Layout and circulation studies",
      "Furniture and zoning plans",
      "Light, view and acoustic analysis",
      "Storage strategy",
    ],
    image: images["service-spatial"],
  },
  {
    slug: "furniture-material-curation",
    number: "03",
    title: "Furniture & Material Curation",
    headline: "Fewer, better things.",
    summary:
      "Material palettes, sample boards and furniture selections — new, bespoke and vintage — chosen to belong together.",
    description: [
      "Curation is as much about editing as choosing. Palettes are built from a small number of materials — timber, stone, plaster, linen, metal — that relate to one another and to the architecture.",
      "Furniture is selected or designed for proportion, comfort and longevity, mixing bespoke pieces with considered vintage finds where they suit the room.",
    ],
    includes: [
      "Material palettes and sample boards",
      "Bespoke and vintage furniture sourcing",
      "Textiles, rugs and window treatments",
      "Finishes schedules",
    ],
    image: images["service-material"],
  },
  {
    slug: "renovation-concepts",
    number: "04",
    title: "Renovation Concepts",
    headline: "Seeing what a space could become.",
    summary:
      "Early-stage concepts for existing buildings that protect their character while making them work for today.",
    description: [
      "Older buildings carry qualities that are hard to recreate: thick walls, worn surfaces, proportions from another era. Renovation concepts identify what should be kept and how new interventions can sit beside it with respect.",
      "Concept packages are prepared to support conversations with architects, planners and contractors, communicating design intent clearly from the start.",
    ],
    includes: [
      "Feasibility and concept options",
      "Character and retention studies",
      "Design intent drawings and visual references",
      "Coordination notes for project teams",
    ],
    image: images["service-renovation"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    summary:
      "Listening first — to how a space is used, to the building, and to the light. Conversation and a site visit shape a clear brief.",
    focus: ["Conversation and site visit", "Measured information", "A written brief"],
  },
  {
    number: "02",
    title: "Define",
    summary:
      "The brief becomes a spatial strategy: plans, priorities and a material direction agreed before detail begins.",
    focus: ["Layout options", "Material direction", "Priorities and scope"],
  },
  {
    number: "03",
    title: "Design",
    summary:
      "Concept drawings, palettes and furniture proposals develop the idea into a complete and coherent interior.",
    focus: ["Concept drawings", "Palettes and samples", "Furniture and lighting"],
  },
  {
    number: "04",
    title: "Refine",
    summary:
      "Proportions, finishes and light levels are tested and adjusted until the scheme feels inevitable rather than designed.",
    focus: ["Detail development", "Final selections", "Design intent package"],
  },
];

export const principles: Principle[] = [
  {
    title: "Light first",
    body: "Every plan begins with where the light falls, and when.",
  },
  {
    title: "Honest materials",
    body: "Timber, stone, plaster and linen — chosen to be touched and to age well.",
  },
  {
    title: "Proportion before decoration",
    body: "Well-judged dimensions make a room calm before a single object is placed.",
  },
  {
    title: "Made to be lived in",
    body: "Rooms should welcome real life: books, guests, children and change.",
  },
];

export const tenets: Principle[] = [
  {
    title: "Quiet over loud",
    body: "The concept favours rooms that reveal themselves slowly. Calm is not a style but a condition — the result of fewer decisions made with more care.",
  },
  {
    title: "Material over ornament",
    body: "Texture, weight and grain carry the character of a space. When materials are honest, very little needs to be added.",
  },
  {
    title: "Time over trend",
    body: "Interiors should look better in ten years than on the day they are photographed. Patina, repair and adaptation are planned for, not avoided.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "How does a project usually begin?",
    answer:
      "With a conversation about the space, how it is used and what isn't working. A site visit and a written brief then set out priorities, scope and the questions still to answer before any design work starts.",
  },
  {
    question: "Can existing furniture and pieces be included?",
    answer:
      "Yes. Existing pieces often give an interior its character. Part of the curation process is deciding together what stays, what is reworked and where something new is genuinely needed.",
  },
  {
    question: "Do you work alongside architects and contractors?",
    answer:
      "Interior concepts are designed to be shared. Drawings and material schedules are prepared so that architects, joiners and contractors can price and build from them, with design intent explained clearly throughout.",
  },
  {
    question: "Are single-room projects considered?",
    answer:
      "A single room can be as rewarding as a whole home. The same process applies at any scale — understanding how the room is used, then resolving plan, light, material and furniture together.",
  },
  {
    question: "How are fees structured?",
    answer:
      "Every brief differs, so a working studio would set out fees in a written proposal once the scope is understood. This demonstration site does not publish pricing, timelines or guarantees, and nothing here is an offer of services.",
  },
  {
    question: "Is ATELIER FORMA a real studio?",
    answer:
      "No. ATELIER FORMA is an independent design concept created for portfolio demonstration. The projects are concept studies illustrated with licensed photography by the credited photographers, and no work shown was designed or delivered by a real studio.",
  },
];
