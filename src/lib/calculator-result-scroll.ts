export function scrollCalculatorResultIntoView(element: HTMLElement | null): () => void {
  if (!element || typeof window === "undefined") return () => {};

  const frame = window.requestAnimationFrame(() => {
    element.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  });

  return () => window.cancelAnimationFrame(frame);
}
