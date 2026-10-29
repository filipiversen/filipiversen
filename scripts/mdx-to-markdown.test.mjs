import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, mkdir, cp, writeFile, readFile, access, symlink, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { mdxToMarkdown } from "./mdx-to-markdown.mjs";

const canonical = "https://www.filipiversen.com/projects/example";

test("retains nested workflow structure, captions, alt text, and canonical links", () => {
  const markdown = mdxToMarkdown('<Figure><section><h3>Before</h3><ol><li>Add fields.</li><li>No drag-and-drop.</li></ol></section><img src="/work/example.png" alt="Illustrative interface" /><figcaption>Fictional data, not production evidence.</figcaption><p><a href="#evidence">Inspect the response</a></p></Figure>', canonical);
  assert.match(markdown, /### Before/);
  assert.match(markdown, /1\. Add fields\./);
  assert.match(markdown, /2\. No drag-and-drop\./);
  assert.match(markdown, /!\[Illustrative interface\]\(https:\/\/www\.filipiversen\.com\/work\/example.png\)/);
  assert.match(markdown, /Fictional data, not production evidence/);
  assert.ok(markdown.includes(`${canonical}#evidence`));
  assert.doesNotMatch(markdown, /<Figure|<section|<figcaption/);
});

test("preserves video, captions, transcript, and code literals", () => {
  const markdown = mdxToMarkdown('<video><source src="/demo.mp4" /><track src="/demo.vtt" label="English captions" /></video>\n\n<details><summary>Transcript</summary><p>The assistant steps are simulated.</p></details>\n\n```tsx\n<Example value={1} />\n```', canonical);
  for (const value of ["https://www.filipiversen.com/demo.mp4", "https://www.filipiversen.com/demo.vtt", "The assistant steps are simulated.", "<Example value={1} />"]) assert.ok(markdown.includes(value));
});

test("fails rather than silently dropping new components or dynamic content", () => {
  assert.throws(() => mdxToMarkdown("<UnknownDemo />", canonical), /representation/);
  assert.throws(() => mdxToMarkdown("{privateData}", canonical), /Unsupported MDX/);
  assert.throws(() => mdxToMarkdown('<img src={privateUrl} />', canonical), /literal src/);
});

test("generation excludes drafts and private files and removes only stale generated exports", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "portfolio-export-"));
  const repo = fileURLToPath(new URL("../", import.meta.url));
  try {
    for (const directory of ["scripts", "src/content/projects", "src/content/writing", "public/writing", "public/projects", "docs"]) await mkdir(join(fixture, directory), { recursive: true });
    await symlink(join(repo, "node_modules"), join(fixture, "node_modules"));
    await writeFile(join(fixture, "package.json"), '{"type":"module"}');
    for (const file of ["scripts/generate-public-content.mjs", "scripts/mdx-to-markdown.mjs", "src/content/profile.ts"]) await cp(join(repo, file), join(fixture, file));
    const source = (draft) => `---\ntitle: Public article\ndate: 2026-01-02\ndraft: ${draft}\n---\nVisible public prose.\n`;
    await writeFile(join(fixture, "src/content/writing/public.mdx"), source(false));
    await writeFile(join(fixture, "src/content/writing/draft.mdx"), source(true) + "DRAFT_CANARY");
    await writeFile(join(fixture, "docs/private.mdx"), "PRIVATE_CANARY");
    await writeFile(join(fixture, "public/writing/handwritten.md"), "Handwritten asset");
    const generate = () => execFileSync(process.execPath, [join(fixture, "scripts/generate-public-content.mjs")], { cwd: fixture });
    generate();
    const markdown = await readFile(join(fixture, "public/writing/public.md"), "utf8");
    assert.ok(markdown.includes("Visible public prose."));
    assert.ok(markdown.includes("Published: 2026-01-02"));
    await assert.rejects(access(join(fixture, "public/writing/draft.md")));
    assert.doesNotMatch(await readFile(join(fixture, "public/llms.txt"), "utf8"), /DRAFT_CANARY|PRIVATE_CANARY|draft\.md/);
    await writeFile(join(fixture, "src/content/writing/public.mdx"), source(true));
    generate();
    await assert.rejects(access(join(fixture, "public/writing/public.md")));
    assert.equal(await readFile(join(fixture, "public/writing/handwritten.md"), "utf8"), "Handwritten asset");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
