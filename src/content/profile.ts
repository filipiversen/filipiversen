export const profile = {
  name: "Filip Iversen",
  role: "Senior Product Designer",
  intro:
    "I design software that helps people work through complicated processes without losing context. I work from the workflow through the interface and into frontend implementation, across lending, survey software, and shared design systems.",
  reviewed: "2026-10-29",
  currentFocus: "I’m focused on running my design and engineering agency",
  opportunities: "I’m always open to conversations about interesting projects and new opportunities.",
  location: "St. Louis area",
  background: "I run my independent practice through Northway and co-founded Survey Loop. My US practice began in 2020, following independent work in Norway from 2014.",
  career: [
    { period: "Oct 2024–Oct 2026", role: "Senior Product Designer", organization: "Lenders Cooperative / Allocore", detail: "Commercial product design within a six-person design team; preceded by a Northway contract.", href: "/projects/lenders-cooperative" },
    { period: "Aug 2023–present", role: "Co-founder", organization: "Survey Loop", detail: "Product design and frontend engineering, alongside a backend partner.", href: "/projects/survey-loop" },
    { period: "2020–present", role: "Independent practice", organization: "Northway", detail: "US practice, following independent work in Norway from 2014.", href: "https://northway.agency" },
  ],
  principles: [
    {
      title: "Keep the work in context",
      description: "Keep the information people need beside the task they’re doing, with room to move when the work isn’t linear.",
      examples: [
        { label: "Lending workspace", href: "/projects/lenders-cooperative#a-sequence-that-leaves-room-to-move" },
        { label: "Survey Loop editor", href: "/projects/survey-loop#from-a-form-to-a-canvas" },
      ],
    },
    {
      title: "Design the uncertain states",
      description: "Make it clear what has saved, what failed, and what needs a person’s approval. Give people a way to recover.",
      examples: [
        { label: "Save states", href: "/projects/survey-loop#saving-is-part-of-the-interaction" },
        { label: "Policy recovery", href: "/projects/insurance-policy-platform#recovering-an-accepted-policy-submission" },
        { label: "Estimate approval", href: "/projects/eret#reviewing-an-assistants-changes" },
      ],
    },
    {
      title: "Carry decisions into implementation",
      description: "Work through the details in tokens, components, and frontend behavior, alongside the people building the product.",
      examples: [
        { label: "Peak, from Figma to code", href: "/projects/lenders-cooperative#peak-from-figma-to-the-product" },
        { label: "Survey Loop’s component library", href: "/writing/build-table-components-like-lego" },
      ],
    },
  ],
  companies: [
    {
      name: "Survey Loop",
      href: "https://surveyloop.com",
    },
  ],
  agency: {
    name: "Northway",
    href: "https://northway.agency",
    description: "design, engineering, and AI integration services",
  },
  email: "filip@filipiversen.com",
  resume: "/Filip_Iversen_Product_Designer_Resume.pdf",
  links: [
    { label: "Email", href: "mailto:filip@filipiversen.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/filip-iversen-96319897/" },
    { label: "GitHub", href: "https://github.com/filipiversen" },
    { label: "X", href: "https://x.com/filipiversen" },
  ],
} as const;
