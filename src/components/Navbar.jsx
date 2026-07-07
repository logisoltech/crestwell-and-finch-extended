"use client";

import "@/styles/navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Practice Areas", href: "#practice-areas" },
  { label: "Attorneys", href: "#attorneys" },
  { label: "Case Results", href: "#case-results" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
  { label: "Book Consultation", href: "#consultation" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-line">Crestwell &amp; Finch</span>
          <span className="navbar__logo-line">Legal</span>
        </a>

        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href + link.label}>
                <a
                  href={link.href}
                  className={
                    link.label === "Book Consultation"
                      ? "navbar__link navbar__cta"
                      : "navbar__link"
                  }
                >
                  {link.label === "Book Consultation" ? (
                    <span className="navbar__cta-text">{link.label}</span>
                  ) : (
                    link.label
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
