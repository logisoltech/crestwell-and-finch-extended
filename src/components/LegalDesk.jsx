import SplitWords from "@/components/SplitWords";
import { CLIENT_ACCESS_FEATURES, INSIGHTS } from "@/data/legalDesk";
import "@/styles/legalDesk.css";

export default function LegalDesk() {
  return (
    <section className="legal-desk" id="legal-desk">
      <div className="legal-desk__container">
        <div className="client-access">
          <div className="legal-desk__eyebrow">
            <span className="legal-desk__eyebrow-text">Client Access</span>
            <span className="legal-desk__eyebrow-dash" aria-hidden="true">
              &mdash;
            </span>
          </div>

          <div className="client-access__body">
            <h2 className="client-access__heading">
              Secure legal communication, without unnecessary friction.
            </h2>

            <div className="client-access__right">
              <p className="client-access__text">
                Clients can submit documents, review updates, communicate with
                the legal team, and schedule consultations through a secure
                digital portal.
              </p>

              <div className="client-access__features">
                {CLIENT_ACCESS_FEATURES.map((feature) => (
                  <span key={feature} className="client-access__feature">
                    {feature}
                  </span>
                ))}

                <a href="#client-portal" className="client-access__portal">
                  <span className="client-access__portal-text">
                    Access Client Portal
                  </span>
                  <span className="client-access__portal-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                  <span className="client-access__portal-line" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="legal-desk__divider" />

        <div className="legal-desk__split">
          <div className="client-note">
            <div className="legal-desk__eyebrow">
              <span className="legal-desk__eyebrow-text">Client Note</span>
              <span className="legal-desk__eyebrow-dash" aria-hidden="true">
                &mdash;
              </span>
            </div>

            <blockquote className="client-note__quote">
              <span className="client-note__mark" aria-hidden="true">
                &ldquo;
              </span>
              They brought the restraint, clarity, and strategic pressure we
              needed.&rdquo;
            </blockquote>

            <div className="client-note__author">
              <p className="client-note__name">Robert Sterling</p>
              <p className="client-note__role">Private Client</p>
            </div>
          </div>

          <div className="insights" id="insights">
            <div className="insights__header">
              <a href="#insights" className="insights__label">
                From Our Legal Desk &#8594;
              </a>

              <a href="#read-insights" className="insights__link">
                <span className="insights__link-text">Read Insights</span>
                <span className="insights__link-arrow" aria-hidden="true">
                  &#8599;
                </span>
                <span className="insights__link-line" aria-hidden="true" />
              </a>
            </div>

            <h2 className="insights__heading">
              Practical thinking for complex legal decisions.
            </h2>

            <div className="insights__cards">
              {INSIGHTS.map((item) => (
                <article key={item.id} className="insights__card">
                  <span className="insights__card-meta">
                    {item.id} {item.category}
                  </span>
                  <h3 className="insights__card-title">{item.title}</h3>
                  <p className="insights__card-desc">{item.description}</p>
                  <span className="insights__card-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>

        <hr className="legal-desk__divider" />

        <div className="legal-desk__cta" id="consultation">
          <h2 className="legal-desk__cta-heading">
            <SplitWords
              text="Let's make the legal path easier to understand."
              wordClass="legal-desk__cta-word"
            />
          </h2>

          <div className="legal-desk__cta-action">
            <a href="#consultation" className="legal-desk__cta-button">
              <span>Discuss The Matter</span>
              <span aria-hidden="true">&#8599;</span>
            </a>
            <p className="legal-desk__cta-note">
              Confidential consultation available by appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
