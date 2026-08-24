/**
 *  Career — experience (grouped by company) plus education, as timelines.
 *  Experience items are collapsible; recent roles are open by default.
 */
import { useState } from "react";
import Section from "./Section";
import Reveal from "../components/Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`;

// Dates are "YYYY-MM"; a missing `end` means the role is ongoing.
type Position = { title: string; start: string; end?: string; note?: string; tag?: string };
type Job = {
  company: string;
  employment: string;
  location: string;
  icon?: string;
  defaultOpen?: boolean;
  description?: string;
  positions: Position[];
};
type Education = { school: string; degree: string; period: string; icon?: string; note?: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const parseMonth = (s: string) => {
  const [y, m] = s.split("-").map(Number);
  return new Date(y, m - 1, 1);
};
const monthLabel = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

// LinkedIn-style duration: inclusive of the current/partial month.
const formatDuration = (start: Date, end: Date) => {
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
};

const positionPeriod = (p: Position) =>
  `${monthLabel(parseMonth(p.start))} — ${p.end ? monthLabel(parseMonth(p.end)) : "Present"}`;

// Overall range of a job, derived from its positions.
const jobRange = (positions: Position[]) => {
  const start = new Date(Math.min(...positions.map((p) => parseMonth(p.start).getTime())));
  const ongoing = positions.some((p) => !p.end);
  const end = ongoing
    ? null
    : new Date(Math.max(...positions.map((p) => parseMonth(p.end as string).getTime())));
  return { start, end };
};

const EXPERIENCE: Job[] = [
  {
    company: "Vinted",
    employment: "Full-time",
    location: "Amsterdam, NL",
    icon: img("vinted_icon.png"),
    defaultOpen: true,
    description:
      "Vinted is Europe's largest second-hand marketplace, where 20+ decentralised data teams build on petabytes of data.",
    positions: [
      {
        title: "Engineering Manager",
        start: "2026-02",
        note: "Technical lead within the Data Platform team, building tooling that empowers 200+ data professionals to create reliable data products.",
      },
      { title: "Lead Data Engineer", start: "2025-09", end: "2026-02" },
      { title: "Senior Data Engineer", start: "2024-01", end: "2025-09" },
    ],
  },
  {
    company: "South Pole",
    employment: "Full-time",
    location: "Amsterdam, NL",
    icon: img("south_pole_icon.png"),
    defaultOpen: true,
    description:
      "South Pole develops emission-reduction projects that turn climate action into long-term business opportunities.",
    positions: [
      { title: "Senior Data Engineer", start: "2023-04", end: "2024-01", tag: "Airflow · Google Cloud Platform" },
      { title: "Data Engineer", start: "2022-04", end: "2023-05", tag: "Airflow · Google Cloud Platform" },
    ],
  },
  {
    company: "Aigritec",
    employment: "Full-time",
    location: "Bolzano, Italy",
    icon: img("aigritec_logo.jpeg"),
    description:
      "Aigritec is building a robot to automate harvest operations in fruit orchards.",
    positions: [
      {
        title: "Head of Artificial Intelligence",
        start: "2020-05",
        end: "2022-04",
        note: "Responsible for all software-related tasks, from motor control to object detection.",
      },
    ],
  },
  {
    company: "Saivvy",
    employment: "Self-employed",
    location: "Amsterdam, NL",
    description: "Saivvy develops self-driving software for unmanned rovers.",
    positions: [
      {
        title: "Chief Technology Officer",
        start: "2020-05",
        end: "2022-02",
        note: "Oversaw all technical processes, working on Computer Vision and Reinforcement Learning to infer a driving policy.",
      },
    ],
  },
  {
    company: "Copernica Marketing Software",
    employment: "Part-time",
    location: "Amsterdam, NL",
    icon: img("copernica_logo.jpeg"),
    positions: [{ title: "Software Engineer", start: "2019-09", end: "2020-10" }],
  },
];

const EDUCATION: Education[] = [
  {
    school: "University of Amsterdam",
    degree: "MSc, Artificial Intelligence",
    period: "2017 — 2020",
    icon: img("uva_icon.svg"),
    note: "Graduated Cum Laude (8.4). Notable subjects: Machine Learning, Natural Language Processing, Information Retrieval, Computer Vision, Deep Learning and Reinforcement Learning.",
  },
  {
    school: "University of Amsterdam",
    degree: "BSc, Neuroscience",
    period: "2013 — 2017",
    icon: img("uva_icon.svg"),
    note: "Final grade 7.6.",
  },
];

function Node({ icon, label }: { icon?: string; label: string }) {
  if (icon) {
    return (
      <span className="tl-node">
        <img src={icon} alt={`${label} logo`} />
      </span>
    );
  }
  return <span className="tl-node tl-node--fallback">{label.charAt(0)}</span>;
}

function ExperienceItem({ job, delay }: { job: Job; delay: number }) {
  const [open, setOpen] = useState(Boolean(job.defaultOpen));
  const { start, end } = jobRange(job.positions);
  const span = `${start.getFullYear()} — ${end ? end.getFullYear() : "Present"}`;
  const meta = `${job.employment} · ${formatDuration(start, end ?? new Date())} · ${job.location}`;
  return (
    <Reveal as="li" className={`tl-item ${open ? "is-open" : ""}`} delay={delay}>
      <Node icon={job.icon} label={job.company} />
      <button
        className="tl-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="tl-header__text">
          <span className="tl-period">{span}</span>
          <span className="tl-role">{job.company}</span>
          <span className="tl-meta">{meta}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="tl-chevron" />
      </button>
      <div className="tl-body">
        <div className="tl-body__inner">
          {job.description && <p className="tl-desc">{job.description}</p>}
          <ul className="tl-positions">
            {job.positions.map((p) => (
              <li className="tl-pos" key={p.title}>
                <div className="tl-pos__main">
                  <span className="tl-pos__title">{p.title}</span>
                  <span className="tl-pos__period">{positionPeriod(p)}</span>
                </div>
                {p.note && <p className="tl-pos__note">{p.note}</p>}
                {p.tag && <span className="tl-pos__tag">{p.tag}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

function Career() {
  return (
    <Section id="career" eyebrow="Where I've been" title="Career">
      <ol className="timeline">
        {EXPERIENCE.map((job, i) => (
          <ExperienceItem key={job.company} job={job} delay={i * 70} />
        ))}
      </ol>

      <h3 className="section__subhead">Education</h3>
      <ol className="timeline">
        {EDUCATION.map((e, i) => (
          <Reveal as="li" key={e.degree} className="tl-item" delay={i * 70}>
            <Node icon={e.icon} label={e.school} />
            <div className="tl-header__text">
              <span className="tl-period">{e.period}</span>
              <h3 className="tl-role">{e.degree}</h3>
              <span className="tl-meta">{e.school}</span>
            </div>
            {e.note && <p className="tl-desc">{e.note}</p>}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export default Career;
