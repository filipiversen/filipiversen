import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { toMarkdown } from "mdast-util-to-markdown";

const parser = unified().use(remarkParse).use(remarkMdx);
const inlineTypes = new Set(["text", "inlineCode", "link", "image", "strong", "emphasis", "break", "linkReference", "imageReference"]);
const text = (value) => ({ type: "text", value });

// JSX can put block elements inside Markdown paragraphs. Split those paragraphs
// before serialization so captions, headings, and lists retain their structure.
function flow(children) {
  const result = [];
  let inline = [];
  function flush() {
    if (inline.some((node) => node.type !== "text" || node.value.trim())) result.push({ type: "paragraph", children: inline });
    inline = [];
  }
  for (const child of children) {
    if (inlineTypes.has(child.type)) inline.push(child);
    else { flush(); result.push(child); }
  }
  flush();
  return result;
}

function phrasing(children) {
  return children.flatMap((node) => node.type === "paragraph" ? phrasing(node.children) : [node]);
}

export function mdxToMarkdown(source, canonical) {
  const absolute = (url) => {
    if (typeof url !== "string" || !url.trim()) throw new Error("Markdown links and media need a URL");
    const resolved = new URL(url, canonical);
    if (!["https:", "http:", "mailto:"].includes(resolved.protocol)) throw new Error(`Unsupported public URL: ${url}`);
    return resolved.href;
  };
  function convert(node) {
    const children = (node.children ?? []).flatMap(convert);
    if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
      const attr = (name) => {
        const value = node.attributes.find((item) => item.name === name)?.value;
        if (value != null && typeof value !== "string") throw new Error(`Markdown export needs a literal ${name} on <${node.name}>`);
        return value;
      };
      switch (node.name) {
        case "Figure": case "figure": case "section": case "div": case "details": case "picture": case "video":
          return flow(children);
        case "p": return flow(children);
        case "figcaption": case "summary":
          return [{ type: "emphasis", children: phrasing(children) }];
        case "h2": case "h3": case "h4":
          return [{ type: "heading", depth: Number(node.name[1]), children: phrasing(children) }];
        case "ol": case "ul":
          return [{ type: "list", ordered: node.name === "ol", spread: false, children: phrasing(children).filter((item) => item.type !== "text" || item.value.trim()) }];
        case "li": return [{ type: "listItem", spread: false, children: flow(children) }];
        case "strong": case "em":
          return [{ type: node.name === "strong" ? "strong" : "emphasis", children: phrasing(children) }];
        case "a": return [{ type: "link", url: absolute(attr("href")), children: phrasing(children) }];
        case "img": return [{ type: "image", url: absolute(attr("src")), alt: attr("alt") ?? "" }];
        case "source":
          // Responsive image alternatives are already represented by the <img>.
          return attr("src") ? [{ type: "paragraph", children: [{ type: "link", url: absolute(attr("src")), children: [text("Watch the video")] }] }] : [];
        case "track":
          return [{ type: "paragraph", children: [{ type: "link", url: absolute(attr("src")), children: [text(attr("label") ?? "Video captions")] }] }];
        case "SignalDemo":
          return [{ type: "paragraph", children: [{ type: "link", url: canonical, children: [text("Open the interactive signal demo in the article")] }] }];
        default: throw new Error(`Add a Markdown representation for <${node.name}> before publishing.`);
      }
    }
    if (node.type.startsWith("mdx")) throw new Error(`Unsupported MDX content: ${node.type}`);
    if (node.type === "paragraph") return flow(children);
    const result = { ...node };
    delete result.position;
    if (node.children) result.children = node.type === "root" || node.type === "listItem" || node.type === "blockquote" ? flow(children) : children;
    if (node.url) result.url = absolute(node.url);
    return [result];
  }
  return toMarkdown(convert(parser.parse(source))[0], { bullet: "-", emphasis: "_", fences: true });
}
