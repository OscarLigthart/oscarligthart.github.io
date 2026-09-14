/**
 *  Sticky top navigation with smooth-scroll anchors.
 */
import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";

type NavLink = { id: string; label: string };

const LINKS: NavLink[] = [
  { id: "story", label: "Story" },
  { id: "hobbies", label: "Hobbies" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <a className="nav__brand" href="#top" onClick={(e) => go(e, "top")}>
        Oscar<span>Ligthart</span>
      </a>

      <button
        className={`nav__toggle ${open ? "is-open" : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
