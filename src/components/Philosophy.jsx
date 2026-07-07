import "@/styles/philosophy.css";

const SERVICES = [
  {
    num: "01",
    title: "Consultation",
    text: "In-depth analysis of your legal standing, risks, obligations, and immediate options.",
    image: "/service-consultation.jpg",
  },
  {
    num: "02",
    title: "Strategy",
    text: "Bespoke legal roadmaps designed for personal, commercial, and high-stakes outcomes.",
    image: "/service-strategy.jpg",
  },
  {
    num: "03",
    title: "Review",
    text: "Detailed examination of contracts, agreements, documents, claims, and legal exposure.",
    image: "/service-review.jpg",
  },
  {
    num: "04",
    title: "Representation",
    text: "Focused advocacy in negotiations, disputes, filings, arbitration, and litigation.",
    image: "/service-representation.jpg",
  },
];

export default function Philosophy() {
  return (
    <section className="philosophy" id="about">
      <div className="philosophy__container">
        <div className="philosophy__top">
          <div className="philosophy__left">
            <div className="philosophy__eyebrow">
              <span className="philosophy__eyebrow-text">Our Philosophy</span>
              <span className="philosophy__eyebrow-dash" aria-hidden="true">
                —
              </span>
              <span className="philosophy__eyebrow-rule" aria-hidden="true" />
            </div>

            <h2 className="philosophy__headline">
              <span className="philosophy__headline-line">
                Strong counsel does
              </span>
              <span className="philosophy__headline-line">not</span>
              <span className="philosophy__headline-line">
                come from saying
              </span>
              <span className="philosophy__headline-line">more.</span>
              <span className="philosophy__headline-line">
                It comes from knowing
              </span>
              <span className="philosophy__headline-line">what matters.</span>
            </h2>
          </div>

          <div className="philosophy__right">
            <div className="philosophy__visual">
              <img
                className="philosophy__visual-image"
                src="/pen.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <hr className="philosophy__divider" />

        <div className="philosophy__services">
          <div className="philosophy__services-eyebrow">
            <span className="philosophy__eyebrow-text">What We Do</span>
            <span className="philosophy__eyebrow-dash" aria-hidden="true">
              —
            </span>
            <span className="philosophy__eyebrow-rule" aria-hidden="true" />
          </div>

          <div className="philosophy__grid">
            {SERVICES.map((service) => (
              <article key={service.num} className="philosophy__service">
                <div className="philosophy__service-media">
                  <img
                    className="philosophy__service-image"
                    src={service.image}
                    alt=""
                  />
                </div>
                <span className="philosophy__service-num">{service.num}</span>
                <h3 className="philosophy__service-title">{service.title}</h3>
                <p className="philosophy__service-text">{service.text}</p>
                <span className="philosophy__service-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
