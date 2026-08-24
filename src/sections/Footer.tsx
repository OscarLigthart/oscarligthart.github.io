/**
 *  Footer with contact links.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__name">Oscar Ligthart</p>
        <div className="footer__links">
          <a href="https://www.linkedin.com/in/oscar-ligthart/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
        </div>
        <p className="footer__note">&copy; {new Date().getFullYear()} Oscar Ligthart</p>
      </div>
    </footer>
  );
}

export default Footer;
