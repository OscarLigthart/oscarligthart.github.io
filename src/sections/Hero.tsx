/**
 *  Full-viewport landscape hero. The background drifts slower than the page
 *  on scroll while the copy lifts away — a parallax hand-off into the story.
 */
import { useEffect, useRef } from "react";
import { scrollToId } from "../lib/scroll";

const BG = `${import.meta.env.BASE_URL}img/background.jpg`;

const STATS = [
  { value: "6+", label: "Years in data" },
  { value: "PB", label: "Scale orchestrated" },
  { value: "200+", label: "Engineers supported" },
];

function Hero() {
  const bg = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const fade = Math.max(0, 1 - y / (window.innerHeight * 0.6));
        if (bg.current) {
          bg.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1.06 + y * 0.00012})`;
        }
        if (content.current) {
          content.current.style.transform = `translate3d(0, ${y * -0.14}px, 0)`;
          content.current.style.opacity = String(fade);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" className="hero">
      <div className="hero__bg" ref={bg} style={{ backgroundImage: `url(${BG})` }} />
      <div className="hero__overlay" />

      <div className="hero__content" ref={content}>
        <p className="hero__eyebrow">Data Engineer &middot; Tech Lead</p>
        <h1 className="hero__title">Oscar Ligthart</h1>
        <p className="hero__intro">
          Building reliable data systems at petabyte scale — and the teams that
          keep them standing.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#story" onClick={(e) => scrollTo(e, "story")}>
            My story
          </a>
          <a className="btn btn--ghost" href="#career" onClick={(e) => scrollTo(e, "career")}>
            The career
          </a>
        </div>
      </div>

      <div className="hero__stats">
        {STATS.map((st) => (
          <div className="hero__stat" key={st.label}>
            <span className="hero__stat-value">{st.value}</span>
            <span className="hero__stat-label">{st.label}</span>
          </div>
        ))}
      </div>

      <a className="hero__scroll" href="#story" onClick={(e) => scrollTo(e, "story")}>
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

export default Hero;
