/**
 *  Starfield — depth layers of stars behind the page. Every layer drifts at
 *  its own rate on scroll and leans against the pointer; the far layers barely
 *  move, the near ones follow hard. That spread is the whole depth illusion.
 *
 *  Distant stars are laid along a diagonal band — a milky way running the full
 *  height of the field, dense at its spine and thinning out to either side —
 *  rather than scattered evenly, which reads flat.
 */
import { useEffect, useMemo, useRef } from "react";

type Layer = {
  count: number;
  size: number;
  blur: number;
  rate: number; // scroll parallax
  drift: number; // pointer parallax, in px
  twinkle: number;
  alpha: [number, number];
  /** Spread along the galactic band instead of across the whole sky. */
  band?: { width: number };
};

// Far and faint first, near and bright last.
const LAYERS: Layer[] = [
  // The deep field: a haze of pinpricks along the band, packed and dim.
  { count: 3400, size: 1.3, blur: 0, rate: 0.038, drift: 18, twinkle: 11, alpha: [0.14, 0.52], band: { width: 62 } },
  // Same band, a little nearer — enough size to separate from the haze.
  { count: 1100, size: 2, blur: 1, rate: 0.07, drift: 34, twinkle: 8, alpha: [0.32, 0.8], band: { width: 76 } },
  // Loose stars filling the rest of the sky so the band has something to sit in.
  { count: 760, size: 1, blur: 0, rate: 0.08, drift: 34, twinkle: 9, alpha: [0.18, 0.5] },
  { count: 340, size: 2, blur: 2, rate: 0.16, drift: 60, twinkle: 6, alpha: [0.4, 0.85] },
  { count: 150, size: 3, blur: 4, rate: 0.26, drift: 100, twinkle: 9, alpha: [0.55, 0.95] },
  // The giants. Few, large, glowing — these are what pops.
  { count: 30, size: 5, blur: 8, rate: 0.42, drift: 170, twinkle: 5, alpha: [0.8, 1] },
];

// The band's angle, shared by every piece of it.
const TILT = -26;

