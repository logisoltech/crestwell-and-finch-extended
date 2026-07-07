import {
  FOOTER_PRACTICES,
  FOOTER_RESOURCES,
  FOOTER_ABOUT,
  FOOTER_LOCATIONS,
} from "@/data/footer";
import "@/styles/footer.css";

function FooterColumn({ title, links }) {
  return (
    <div className="footer__col">
      <span className="footer__col-rule" aria-hidden="true" />
      <h3 className="footer__col-title">{title}</h3>
      <ul className="footer__col-list">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="footer__col-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <span className="footer__logo-line">Crestwell &amp; Finch</span>
              <span className="footer__logo-line">Legal</span>
            </a>

            <p className="footer__tagline">
              Moving Legal Matters with Precision.
            </p>

            <ul className="footer__locations">
              {FOOTER_LOCATIONS.map((location) => (
                <li key={location}>{location}</li>
              ))}
            </ul>

            <div className="footer__social">
              <a
                href="#linkedin"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="1" fill="currentColor" />
                  <path
                    d="M7 10v7H5v-7h2zm1-3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 10h2v1c.3-.6 1-1.2 2.1-1.2 2.2 0 2.6 1.4 2.6 3.3v3.9h-2v-3.5c0-.8 0-1.9-1.2-1.9s-1.4.9-1.4 1.8V17H9v-7z"
                    fill="#f7f5f1"
                  />
                </svg>
              </a>

              <a
                href="#twitter"
                className="footer__social-link"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="mailto:contact@crestwellfinch.com"
                className="footer__social-link"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm1 2v.01L12 13l7-4.99V8H5z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Legal Practices" links={FOOTER_PRACTICES} />
          <FooterColumn title="Resources" links={FOOTER_RESOURCES} />
          <FooterColumn title="About Us" links={FOOTER_ABOUT} />
        </div>

        <div className="footer__bar">
          <div className="footer__bar-left">
            <p className="footer__copyright">
              &copy; 2024 Crestwell &amp; Finch Legal. All Rights Reserved.
            </p>

            <a
              // href="https://github.com/AhadStudios"
              className="footer__credit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <span className="footer__credit-text">build by @AhadStudios</span> */} <br />
              <span className="footer__credit-line" aria-hidden="true" />
            </a>
          </div>

          <div className="footer__legal">
            <span className="footer__legal-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" fill="#111" />
                <path d="M16 1v30M1 16h30" stroke="#f7f5f1" strokeWidth="1" />
                <path d="M16 1a15 15 0 0 1 0 30" fill="#f7f5f1" />
              </svg>
            </span>

            <div className="footer__legal-links">
              <a href="#credits" className="footer__legal-link">
                Website Credits
              </a>
              <a href="#terms" className="footer__legal-link">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
