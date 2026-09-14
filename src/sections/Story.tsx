/**
 *  Story — a short personal narrative next to a portrait.
 */
import Section from "./Section";
import Reveal from "../components/Reveal";

const PORTRAIT = `${import.meta.env.BASE_URL}img/oscar.jpg`;

function Story() {
  return (
    <Section id="story">
      <div className="story">
        <Reveal className="story__media">
          <img src={PORTRAIT} alt="Oscar Ligthart" />
        </Reveal>

        <Reveal className="story__text" delay={120}>
          <p className="section__eyebrow">The story</p>
          <h2 className="section__title story__title">My Story</h2>
          <p>
            I studied neuroscience first, then artificial intelligence, and
            ended up in the layer underneath both: the data. The work I keep
            coming back to is building the tools other people depend on.
          </p>
          <p>
            At Vinted I lead data platform work — the tooling that lets around
            20 decentralised teams and 200+ data professionals work on petabytes
            without needing to understand the machinery beneath it. That is
            what data-driven decisions at scale actually rest on: not the
            dashboards, but the platform that keeps them honest.
          </p>
          <p>
            Away from the screen I'm usually on a ridgeline, on a wing foil
            board when there's wind, or behind a guitar when there isn't — I
            play in a band, and there's a fair amount of chess and football in
            there too.
          </p>
          <p className="story__sign">Oscar Ligthart</p>
        </Reveal>
      </div>
    </Section>
  );
}

export default Story;
