"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { registerGSAP } from "@/utils/gsapSetup";

export default function AccordionItem({
  item,
  isOpen,
  onToggle,
  onCloseComplete,
}) {
  const itemRef = useRef(null);
  const panelRef = useRef(null);
  const panelInnerRef = useRef(null);
  const iconRef = useRef(null);
  const wasOpenRef = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = itemRef.current;
    const panel = panelRef.current;
    const inner = panelInnerRef.current;
    const icon = iconRef.current;
    if (!container || !panel || !inner || !icon) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      if (isOpen) {
        wasOpenRef.current = true;
        gsap.killTweensOf([panel, inner, icon]);

        gsap.set(panel, { height: 0, overflow: "hidden" });
        gsap.set(inner, { opacity: 0, y: 20 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(icon, { rotation: 45, duration: 0.6 }, 0);
        tl.to(panel, { height: "auto", duration: 0.6 }, 0);
        tl.to(inner, { opacity: 1, y: 0, duration: 0.6 }, 0.05);
      } else if (wasOpenRef.current) {
        gsap.killTweensOf([panel, inner, icon]);

        gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            wasOpenRef.current = false;
            gsap.set(icon, { clearProps: "transform" });
            onCloseComplete?.();
          },
        })
          .to(inner, { opacity: 0, y: 20, duration: 0.45 }, 0)
          .to(panel, { height: 0, duration: 0.6 }, 0.05)
          .to(icon, { rotation: 0, duration: 0.6 }, 0);
      }
    }, container);

    return () => ctx.revert();
  }, [isOpen, onCloseComplete]);

  return (
    <div
      ref={itemRef}
      className={`expertise-item${isOpen ? " expertise-item--open" : ""}`}
      style={{ position: "relative" }}
    >
      <span
        className="expertise-row__border"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "#dddddd",
          transformOrigin: "left center",
          pointerEvents: "none",
        }}
      />

      <button
        type="button"
        className="expertise-row"
        aria-expanded={isOpen}
        onClick={() => onToggle(item.id)}
      >
        <span className="expertise-row__media" aria-hidden="true">
          <img
            className="expertise-row__image"
            src={item.image}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className="expertise-row__media-fade" />
        </span>
        <span className="expertise-row__num">{item.id}</span>
        <span className="expertise-row__title">{item.title}</span>
        <span className="expertise-row__desc">{item.description}</span>
        <span className="expertise-row__icon" ref={iconRef} aria-hidden="true">
          +
        </span>
      </button>

      <div className="expertise-panel" ref={panelRef}>
        <div className="expertise-panel__inner" ref={panelInnerRef}>
          <p className="expertise-panel__text">{item.expanded}</p>
          <a href={item.href} className="expertise-panel__link">
            Learn More &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
