type CareerEntry = {
  period: string;
  role: string;
  organization: string;
  detail?: string;
  href?: string;
};

const career: readonly CareerEntry[] = [
  { period: "Oct 2024–Oct 2026", role: "Senior Product Designer", organization: "Lenders Cooperative / Allocore", detail: "Commercial product design within a six-person design team; preceded by a Northway contract.", href: "/projects/lenders-cooperative" },
  { period: "Aug 2023–present", role: "Co-founder", organization: "Survey Loop", detail: "Product design and frontend engineering, alongside a backend partner.", href: "/projects/survey-loop" },
  { period: "Apr 2022–Aug 2023", role: "Product Designer", organization: "Denim Social", detail: "Product design, a new design system, and frontend development for social media software used by financial institutions." },
  { period: "2020–present", role: "Founder", organization: "Northway", detail: "Design & Engineering Agency. Product design, development, and AI integration for clients.", href: "https://northway.agency" },
  { period: "2016–2021", role: "Chair, Graphic Design Certification Committee", organization: "Oslo kommune" },
  { period: "2014–2020", role: "Founder", organization: "Filip Iversen, Norway", detail: "Websites and web applications for clients; the business that preceded Northway." },
  { period: "2014", role: "Web Designer", organization: "Lemon" },
  { period: "2012–2014", role: "Graphic Designer", organization: "Amedia Ressurs" },
];

export const profile = {
  name: "Filip Iversen",
  role: "Senior Product Designer",
  intro:
    "I design and build software that makes complex work easier. AI is central to my process, from exploring ideas to writing and testing production code. I also design AI products, with a focus on how people work with agents, review their output, and stay in control.",
  reviewed: "2026-10-29",
  currentFocus: "I’m building",
  opportunities: "I’m always open to interesting projects, collaborations, and new opportunities.",
  location: "St. Louis area",
  background: "I’ve worked in design since 2012, starting in graphic and web design in Norway and growing into product design and frontend engineering. Since then, I’ve built products for clients, co-founded Survey Loop, and designed software for financial institutions.",
  career,
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
    description: "a design and engineering agency helping founders and business owners launch products, build AI tools, and automate everyday work",
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
