import { createContext, splitProps, useContext } from "solid-js";
import type { JSX } from "solid-js";

const FigureContext = createContext(false);

/**
 * Groups one or more images into a single figure. Extra images become
 * columns; a `<figcaption>` sits centered underneath.
 */
export function Figure(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <FigureContext.Provider value={true}>
      <figure {...props} />
    </FigureContext.Provider>
  );
}

/**
 * Markdown `![alt](src "caption")` renderer. Standalone images wrap
 * themselves in a figure; images already inside `<Figure>` stay bare so
 * the parent can lay them out as columns.
 */
export function ProseImage(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const nested = useContext(FigureContext);
  const [local, rest] = splitProps(props, ["alt", "title"]);

  const caption = () => {
    const title = typeof local.title === "string" ? local.title.trim() : "";
    const alt = typeof local.alt === "string" ? local.alt.trim() : "";
    return title || alt;
  };

  if (nested) {
    return <img alt={local.alt ?? ""} decoding="async" {...rest} />;
  }

  const label = caption();
  return (
    <figure>
      <img alt={label ? "" : (local.alt ?? "")} decoding="async" {...rest} />
      {label ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}
