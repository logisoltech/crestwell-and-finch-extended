import { EXPERIENCE_ITEMS } from "@/data/experience";
import "@/styles/experience.css";

export default function SelectedExperience() {
  return (
    <section className="experience" id="selected-experience">
      <div className="experience__container">
        <header className="experience__header">
          <a href="#experience" className="experience__label">
            Selected Experience &#8594;
          </a>

          <p className="experience__disclaimer">
            Past results do not guarantee future outcomes. Every matter depends
            on its own facts and circumstances.
          </p>
        </header>

        <div className="experience__main" id="case-results">
          <div className="experience__left">
            <span className="experience__rule" aria-hidden="true" />

            <h2 className="experience__headline">
              <span className="experience__headline-line" style={{ display: "block" }}>
                Measured
              </span>
              <span className="experience__headline-line" style={{ display: "block" }}>
                outcomes.
              </span>
              <span className="experience__headline-line" style={{ display: "block" }}>
                Quiet execution.
              </span>
            </h2>
          </div>

          <div className="experience__right">
            <div className="experience__cards">
              {EXPERIENCE_ITEMS.map((item) => (
                <article key={item.id} className="experience__card">
                  <div className="experience__card-media">
                    <img
                      className="experience__card-image"
                      src={item.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="experience__card-num">{item.id}</span>
                  <h3 className="experience__card-title">{item.title}</h3>
                  <span className="experience__card-rule" aria-hidden="true" />
                  <p className="experience__card-desc">{item.description}</p>
                  <span className="experience__card-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </article>
              ))}
            </div>

            <footer className="experience__footer">
              <a href="#case-results" className="experience__footer-link">
                <span className="experience__footer-link-text">
                  View Case Results
                </span>
                <span className="experience__footer-link-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </a>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
