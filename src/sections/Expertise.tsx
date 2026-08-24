/**
 *  Expertise — headline stats, a radial skill web centred on data
 *  engineering, and open-source contributions.
 */
import Section from "./Section";
import Reveal from "../components/Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type Stat = { value: string; label: string };
// `angle` is degrees clockwise from the top; `radius` is percent from centre.
type SkillNode = { label: string; kind: "tech" | "people"; angle: number; radius: number };

const STATS: Stat[] = [
  { value: "6+", label: "Years in software & data" },
  { value: "200+", label: "Data professionals supported" },
  { value: "PB", label: "Scale of data orchestrated" },
  { value: "2", label: "Conference talks (2025)" },
];

// Hand-placed in loose clusters so the web feels organic — nodes bunch up in
// groups and the connecting lines vary in length rather than forming a wheel.
const NODES: SkillNode[] = [
  // Top cluster
  { label: "Airflow", kind: "tech", angle: -108, radius: 41 },
  { label: "dbt", kind: "tech", angle: -86, radius: 47 },
  { label: "BigQuery", kind: "tech", angle: -66, radius: 33 },
  // Right cluster
  { label: "GCP", kind: "tech", angle: -16, radius: 45 },
  { label: "Spark", kind: "tech", angle: 8, radius: 31 },
  { label: "SQL", kind: "tech", angle: 32, radius: 46 },
  // Bottom cluster
  { label: "Python", kind: "tech", angle: 80, radius: 32 },
  { label: "Linux", kind: "tech", angle: 104, radius: 45 },
  { label: "Terraform", kind: "tech", angle: 126, radius: 34 },
  // Left cluster (people)
  { label: "Leadership", kind: "people", angle: 170, radius: 43 },
  { label: "Mentoring", kind: "people", angle: 196, radius: 30 },
  { label: "Team building", kind: "people", angle: 224, radius: 42 },
];

// Seconds for the radar sweep to complete one revolution. Each blip's pulse is
// delayed so it lights up exactly as the sweep line passes over it.
const SWEEP_SECONDS = 8;

function SkillWeb() {
  const points = NODES.map((node) => {
    const rad = node.angle * (Math.PI / 180);
    // Fraction of a revolution (from the top, clockwise) at which the sweep
    // reaches this node → converted into a negative animation delay.
    const turn = (((node.angle + 90) % 360) + 360) % 360;
    return {
      ...node,
      x: 50 + node.radius * Math.cos(rad),
      y: 50 + node.radius * Math.sin(rad),
      delay: -(SWEEP_SECONDS * (1 - turn / 360)),
    };
  });

  return (
    <Reveal className="web">
      <svg className="web__grid" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="web__ring" cx="50" cy="50" r="47" />
        <circle className="web__ring" cx="50" cy="50" r="33" />
        <circle className="web__ring web__ring--inner" cx="50" cy="50" r="19" />
        <line className="web__cross" x1="3" y1="50" x2="97" y2="50" />
        <line className="web__cross" x1="50" y1="3" x2="50" y2="97" />
        {points.map((p) => (
          <line className="web__spoke" key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} />
        ))}
      </svg>

      <div className="web__sweep" aria-hidden="true" />
      <span className="web__center" aria-hidden="true" />

      {points.map((p) => (
        <span
          key={p.label}
          className={`web__node web__node--${p.kind}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s` }}
        >
          {p.label}
        </span>
      ))}
    </Reveal>
  );
}

function Expertise() {
  return (
    <Section id="expertise" eyebrow="What I do" title="Expertise">
      <Reveal className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </Reveal>

      <p className="web-caption">
        Everything I work with orbits one core craft — the tools and the teams
        that turn raw data into reliable products.
      </p>
      <SkillWeb />

      <Reveal className="oss">
        <div className="oss__icon">
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <div className="oss__body">
          <h3 className="oss__title">Open source</h3>
          <p className="oss__text">
            I give back to the tools I rely on every day — contributing to Apache
            Airflow, the orchestrator at the heart of my work. My merged pull
            requests are all on GitHub.
          </p>
        </div>
        <div className="oss__actions">
          <a
            className="btn btn--primary"
            href="https://github.com/apache/airflow/pulls?q=is%3Apr+author%3AOscarLigthart+is%3Aclosed"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> View my Airflow PRs
          </a>
          <a
            className="btn btn--light"
            href="https://github.com/OscarLigthart"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} /> My GitHub profile
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

export default Expertise;
