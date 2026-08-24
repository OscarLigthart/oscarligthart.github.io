/**
 *  Hobbies — photo-backed cards using existing images from /public/img.
 */
import Section from "./Section";
import Reveal from "../components/Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faPersonHiking,
  faWater,
  faMusic,
  faCode,
  faChess,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";

const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`;

type Hobby = {
  title: string;
  text: string;
  icon: IconDefinition;
  image?: string;
};

const HOBBIES: Hobby[] = [
  {
    title: "Hiking",
    text: "Chasing ridgelines and long-distance trails — the higher and quieter, the better.",
    icon: faPersonHiking,
    image: img("hiking_0.jpg"),
  },
  {
    title: "Wingfoiling",
    text: "Riding the wind and water, always hunting for that effortless glide above the surface.",
    icon: faWater,
    image: img("surf_0.jpg"),
  },
  {
    title: "Making music",
    text: "Writing and playing music — from jamming with the band to producing tracks at home.",
    icon: faMusic,
    image: img("band_0.jpg"),
  },
  {
    title: "Chess",
    text: "Sharpening my game one match at a time — always up for a tactical battle over the board.",
    icon: faChess,
    image: img("chess_0.jpg"),
  },
  {
    title: "Football",
    text: "Chasing the ball with friends — the perfect mix of teamwork, competition and fun.",
    icon: faFutbol,
    image: img("football_0.jpg"),
  },
  {
    title: "Coding",
    text: "Tinkering with side projects and new tools — because building things is genuinely fun.",
    icon: faCode,
    image: img("hackerman.jpg"),
  },
];

function Hobbies() {
  return (
    <Section id="hobbies" eyebrow="Off the clock" title="Hobbies" tone="dark">
      <div className="hobbies-grid">
        {HOBBIES.map((h, i) => (
          <Reveal
            key={h.title}
            className={`hobby ${h.image ? "" : "hobby--gradient"}`}
            delay={i * 90}
          >
            <div
              className="hobby__img"
              style={h.image ? { backgroundImage: `url(${h.image})` } : undefined}
            />
            <div className="hobby__body">
              <span className="hobby__icon">
                <FontAwesomeIcon icon={h.icon} />
              </span>
              <h3 className="hobby__title">{h.title}</h3>
              <p className="hobby__text">{h.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Hobbies;
