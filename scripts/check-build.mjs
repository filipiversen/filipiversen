import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";

const output = new URL("../.vercel/output/static/", import.meta.url);
const deployment = JSON.parse(await readFile(new URL("../config.json", output), "utf8"));
const markdownHeader = deployment.routes.find((route) => route.headers?.["Content-Type"] === "text/plain; charset=utf-8");
assert.ok(markdownHeader?.continue, "Markdown must display inline before Vercel's static-file handler");
assert.ok(deployment.routes.indexOf(markdownHeader) < deployment.routes.findIndex((route) => route.handle === "filesystem"));
for (const path of ["/profile.md", "/projects/survey-loop.md", "/writing/why-i-picked-solid.md"]) assert.ok(new RegExp(markdownHeader.src).test(path));
for (const path of ["/profile", "/profile/"]) {
  const redirect = deployment.routes.find((route) => route.src && new RegExp(`^(?:${route.src})$`).test(path) && route.status === 308);
  assert.equal(redirect?.headers?.Location, "/", `${path}: must permanently redirect to the homepage`);
  assert.ok(deployment.routes.indexOf(redirect) < deployment.routes.findIndex((route) => route.handle === "filesystem"));
}
const paths = ["/", "/writing"];
const cases = [];
for (const section of ["projects", "writing"]) {
  const directory = new URL(`../src/content/${section}/`, import.meta.url);
  for (const file of await readdir(directory)) {
    if (!file.endsWith(".mdx")) continue;
    const { data } = matter(await readFile(new URL(file, directory), "utf8"));
    if (data.draft) continue;
    const path = `/${section}/${file.replace(/\.mdx$/, "")}`;
    paths.push(path);
    if (section === "projects") cases.push({ path, sections: data.sections, data });
  }
}
const sitemap = await readFile(new URL("sitemap.xml", output), "utf8");
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
assert.deepEqual(listed.sort(), paths.sort(), "Sitemap must contain every published route and no private/draft content");
const pages = new Map();
for (const path of paths) {
  const html = await readFile(new URL(path === "/" ? "index.html" : `${path.slice(1)}/index.html`, output), "utf8");
  pages.set(path, html);
  assert.match(html, /<h1[\s>]/, `${path}: missing prerendered content`);
  assert.ok(html.includes(`rel="canonical" href="https://www.filipiversen.com${path}"`), `${path}: incorrect canonical`);
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'), `${path}: missing sharing metadata`);
  const image = html.match(/property="og:image" content="https:\/\/www.filipiversen.com([^\"]+)"/)?.[1];
  assert.ok(image, `${path}: missing social image`);
  const png = await readFile(new URL(image.slice(1), output));
  assert.equal(png.subarray(1, 4).toString(), "PNG", `${path}: social image must be PNG`);
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(!/\b(?:href|src)="\/?docs\//.test(html), `${path}: private archive reference`);
  assert.ok(html.includes('rel="describedby" href="/llms.txt"'), `${path}: missing public content index`);
  if (path === "/" || path.startsWith("/projects/") || path.startsWith("/writing/")) {
    const markdownPath = path === "/" ? "/profile.md" : `${path}.md`;
    assert.ok(html.includes(`rel="alternate" type="text/markdown" href="${markdownPath}"`), `${path}: missing Markdown discovery link`);
    const markdown = await readFile(new URL(markdownPath.slice(1), output), "utf8");
    assert.ok(markdown.includes(`https://www.filipiversen.com${path}`), `${path}: missing Markdown canonical`);
    assert.doesNotMatch(markdown, /(?:\/Users\/|file:\/\/|\]\((?:https:\/\/www\.filipiversen\.com)?\/docs\/)/, `${path}: private content reference`);
    const project = cases.find((item) => item.path === path);
    if (project) {
      for (const field of ["contribution", "outcome", "evidence", "reviewed"]) {
        assert.ok(markdown.includes(project.data[field]), `${path}: Markdown lost ${field}`);
      }
    }
  }
  for (const section of cases.find((item) => item.path === path)?.sections ?? []) {
    assert.ok(html.includes(`id="${section.id}"`), `${path}: broken section link ${section.id}`);
  }
}
const homepage = pages.get("/");
for (const id of ["current", "career", "about", "projects", "contributions", "how-i-work", "approach", "writing", "contact"]) {
  assert.ok(homepage.includes(`id="${id}"`), `Homepage lost section or legacy anchor #${id}`);
}
for (const { data } of cases) {
  for (const field of ["contribution", "outcome"]) {
    assert.equal(homepage.split(data[field]).length - 1, 1, `Homepage must contain ${data.title}'s ${field} exactly once`);
  }
}
assert.ok(homepage.includes('href="/Filip_Iversen_Product_Designer_Resume.pdf"'), "Homepage lost the public resume");
assert.ok(homepage.includes('src="/work/survey-loop/walkthrough-poster.png"'), "Homepage lost the product preview");
assert.ok(!homepage.includes('href="/profile"'), "Homepage should not link to the retired profile page");
const profileMarkdown = await readFile(new URL("profile.md", output), "utf8");
assert.ok(profileMarkdown.includes("[Canonical page](https://www.filipiversen.com/)"));
assert.ok(profileMarkdown.includes("## Selected writing"));
for (const [path, html] of pages) {
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const target = new URL(href, `https://www.filipiversen.com${path}`);
    if (target.origin !== "https://www.filipiversen.com") continue;
    const targetPath = target.pathname.replace(/\/$/, "") || "/";
    if (pages.has(targetPath)) {
      if (target.hash) assert.ok(pages.get(targetPath).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${path}: broken cross-page anchor ${href}`);
    } else {
      await access(new URL(target.pathname.slice(1), output)).catch(() => assert.fail(`${path}: missing linked public asset ${href}`));
    }
  }
}
const surveyMarkdown = await readFile(new URL("projects/survey-loop.md", output), "utf8");
for (const evidence of ["Assistant and MCP steps are simulated", "Fictional responses and illustrative wording", "No response is submitted to a live service", "walkthrough.vtt"]) assert.ok(surveyMarkdown.includes(evidence), `Markdown lost the evidence qualification: ${evidence}`);
const agentIndex = await readFile(new URL("llms.txt", output), "utf8");
assert.ok(agentIndex.startsWith("# Filip Iversen\n"));
assert.ok(agentIndex.includes("https://www.filipiversen.com/profile.md"));
for (const path of paths.filter((path) => path !== "/" && path !== "/writing")) assert.ok(agentIndex.includes(`${path}.md`), `${path}: missing from public content index`);
await assert.rejects(access(new URL("docs", output)), "Private docs must not enter the public build");
const manifest = JSON.parse(await readFile(new URL(".vite/manifest.json", output), "utf8"));
const home = Object.keys(manifest).find((key) => key.startsWith("src/routes/index.tsx?"));
assert.ok(home, "Homepage entry missing from build manifest");
const imports = new Set();
function visit(key) {
  if (imports.has(key)) return;
  imports.add(key);
  for (const dependency of manifest[key]?.imports ?? []) visit(dependency);
}
visit(home);
assert.ok(![...imports].some((key) => key.endsWith(".mdx")), "Homepage must not eagerly import article bodies");
console.log(`Verified ${paths.length} prerendered routes, sitemap, metadata, sharing cards, case anchors, public Markdown, evidence qualifications, private-file exclusion, and lazy article bodies.`);
