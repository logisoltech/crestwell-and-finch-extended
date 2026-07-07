import SplitWords from "@/components/SplitWords";
import "@/styles/hero.css";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img className="hero__bg-image" src="/workwithus.png" alt="" />
      </div>
      <div className="hero__container">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-text">
            Legal Counsel for Complex Matters
          </span>
          <span className="hero__eyebrow-dash" aria-hidden="true">
            —
          </span>
          <span className="hero__eyebrow-rule" aria-hidden="true" />
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <SplitWords text="Moving Legal" wordClass="hero__word" />
          </span>
          <span className="hero__title-line">
            <SplitWords text="Matters With" wordClass="hero__word" />
          </span>
          <span className="hero__title-line">
            <SplitWords text="Precision." wordClass="hero__word" />
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__paragraph">
            We help individuals, families, founders, executives, and businesses
            navigate high-stakes legal decisions with clarity.
          </p>

          <p className="hero__paragraph">
            No noise. No confusion. Just rigorous legal thinking, structured
            strategy, and decisive execution.
          </p>

          <div className="hero__actions">
            <a href="#consultation" className="hero__btn-primary">
              <span className="hero__btn-primary-text">Book a Consultation</span>
              <ArrowIcon className="hero__btn-primary-arrow" />
            </a>

            <a href="#practice-areas" className="hero__link-secondary">
              <span className="hero__link-secondary-inner">
                <span className="hero__link-secondary-text">
                  Explore Practice Areas
                </span>
                <ArrowIcon className="hero__link-secondary-arrow" />
              </span>
              <span className="hero__link-secondary-line" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
