import { lazy, type Component } from "solid-js";

export type ProjectFrontmatter = {
  title: string;
  description: string;
  focus: string;
  contribution: string;
  outcome: string;
  evidence: string;
  reviewed: string;
  sections: Array<{ label: string; id: string }>;
  /** Shown as the project year; orders projects without an explicit position. */
  date: string;
  /** Display a confirmed work period instead of the sorting date's year. */
  period?: string;
  order?: number;
  /** Optional human role line shown on the article header. */
  role?: string;
  /** Optional small status pill ("live" / "wip" / "ongoing" / etc). */
  status?: string;
  /** External URL (live site, repo). Surfaced as a "visit ↗" link in the article. */
  url?: string;
  draft?: boolean;
};

/**
 * Public shape consumed by `ProjectList` and the slug route. Kept named
 * `Project` to avoid touching every consumer.
 */
export type Project = ProjectFrontmatter & {
  slug: string;
  /** Where the row navigates to. Article slug if present, else `url`, else `#`. */
  href: string;
  year: number;
};

export type ProjectModule = {
  default: Component;
  frontmatter: ProjectFrontmatter;
};

const metadata = import.meta.glob<ProjectFrontmatter>("./projects/*.mdx", {
  eager: true,
  query: "?metadata",
  import: "default",
});

const modules = import.meta.glob<ProjectModule>("./projects/*.mdx");

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.mdx$/, "");
}

export const projects: Project[] = Object.entries(metadata)
  .map(([path, fm]) => {
    const slug = slugFromPath(path);
    const date = new Date(fm.date);
    return {
      ...fm,
      slug,
      href: `/projects/${slug}`,
      year: date.getUTCFullYear(),
    } satisfies Project;
  })
  .filter((p) => !p.draft)
  .sort((a, b) =>
    (a.order ?? Infinity) - (b.order ?? Infinity) || b.date.localeCompare(a.date),
  );

export function getProject(
  slug: string,
): { Component: Component; meta: Project } | undefined {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug,
  );
  if (!entry) return undefined;
  const [, mod] = entry;
  const meta = projects.find((p) => p.slug === slug);
  if (!meta) return undefined;
  return { Component: lazy(mod), meta };
}
