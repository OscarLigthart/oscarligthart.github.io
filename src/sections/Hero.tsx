/**
 *  Full-viewport landscape hero with intro.
 */
const BG = `${import.meta.env.BASE_URL}img/background.jpg`;

function Hero() {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${BG})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Data Engineer &middot; Tech Lead</p>
        <h1 className="hero__title">Oscar Ligthart</h1>
        <p className="hero__intro">
          I am an engineer with a passion for computers, data, and people —
          building reliable systems that stand up at petabyte scale, and helping
          the teams around them thrive. Off the keyboard you'll find me on a
          mountain ridge, a wing foil board, or behind an instrument, chasing the
          next horizon.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects" onClick={(e) => scrollTo(e, "projects")}>
            See my work
          </a>
          <a className="btn btn--ghost" href="#career" onClick={(e) => scrollTo(e, "career")}>
            My journey
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#career" onClick={(e) => scrollTo(e, "career")} aria-label="Scroll down">
        <span className="hero__scroll-dot" />
      </a>
    </section>
  );
}

export default Hero;
