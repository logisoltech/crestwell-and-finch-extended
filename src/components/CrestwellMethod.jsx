"use client";

import { useState, useCallback } from "react";
import { METHOD_STEPS } from "@/data/method";
import MethodRow from "@/components/MethodRow";
import "@/styles/method.css";

const ROW_TONES = ["light", "dark", "light", "dark"];

export default function CrestwellMethod() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = useCallback((id) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section className="method method-section" id="crestwell-method">
      <div className="method__inner">
        <aside className="method__left">
          <div className="method__left-bg" aria-hidden="true">
            <img
              className="method__left-bg-image"
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=85&auto=format&fit=crop"
              alt=""
            />
            <div className="method__left-bg-overlay" />
          </div>
          <div className="method__left-texture" aria-hidden="true" />
          <div className="method__left-content">
            <span className="method__left-rule" aria-hidden="true" />

            <h2 className="method__heading">
              <span className="method__heading-line">Crestwell</span>
              <span className="method__heading-line">Method</span>
            </h2>

            <p className="method__description">
              A disciplined approach to
              <br />
              solving complex legal matters.
            </p>
          </div>
        </aside>

        <div className="method__right">
          {METHOD_STEPS.map((step, index) => (
            <MethodRow
              key={step.id}
              step={step}
              tone={ROW_TONES[index]}
              isOpen={openId === step.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
