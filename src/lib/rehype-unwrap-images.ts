type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
};

function isWhitespace(node: HastNode) {
  return node.type === "text" && !node.value?.trim();
}

/**
 * Lift a lone `<img>` out of its wrapping `<p>` so custom image
 * components can render a `<figure>` without producing invalid HTML.
 */
function unwrap(node: HastNode) {
  if (!node.children) return;
  node.children = node.children.flatMap((child) => {
    unwrap(child);
    if (child.tagName !== "p" || !child.children) return [child];
    const meaningful = child.children.filter((c) => !isWhitespace(c));
    if (meaningful.length === 1 && meaningful[0]?.tagName === "img") {
      return meaningful;
    }
    return [child];
  });
}

export function rehypeUnwrapImages() {
  return (tree: HastNode) => {
    unwrap(tree);
  };
}
