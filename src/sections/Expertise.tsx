/**
 *  Expertise — a data-dashboard style view: headline stats + animated
 *  proficiency bars that fill when scrolled into view.
 */
import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import Reveal from "../components/Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type Stat = { value: string; label: string };
type Skill = { name: string; level: number };

const STATS: Stat[] = [
  { value: "6+", label: "Years in software & data" },
  { value: "200+", label: "Data professionals supported" },
  { value: "PB", label: "Scale of data orchestrated" },
  { value: "2", label: "Conference talks (2025)" },
];

const SKILLS: Skill[] = [
  { name: "Apache Airflow", level: 95 },
  { name: "BigQuery", level: 90 },
  { name: "dbt", level: 88 },
  { name: "Working with big data", level: 85 },
  { name: "Management & leadership", level: 80 },
];

function SkillBar({ name, level, delay }: Skill & { delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill" ref={ref}>
      <div className="skill__head">
        <span className="skill__name">{name}</span>
        <span className="skill__pct">{level}%</span>
      </div>
      <div className="skill__track">
        <div
          className="skill__fill"
          style={{ width: visible ? `${level}%` : 0, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
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

      <div className="skills">
        {SKILLS.map((s, i) => (
          <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 120} />
        ))}
      </div>

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
        <a
          className="btn btn--primary oss__cta"
          href="https://github.com/apache/airflow/pulls?q=is%3Apr+author%3AOscarLigthart+is%3Aclosed"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} /> View my Airflow PRs
        </a>
      </Reveal>
    </Section>
  );
}

export default Expertise;
