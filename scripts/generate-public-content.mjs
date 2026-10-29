import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import matter from "gray-matter";
import { profile } from "../src/content/profile.ts";
import { mdxToMarkdown } from "./mdx-to-markdown.mjs";

const origin = "https://www.filipiversen.com";
const publicRoot = new URL("../public/", import.meta.url);
const marker = "<!-- Generated from public portfolio content. -->\n\n";
const absolute = (path) => new URL(path, origin).href;
const link = (label, path) => `[${label}](${absolute(path)})`;
const projects = [];
const writing = [];
const generated = new Set();

async function save(path, content) {
  generated.add(path);
  const file = new URL(path, publicRoot);
  await mkdir(new URL(".", file), { recursive: true });
  const next = marker + content.trim() + "\n";
  // Avoid triggering a dev reload when public content hasn't changed.
  if (await readFile(file, "utf8").catch((error) => { if (error.code !== "ENOENT") throw error; }) !== next) await writeFile(file, next);
}

// Only these public source directories are eligible; never traverse the career archive.
for (const section of ["projects", "writing"]) {
  const directory = new URL(`../src/content/${section}/`, import.meta.url);
  for (const file of (await readdir(directory)).sort()) {
    if (!file.endsWith(".mdx")) continue;
    const { data, content } = matter(await readFile(new URL(file, directory), "utf8"));
    if (data.draft) continue;
    const path = `/${section}/${file.slice(0, -4)}`;
    const header = [`# ${data.title}`, `By ${profile.name}`, link("Canonical page", path), data.description];
    if (section === "projects") {
      projects.push({ ...data, path });
      header.push(`Work period: ${data.period ?? new Date(data.date).getUTCFullYear()} · ${data.role} · ${data.status}`, `Last reviewed: ${data.reviewed}`,
        `**Focus:** ${data.focus}`, `**My contribution:** ${data.contribution}`, `**What shipped:** ${data.outcome}`, `**Evidence:** ${data.evidence}`);
    } else {
      writing.push({ ...data, path });
      header.push(`Published: ${new Date(data.date).toISOString().slice(0, 10)}`);
    }
    await save(`${path.slice(1)}.md`, `${header.filter(Boolean).join("\n\n")}\n\n${mdxToMarkdown(content, absolute(path))}`);
  }
}
projects.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || new Date(b.date) - new Date(a.date));
writing.sort((a, b) => new Date(b.date) - new Date(a.date));

const profileMarkdown = [
  `# ${profile.name}`, profile.role, profile.intro,
  `Last reviewed: ${profile.reviewed}`, link("Canonical page", "/"),
  link("View resume (PDF)", profile.resume),
  "## Current focus", `${profile.currentFocus} ${link(profile.agency.name, profile.agency.href)}, ${profile.agency.description}.`, profile.opportunities,
  "## Career", profile.background,
  ...profile.career.map((entry) => `- **${entry.period} — ${entry.role} · ${entry.href ? link(entry.organization, entry.href) : entry.organization}.**${entry.detail ? ` ${entry.detail}` : ""}`),
  "## Selected work",
  ...projects.flatMap((project) => [`### ${link(project.title, project.path)}`, project.focus, project.contribution, `**Released:** ${project.outcome}`]),
  link("Peak: shared tokens, Figma, and component code", "/projects/lenders-cooperative#peak-from-figma-to-the-product"),
  "## How I work",
  ...profile.principles.flatMap((principle) => [`### ${principle.title}`, principle.description, principle.examples.map((example) => `- ${link(example.label, example.href)}`).join("\n")]),
  "## Selected writing",
  ...writing.filter((post) => post.featured !== undefined).sort((a, b) => a.featured - b.featured).map((post) => `- ${link(post.title, post.path)}: ${post.description}`),
  link("All writing", "/writing"),
  "## Contact", profile.location, ...profile.links.map((item) => `- ${link(item.label === "Email" ? profile.email : item.label, item.href)}`),
].join("\n\n");
await save("profile.md", profileMarkdown);

const index = [
  `# ${profile.name}`, `> ${profile.role}. ${profile.intro}`,
  `Self-authored professional profile and portfolio. Profile last reviewed: ${profile.reviewed}.`,
  "Case studies distinguish personal contributions, collaborators, released work, and reported outcomes. Captions identify production interfaces, sample data, and illustrative reconstructions. Current work and openness to opportunities are described in the profile.",
  "## Profile", `- ${link("Homepage and professional profile", "/profile.md")}: Career, current focus, selected work, working approach, writing, resume, and contact.`,
  "## Selected work", ...projects.map((project) => `- ${link(project.title, `${project.path}.md`)}: ${project.focus}`),
  `- ${link("Peak design system", "/projects/lenders-cooperative#peak-from-figma-to-the-product")}: Shared tokens, Figma, and component implementation; part of the lending case.`,
  "## Selected writing", ...writing.filter((post) => post.featured !== undefined).sort((a, b) => a.featured - b.featured).map((post) => `- ${link(post.title, `${post.path}.md`)}: ${post.description}`),
  "## Optional", ...writing.filter((post) => post.featured === undefined).map((post) => `- ${link(post.title, `${post.path}.md`)}: ${post.description ?? "Notes on design and engineering."}`),
].join("\n\n");
// llms.txt begins with its H1, as specified by the proposal.
const indexFile = new URL("llms.txt", publicRoot);
if (await readFile(indexFile, "utf8").catch((error) => { if (error.code !== "ENOENT") throw error; }) !== index + "\n") await writeFile(indexFile, index + "\n");

// Remove only exports we generated if a source is deleted or becomes a draft.
for (const section of ["projects", "writing"]) {
  const directory = new URL(`${section}/`, publicRoot);
  for (const file of await readdir(directory)) {
    const path = `${section}/${file}`;
    if (file.endsWith(".md") && !generated.has(path) && (await readFile(new URL(path, publicRoot), "utf8")).startsWith(marker)) await unlink(new URL(path, publicRoot));
  }
}
console.log(`Generated profile, ${projects.length} case studies, ${writing.length} articles, and llms.txt from public content.`);
