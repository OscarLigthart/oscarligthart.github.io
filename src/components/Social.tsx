/**
 *  Fixed social rail down the left edge. Desktop only — it floats over the
 *  page, so on narrow screens it gives way to the footer links.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const LINKS = [
  { url: "https://www.linkedin.com/in/oscar-ligthart/", icon: faLinkedin, label: "LinkedIn" },
  { url: "https://github.com/OscarLigthart", icon: faGithub, label: "GitHub" },
];

function Social() {
  return (
    <aside className="social">
      {LINKS.map((l) => (
        <a
          key={l.label}
          className="social__link"
          href={l.url}
          target="_blank"
          rel="noreferrer"
          aria-label={l.label}
        >
          <FontAwesomeIcon icon={l.icon} />
        </a>
      ))}
      <span className="social__line" />
    </aside>
  );
}

export default Social;
