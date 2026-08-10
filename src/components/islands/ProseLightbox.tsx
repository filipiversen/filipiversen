import { createEffect, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

type LightboxImage = {
  src: string;
  alt: string;
};

/**
 * Click-to-expand for markdown images inside `.prose`.
 *
 * Server-rendered `<img>` tags stay as plain HTML; this island attaches
 * listeners, opens a fullscreen dialog, and restores focus on close.
 */
export default function ProseLightbox() {
  const [image, setImage] = createSignal<LightboxImage | null>(null);
  const [visible, setVisible] = createSignal(false);
  let closeBtn: HTMLButtonElement | undefined;
  let restoreFocus: HTMLElement | null = null;
  let exitTimer = 0;

  function open(img: HTMLImageElement) {
    restoreFocus = img;
    setImage({ src: img.currentSrc || img.src, alt: img.alt });
    document.documentElement.style.overflow = "hidden";
    // Two frames so the dialog mounts closed, then transitions open.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }

  function close() {
    if (!image()) return;
    setVisible(false);
    window.clearTimeout(exitTimer);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimer = window.setTimeout(
      () => {
        setImage(null);
        document.documentElement.style.overflow = "";
        restoreFocus?.focus({ preventScroll: true });
        restoreFocus = null;
      },
      reduced ? 0 : 180,
    );
  }

  createEffect(() => {
    if (image() && visible()) closeBtn?.focus();
  });

  onMount(() => {
    const proseImages = () =>
      document.querySelectorAll<HTMLImageElement>(".prose img");

    function enhance() {
      for (const img of proseImages()) {
        if (img.dataset.lightboxReady === "true") continue;
        img.dataset.lightboxReady = "true";
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        const label = img.alt
          ? `View larger image: ${img.alt}`
          : "View larger image";
        img.setAttribute("aria-label", label);
      }
    }

    enhance();

    const observer = new MutationObserver(enhance);
    observer.observe(document.body, { childList: true, subtree: true });

    function onClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!target.closest(".prose")) return;
      e.preventDefault();
      open(target);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && image()) {
        e.preventDefault();
        close();
        return;
      }

      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!target.closest(".prose")) return;
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      open(target);
    }

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);

    onCleanup(() => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(exitTimer);
      document.documentElement.style.overflow = "";
    });
  });

  return (
    <Show when={image()}>
      {(img) => (
        <Portal>
          <div
            class="lightbox"
            data-open={visible() ? "" : undefined}
            role="presentation"
          >
            <button
              type="button"
              class="lightbox-backdrop"
              aria-label="Close image"
              onClick={close}
            />
            <div
              class="lightbox-dialog"
              role="dialog"
              aria-modal="true"
              aria-label={img().alt || "Expanded image"}
            >
              <button
                ref={closeBtn}
                type="button"
                class="lightbox-close"
                aria-label="Close image"
                onClick={close}
              >
                <CloseIcon />
              </button>
              <img
                class="lightbox-image"
                src={img().src}
                alt={img().alt}
                draggable={false}
              />
              <Show when={img().alt}>
                <p class="lightbox-caption">{img().alt}</p>
              </Show>
            </div>
          </div>
        </Portal>
      )}
    </Show>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
