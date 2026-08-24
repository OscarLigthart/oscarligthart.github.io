/**
 *  Projects — conference talks, a blog post and a podcast.
 */
import Section from "./Section";
import Reveal from "../components/Reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faUpRightFromSquare,
  faNewspaper,
  faMicrophoneLines,
} from "@fortawesome/free-solid-svg-icons";

type LinkKind = "youtube" | "read" | "listen" | "source";
type ProjectLink = { kind: LinkKind; url: string; label: string };
type Project = {
  badge: string;
  year?: string;
  title: string;
  description: string;
  video?: { id: string; start?: number };
  links: ProjectLink[];
};

const LINK_META: Record<LinkKind, { icon: IconDefinition; className: string }> = {
  youtube: { icon: faYoutube, className: "project-card__link--yt" },
  read: { icon: faNewspaper, className: "project-card__link--read" },
  listen: { icon: faMicrophoneLines, className: "project-card__link--listen" },
  source: { icon: faUpRightFromSquare, className: "project-card__link--ghost" },
};

const PROJECTS: Project[] = [
  {
    badge: "Airflow Summit",
    year: "2025",
    title: "How Airflow solves the coordination of decentralised teams at Vinted",
    description:
      "At Vinted, Europe's largest second-hand marketplace, 20+ decentralised data teams build on petabytes of data. This talk shows how Apache Airflow — paired with a user-friendly abstraction layer — coordinates complex inter-team dependencies and keeps scheduling consistent as the organisation scales.",
    video: { id: "YU-4My_dneM" },
    links: [
      {
        kind: "source",
        url: "https://airflowsummit.org/sessions/2025/how-airflow-solves-the-coordination-of-decentralised-teams-vinted/",
        label: "Session page",
      },
    ],
  },
  {
    badge: "PyData Amsterdam",
    year: "2025",
    title: "Orchestrating success: How Vinted standardizes large-scale, decentralized data pipelines",
    description:
      "A deep dive into the abstraction layer and Python code generator we built on top of Airflow. It generates DAGs for dbt, Dockerised jobs and Vertex-AI pipelines, validates at CI time, and lets autonomous teams ship reliable pipelines fast — while staying scheduler-agnostic for future migrations.",
    video: { id: "9YAVD3kwU58", start: 2 },
    links: [
      {
        kind: "source",
        url: "https://cfp.pydata.org/pydata-amsterdam-2025/talk/review/MV3LQTL8ZHP9YRUTGKMRXXERQS7UPMTF",
        label: "Session page",
      },
    ],
  },
  {
    badge: "Vinted Engineering",
    year: "Blog",
    title: "Orchestrating success",
    description:
      "A written deep dive on the Vinted Engineering blog into how we standardize large-scale, decentralized data pipelines with a code-generated Airflow abstraction layer.",
    links: [
      { kind: "read", url: "https://vinted.engineering/2025/12/29/orchestrating-success/", label: "Read article" },
    ],
  },
  {
    badge: "Astronomer",
    year: "Podcast",
    title: "Inside Vinted's code-generated Airflow pipelines",
    description:
      "On Astronomer's podcast, Rodrigo Loredo and I go behind the scenes of how Vinted generates Airflow pipelines from code and coordinates 20+ decentralized data teams.",
    links: [
      {
        kind: "listen",
        url: "https://www.astronomer.io/podcast/inside-vinteds-code-generated-airflow-pipelines-with-oscar-ligthart-and-rodrigo-loredo/",
        label: "Listen",
      },
    ],
  },
];

function Projects() {
  return (
    <Section id="projects" eyebrow="Talks & work" title="Projects" tone="dark">
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <Reveal as="article" key={p.title} className="project-card" delay={i * 100}>
            {p.video && (
              <div className="project-card__video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${p.video.id}?rel=0${
                    p.video.start ? `&start=${p.video.start}` : ""
                  }`}
                  title={p.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
            <div className="project-card__meta">
              <span className="project-card__badge">{p.badge}</span>
              {p.year && <span>{p.year}</span>}
            </div>
            <h3 className="project-card__title">{p.title}</h3>
            <p className="project-card__desc">{p.description}</p>
            <div className="project-card__links">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  className={`project-card__link ${LINK_META[l.kind].className}`}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={LINK_META[l.kind].icon} /> {l.label}
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
