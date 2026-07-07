import "@/styles/brand.css";

export default function BrandTransition() {
  return (
    <section className="brand brand-section" aria-label="Brand transition">
      <div className="brand__bg" aria-hidden="true">
        <img className="brand__bg-image" src="/shadowy.png" alt="" />
      </div>
      <div className="brand__texture" aria-hidden="true" />
      <div className="brand__vignette" aria-hidden="true" />

      <div className="brand__inner">
        <div className="brand__side brand__side--left brand-left-label">
          <p className="brand__label">
            <span className="brand__label-line">Crestwell</span>
            <span className="brand__label-line">&amp;</span>
            <span className="brand__label-line">Finch</span>
            <span className="brand__label-line">Legal</span>
          </p>
          <span className="brand__divider" aria-hidden="true" />
        </div>

        <h2 className="brand__logo brand-center-heading">
          <span className="brand__logo-line">Crestwell &amp; </span>
          <span className="brand__logo-line"> Finch Legal</span>
        </h2>

        <div className="brand__side brand__side--right brand-right-label">
          <p className="brand__label">
            <span className="brand__label-line">Strategic</span>
            <span className="brand__label-line">Legal</span>
            <span className="brand__label-line">Counsel</span>
          </p>
          <span className="brand__divider" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
