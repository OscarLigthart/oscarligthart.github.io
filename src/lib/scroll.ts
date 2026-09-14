/**
 *  Smooth, weighted page scrolling. Lenis carries the momentum; anchors go
 *  through it too so jumps share the same easing.
 */
import Lenis from "lenis";

export const lenis = new Lenis({
  duration: 1.6, // heavier than the 1.2 default — it coasts
  easing: (t: number) => 1 - Math.pow(1 - t, 4),
  wheelMultiplier: 0.85,
  touchMultiplier: 1.4,
  autoRaf: true,
});

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  lenis.scrollTo(el, { offset: 0 });
};
