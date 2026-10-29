import { defineConfig } from "vite";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import tailwindcss from "@tailwindcss/vite";
import { rehypeUnwrapImages } from "./src/lib/rehype-unwrap-images.js";

export default defineConfig({
  clearScreen: false,
  server: { watch: { ignored: ["**/.vercel/**", "**/docs/**"] } },
  optimizeDeps: { include: ["source-map-js", "error-stack-parser"] },
  plugins: [
    {
      name: "public-markdown",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const path = req.url?.split("?")[0] ?? "";
          if (!/^\/(?:profile|(?:projects|writing)\/[a-z0-9-]+)\.md$/.test(path)) return next();
          try {
            const body = await readFile(new URL(`./public${path}`, import.meta.url));
            // Browsers download text/markdown; plain text makes “View” work.
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(body);
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") next();
            else next(error);
          }
        });
      },
      buildStart() {
        execFileSync(process.execPath, [fileURLToPath(new URL("./scripts/generate-public-content.mjs", import.meta.url))], { stdio: "inherit" });
      },
      handleHotUpdate({ file }) {
        if (file.includes("/src/content/")) {
          execFileSync(process.execPath, [fileURLToPath(new URL("./scripts/generate-public-content.mjs", import.meta.url))], { stdio: "inherit" });
        }
      },
    },
    {
      name: "mdx-metadata",
      enforce: "pre",
      async resolveId(source, importer) {
        if (!source.endsWith(".mdx?metadata")) return;
        const resolved = await this.resolve(source.slice(0, -"?metadata".length), importer, { skipSelf: true });
        // A JS suffix keeps the MDX transformer from compiling metadata as a layout.
        return resolved && `${resolved.id}.metadata.js`;
      },
      async load(id) {
        if (!id.endsWith(".mdx.metadata.js")) return;
        const file = id.slice(0, -".metadata.js".length);
        this.addWatchFile(file);
        const { data } = matter(await readFile(file, "utf8"));
        return `export default ${JSON.stringify(data)}`;
      },
    },
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [
          rehypeUnwrapImages,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      }),
      enforce: "pre",
    },
    tailwindcss(),
    solidStart({ extensions: ["mdx", "md"] }),
    nitro(),
  ],
  nitro: {
    preset: "vercel",
    routeRules: {
      "/profile": { redirect: { to: "/", status: 308 } },
      "/profile/": { redirect: { to: "/", status: 308 } },
    },
    vercel: {
      config: {
        version: 3,
        routes: [{ src: "/(?:profile|(?:projects|writing)/[a-z0-9-]+)\\.md$", headers: { "Content-Type": "text/plain; charset=utf-8" }, continue: true }],
      },
    },
    prerender: {
      crawlLinks: true,
      routes: ["/", "/writing"],
    },
  },
});
