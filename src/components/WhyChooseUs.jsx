"use client";

import { WHY_FEATURES, ATTORNEYS } from "@/data/whyChoose";
import "@/styles/whyChoose.css";

export default function WhyChooseUs() {
  return (
    <section className="why" id="why-choose-us">
      <div className="why__container">
        <div className="why__block why__block--choose">
          <div className="why__eyebrow">
            <span className="why__eyebrow-text">Why Clients Choose Us</span>
            <span className="why__eyebrow-rule" aria-hidden="true" />
          </div>

          <div className="why__features">
            {WHY_FEATURES.map((feature) => (
              <article key={feature.title} className="why__feature">
                <div className="why__feature-visual">
                  <img
                    className="why__feature-image"
                    src={feature.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="why__feature-overlay" aria-hidden="true" />
                  <div className="why__feature-caption">
                    <h3 className="why__feature-title">{feature.title}</h3>
                    <span className="why__feature-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
                <p className="why__feature-text">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <hr className="why__divider" />

        <div className="why__block why__block--people" id="attorneys">
          <div className="why__people-grid">
            <div className="why__people-intro">
              <div className="why__eyebrow">
                <span className="why__eyebrow-text">Our People</span>
                <span className="why__eyebrow-dash" aria-hidden="true">
                  &mdash;
                </span>
              </div>

              <h2 className="why__people-headline">
                <span className="why__people-headline-line" style={{ display: "block" }}>
                  Legal partners built
                </span>
                <span className="why__people-headline-line" style={{ display: "block" }}>
                  around judgment,
                </span>
                <span className="why__people-headline-line" style={{ display: "block" }}>
                  discipline, and
                </span>
                <span className="why__people-headline-line" style={{ display: "block" }}>
                  client trust.
                </span>
              </h2>

              <a href="#attorneys" className="why__people-link">
                <span className="why__people-link-inner">
                  <span className="why__people-link-text">Meet Our Attorneys</span>
                  <span className="why__people-link-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </span>
                <span className="why__people-link-line" aria-hidden="true" />
              </a>
            </div>

            {ATTORNEYS.map((attorney) => (
              <article key={attorney.name} className="why__attorney">
                <div className="why__attorney-visual">
                  <img
                    className="why__attorney-image"
                    src={attorney.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="why__attorney-overlay" aria-hidden="true" />
                  <div className="why__attorney-caption">
                    <div className="why__attorney-caption-text">
                      <h3 className="why__attorney-name">{attorney.name}</h3>
                      <p className="why__attorney-role">{attorney.role}</p>
                    </div>
                    <span className="why__attorney-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </div>
                </div>
                <p className="why__attorney-areas">{attorney.areas}</p>
                <p className="why__attorney-desc">{attorney.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
