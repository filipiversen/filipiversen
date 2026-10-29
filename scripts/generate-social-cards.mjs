import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import matter from "gray-matter";

const directory = new URL("../src/content/projects/", import.meta.url);
const output = new URL("../public/og/", import.meta.url);
const cards = [{ slug: "portfolio", title: "Filip Iversen", description: "Senior Product Designer. Complex workflows, shared design systems, and hands-on frontend engineering.", label: "Product design & engineering" }];
for (const file of (await readdir(directory)).sort()) {
  if (!file.endsWith(".mdx")) continue;
  const { data } = matter(await readFile(new URL(file, directory), "utf8"));
  if (!data.draft) cards.push({ slug: file.replace(/\.mdx$/, ""), title: data.title, description: data.description, label: "Selected work · Filip Iversen" });
}
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
await mkdir(output, { recursive: true });
for (const card of cards) {
  const lines = [""];
  for (const word of card.description.split(" ")) {
    const i = lines.length - 1;
    if (lines[i].length + word.length > 61) lines.push(word);
    else lines[i] += `${lines[i] ? " " : ""}${word}`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#faf9f6"/>
<g font-family="Arial, Helvetica, sans-serif">
<text x="64" y="92" font-size="30" fill="#1d1d22">fi.</text>
<text x="64" y="208" font-size="20" letter-spacing="2" fill="#5a5962">${escape(card.label.toUpperCase())}</text>
<text x="60" y="304" font-size="68" font-weight="600" letter-spacing="-2" fill="#1d1d22">${escape(card.title)}</text>
${lines.map((line,i) => `<text x="64" y="${374+i*42}" font-size="30" fill="#57565f">${escape(line)}</text>`).join("\n")}
<path d="M64 538H1136" stroke="#d8d6d3"/>
<text x="64" y="584" font-size="22" fill="#57565f">filipiversen.com</text>
<text x="1136" y="584" font-size="22" text-anchor="end" fill="#57565f">${card.slug === "portfolio" ? "Senior Product Designer" : "Case study"}</text>
</g></svg>`;
  await writeFile(new URL(`${card.slug}.svg`, output), svg);
}
console.log(`Generated ${cards.length} SVG cards. Render each at 1200×630 as the matching PNG before publication.`);
