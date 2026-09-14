/**
 *  Custom cursor — a dot that tracks the pointer exactly and a ring that
 *  lags behind it, widening over anything clickable. Fine pointers only;
 *  touch devices keep the native behaviour.
 */
import { useEffect, useRef } from "react";

const HOT = "a, button, [role='button'], input, textarea, select";
const EASE = 0.16;

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const place = (el: HTMLElement | null, px: number, py: number) => {
      if (el) el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      place(dot.current, x, y);
      const hot = (e.target as Element).closest?.(HOT);
      ring.current?.classList.toggle("is-hot", Boolean(hot));
      document.body.classList.remove("cursor-out");
    };
    const onOut = () => document.body.classList.add("cursor-out");
    const press = (on: boolean) => () => ring.current?.classList.toggle("is-down", on);

    // The ring chases the dot — the lag is the whole effect.
    let frame = requestAnimationFrame(function tick() {
      rx += (x - rx) * EASE;
      ry += (y - ry) * EASE;
      place(ring.current, rx, ry);
      frame = requestAnimationFrame(tick);
    });

    const down = press(true);
    const up = press(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onOut);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onOut);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

export default Cursor;
