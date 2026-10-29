import { readdir, readFile, writeFile } from "node:fs/promises";
import matter from "gray-matter";

const origin = "https://www.filipiversen.com";
const paths = ["/", "/writing"];
for (const section of ["projects", "writing"]) {
  const directory = new URL(`../src/content/${section}/`, import.meta.url);
  for (const file of (await readdir(directory)).sort()) {
    if (!file.endsWith(".mdx")) continue;
    const { data } = matter(await readFile(new URL(file, directory), "utf8"));
    if (!data.draft) paths.push(`/${section}/${file.replace(/\.mdx$/, "")}`);
  }
}
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
await writeFile(new URL("../public/sitemap.xml", import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escape(origin + path)}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Generated sitemap with ${paths.length} public routes.`);
