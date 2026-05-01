export type Project = {
  title: string;
  description: string;
  href: string;
  year: number;
  preview?: string;
};

export const projects: Project[] = [
  {
    title: "filipiversen.com",
    description: "this site \u2014 solidstart in islands mode",
    href: "https://github.com/filipiversen/filipiversen",
    year: 2026,
  },
  {
    title: "Signal Sandbox",
    description: "a tiny playground for solid\u2019s reactivity primitives",
    href: "/writing/why-i-picked-solid",
    year: 2026,
  },
  {
    title: "Rule of Three",
    description: "a small notes app exploring local-first sync",
    href: "#",
    year: 2025,
  },
];
