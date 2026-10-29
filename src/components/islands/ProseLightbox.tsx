import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

type LightboxImage = { src: string; alt: string };

export default function ProseLightbox() {
  const [image, setImage] = createSignal<LightboxImage | null>(null);
  const [zoomed, setZoomed] = createSignal(false);
  const [naturalWidth, setNaturalWidth] = createSignal(0);
  let dialog: HTMLDialogElement | undefined;
  let closeButton: HTMLButtonElement | undefined;
  let viewport: HTMLDivElement | undefined;
  let restoreFocus: HTMLImageElement | null = null;
  let previousOverflow = "";

  function captionFor(img: HTMLImageElement) {
    return img.alt.trim() || img.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || "Product image";
  }

  function open(img: HTMLImageElement) {
    restoreFocus = img;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setZoomed(false);
    setNaturalWidth(0);
    // Use the original image rather than a small responsive derivative.
    setImage({ src: img.src, alt: captionFor(img) });
  }

  function close() {
    dialog?.close();
    setImage(null);
    document.documentElement.style.overflow = previousOverflow;
    restoreFocus?.focus({ preventScroll: true });
    restoreFocus = null;
  }

  createEffect(() => {
    if (image() && dialog && !dialog.open) {
      dialog.showModal();
      closeButton?.focus();
    }
  });

  onMount(() => {
    function enhance() {
      for (const img of document.querySelectorAll<HTMLImageElement>(".prose img")) {
        if (img.dataset.lightboxReady) continue;
        img.dataset.lightboxReady = "true";
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-haspopup", "dialog");
        img.setAttribute("aria-label", `Inspect image: ${captionFor(img)}`);
      }
    }
    enhance();
    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (target instanceof HTMLImageElement && target.closest(".prose")) {
        event.preventDefault();
        open(target);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.closest(".prose")) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      open(target);
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    onCleanup(() => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      if (image()) document.documentElement.style.overflow = previousOverflow;
    });
  });

  return (
    <Show when={image()}>{(img) => (
      <Portal>
        <dialog ref={dialog} class="lightbox" aria-label="Image viewer"
          onCancel={(event) => { event.preventDefault(); close(); }}
          onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div class="lightbox-dialog">
            <div class="lightbox-toolbar">
              <button type="button" disabled={!naturalWidth()} aria-pressed={zoomed()} onClick={() => {
                setZoomed(!zoomed());
                if (viewport) { viewport.scrollTop = 0; viewport.scrollLeft = 0; }
              }}>{zoomed() ? "Fit image" : "View at full size"}</button>
              <a href={img().src} target="_blank" rel="noreferrer">Open original ↗</a>
              <button ref={closeButton} type="button" aria-label="Close image" onClick={close}>Close <span aria-hidden="true">×</span></button>
            </div>
            <div ref={viewport} class="lightbox-viewport" tabIndex={0} role="region" aria-label={zoomed() ? "Full-size image. Scroll to inspect details." : "Image preview"}>
              <img class="lightbox-image" data-zoomed={zoomed() ? "" : undefined} src={img().src} alt={img().alt}
                style={{ width: zoomed() ? `${naturalWidth()}px` : undefined }}
                onLoad={(event) => setNaturalWidth(event.currentTarget.naturalWidth)} />
            </div>
            <p class="lightbox-caption">{zoomed() ? "Scroll to inspect details. " : ""}{img().alt}</p>
          </div>
        </dialog>
      </Portal>
    )}</Show>
  );
}
