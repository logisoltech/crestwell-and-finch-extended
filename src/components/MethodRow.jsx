"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { registerGSAP } from "@/utils/gsapSetup";

function getDefaultRowBg(tone) {
  return tone === "light" ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.06)";
}

export default function MethodRow({ step, tone, isOpen, onToggle }) {
  const itemRef = useRef(null);
  const rowRef = useRef(null);
  const panelRef = useRef(null);
  const panelInnerRef = useRef(null);
  const iconRef = useRef(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = itemRef.current;
    const row = rowRef.current;
    const panel = panelRef.current;
    const inner = panelInnerRef.current;
    const icon = iconRef.current;
    if (!container || !row || !panel || !inner || !icon) return;

    registerGSAP();

    const defaultBg = getDefaultRowBg(tone);
    const hoverBg = "rgba(255, 255, 255, 0.11)";

    const onEnter = () => {
      if (isOpen) return;
      gsap.to(icon, {
        rotation: 45,
        scale: 1.12,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(row, {
        backgroundColor: hoverBg,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      if (isOpen) return;
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(row, {
        backgroundColor: defaultBg,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    const ctx = gsap.context(() => {
      if (isOpen) {
        wasOpenRef.current = true;
        gsap.killTweensOf([panel, inner, icon]);

        gsap.set(panel, { height: 0, overflow: "hidden" });
        gsap.set(inner, { opacity: 0, y: 16 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(icon, { rotation: 45, scale: 1.12, duration: 0.45 }, 0)
          .to(row, { backgroundColor: hoverBg, duration: 0.45 }, 0)
          .to(panel, { height: "auto", duration: 0.65 }, 0)
          .to(inner, { opacity: 1, y: 0, duration: 0.55 }, 0.1);
      } else if (wasOpenRef.current) {
        gsap.killTweensOf([panel, inner, icon]);

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              wasOpenRef.current = false;
              gsap.set(icon, { clearProps: "transform" });
            },
          })
          .to(inner, { opacity: 0, y: 16, duration: 0.4 }, 0)
          .to(panel, { height: 0, duration: 0.6 }, 0.05)
          .to(icon, { rotation: 0, scale: 1, duration: 0.45 }, 0)
          .to(row, { backgroundColor: defaultBg, duration: 0.45 }, 0);
      }
    }, container);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, [isOpen, tone]);

  return (
    <article
      ref={itemRef}
      className={`method-item method-item--${tone}${isOpen ? " method-item--open" : ""}`}
      data-method-row
    >
      <div className="method-row" ref={rowRef}>
        <div className="method-row__inner">
          <span className="method-row__num">{step.id}</span>
          <h3 className="method-row__title">{step.title}</h3>
          <p className="method-row__desc">{step.description}</p>
          <button
            type="button"
            className="method-row__icon"
            ref={iconRef}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Close" : "Expand"} ${step.title}`}
            onClick={() => onToggle(step.id)}
          >
            +
          </button>
        </div>
      </div>

      <div className="method-panel" ref={panelRef}>
        <div className="method-panel__inner" ref={panelInnerRef}>
          <p className="method-panel__text">{step.expanded}</p>
        </div>
      </div>
    </article>
  );
}