// The luminous body of the galaxy: a glowing lane, a brighter core bulge and
// the dark dust lane that splits it. Blurred hard so none of it reads as CSS.
const BAND = [
  {
    cls: "stars__band",
    rate: 0.038,
    drift: 18,
    style: {
      background: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(150, 180, 230, 0.05) 14%,
          rgba(178, 200, 238, 0.11) 30%,
          rgba(196, 214, 245, 0.15) 42%,
          rgba(214, 226, 250, 0.17) 50%,
          rgba(196, 214, 245, 0.145) 58%,
          rgba(178, 200, 238, 0.1) 70%,
          rgba(150, 180, 230, 0.045) 86%,
          transparent 100%),
        radial-gradient(ellipse 26% 70% at 34% 50%, rgba(232, 196, 150, 0.15) 0%, transparent 70%),
        radial-gradient(ellipse 20% 60% at 68% 46%, rgba(180, 200, 240, 0.13) 0%, transparent 70%)`,
      filter: "blur(56px)",
    },
  },
  {
    cls: "stars__band stars__band--dust",
    rate: 0.042,
    drift: 20,
    style: {
      background: `linear-gradient(to bottom,
        transparent 0%,
        rgba(6, 9, 18, 0.34) 38%,
        rgba(6, 9, 18, 0.46) 50%,
        rgba(6, 9, 18, 0.3) 62%,
        transparent 84%)`,
      filter: "blur(34px)",
    },
  },
];

// Soft clouds, most of them strung along the band. Tiny rates keep them on
// screen for the whole page; `rot` tilts them to follow the spine.
const NEBULAE = [
  { x: 20, y: 20, size: 46, rate: 0.03, drift: 16, rot: TILT, colour: "rgba(160, 190, 230, 0.16)" },
  { x: 50, y: 56, size: 60, rate: 0.05, drift: 30, rot: TILT, colour: "rgba(43, 80, 121, 0.5)" },
  { x: 80, y: 92, size: 44, rate: 0.07, drift: 48, rot: TILT, colour: "rgba(232, 114, 44, 0.2)" },
];

const EASE = 0.07;
// Ambient sail: a slow figure-of-eight each layer traces on its own. The flat
// term keeps the far layers moving too — scaling by drift alone left them
// sub-pixel, i.e. dead.
const AMBIENT = 0.2;
const AMBIENT_FLOOR = 1.2;
const DRIFT_SPEED = 0.0034;

// Three uniforms averaged ≈ a bell curve: dense core, thinning edges.
const bell = () => (Math.random() + Math.random() + Math.random()) / 3 - 0.5;

// Star clouds bunch along the band instead of pacing it evenly.
const CLUMPS = [0.08, 0.24, 0.37, 0.52, 0.66, 0.79, 0.94];
const clump = () => {
  const c = CLUMPS[(Math.random() * CLUMPS.length) | 0];
  return Math.min(1, Math.max(0, c + bell() * 0.42));
};

// A layer only needs to cover the viewport plus however far it drifts, and it
// drifts rate x page-height. Spreading a slow layer over the whole document
// would push most of its stars off screen forever.
const extent = (rate: number) => 110 + rate * 800;

// Stars are box-shadow copies of a single dot — one element per layer.
const field = (l: Layer) =>
  Array.from({ length: l.count }, () => {
    const warm = Math.random() < 0.16;
    const [lo, hi] = l.alpha;
    const alpha = (lo + Math.random() * (hi - lo)).toFixed(2);
    const colour = warm ? `rgba(245, 166, 35, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;

    const reach = extent(l.rate);
    let x: number;
    let y: number;
    if (l.band) {
      // Walk the spine top-left to bottom-right, clumping rather than pacing
      // evenly, then scatter off it: most stars hug a tight core, the rest
      // fall away into a broad halo. That contrast is what reads as a galaxy.
      const t = clump();
      const core = Math.random() < 0.45;
      const spread = core ? l.band.width * 0.45 : l.band.width;
      x = t * 124 - 12 + bell() * 16;
      y = t * reach + bell() * 2.2 * spread;
    } else {
      x = Math.random() * 100;
      y = Math.random() * reach;
    }
    return `${x.toFixed(2)}vw ${y.toFixed(2)}vh ${l.blur}px 0 ${colour}`;
  }).join(", ");

function Stars() {
  const root = useRef<HTMLDivElement>(null);
  const fields = useMemo(() => LAYERS.map(field), []);

  useEffect(() => {
    const els = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-rate]") ?? []);
    if (!els.length) return;

    // Pointer offset eases toward its target so the sky follows, never snaps.
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let t = 0;

    const onMove = (e: PointerEvent | MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -2;
      ty = (e.clientY / window.innerHeight - 0.5) * -2;
    };

    let loop = 0;
    const tick = () => {
      t += 1;
      mx += (tx - mx) * EASE;
      my += (ty - my) * EASE;
      const y = window.scrollY;
      for (const el of els) {
        const rate = Number(el.dataset.rate);
        const drift = Number(el.dataset.drift);
        const rot = el.dataset.rot ?? "0";
        // Everything keeps sailing on its own, even with the mouse still.
        const amp = AMBIENT_FLOOR + drift * AMBIENT;
        const phase = Number(el.dataset.phase);
        const ax = Math.sin(t * DRIFT_SPEED + phase) * amp;
        const ay = Math.cos(t * DRIFT_SPEED * 0.6 + phase) * amp * 0.7;
        el.style.transform =
          `translate3d(${mx * drift + ax}px, ${my * drift + ay - y * rate}px, 0) rotate(${rot}deg)`;
      }
      loop = requestAnimationFrame(tick);
    };
    loop = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(loop);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const layer = (l: Layer, i: number) => (
    <span
      key={`${l.size}-${i}`}
      className="stars__layer"
      data-rate={l.rate}
      data-drift={l.drift}
      data-phase={i * 1.3}
      style={{
        width: l.size,
        height: l.size,
        boxShadow: fields[i],
        animationDuration: `${l.twinkle}s`,
        animationDelay: `${-i * 1.7}s`,
      }}
    />
  );

  const band = (b: (typeof BAND)[number], i: number) => (
    <span
      key={b.cls}
      className={b.cls}
      data-rate={b.rate}
      data-drift={b.drift}
      data-phase={i * 1.1}
      data-rot={TILT}
      style={b.style}
    />
  );

  return (
    <div className="stars" ref={root} aria-hidden="true">
      {band(BAND[0], 0)}
      {LAYERS.map((l, i) => (l.band ? layer(l, i) : null))}
      {band(BAND[1], 1)}
      {NEBULAE.map((n, i) => (
        <span
          key={`${n.x}-${n.y}`}
          className="stars__nebula"
          data-rate={n.rate}
          data-drift={n.drift}
          data-phase={i * 2.1}
          data-rot={n.rot}
          style={{
            left: `${n.x}%`,
            top: `${n.y}vh`,
            width: `${n.size}vw`,
            height: `${n.size * 0.5}vw`,
            background: `radial-gradient(closest-side, ${n.colour} 0%, transparent 100%)`,
          }}
        />
      ))}
      {LAYERS.map((l, i) => (l.band ? null : layer(l, i)))}
    </div>
  );
}

export default Stars;
