"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { registerGSAP } from "@/utils/gsapSetup";
import "@/styles/navbar.css";

export default function Preloader({ onComplete }) {
  const introRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    registerGSAP();

    const intro = introRef.current;
    const text = textRef.current;
    if (!intro || !text) return;

    const ctx = gsap.context(() => {
      gsap.set(text, { opacity: 0, y: 40 });

      gsap
        .timeline()
        .to(text, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
        .to({}, { duration: 0.6 })
        .to(text, {
          opacity: 0,
          y: -40,
          scale: 0.98,
          duration: 0.7,
          ease: "power3.in",
        })
        .to(
          intro,
          {
            opacity: 0,
            scale: 1.04,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete?.();
            },
          },
          "-=0.1",
        );
    }, intro);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={introRef}
      className="intro"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#050505",
        pointerEvents: "all",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <h1
        ref={textRef}
        className="navbar__logo intro__title"
        style={{
          color: "#ffffff",
          fontSize: "clamp(72px, 8vw, 140px)",
          lineHeight: 0.9,
          textAlign: "center",
          maxWidth: "90vw",
          textDecoration: "none",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        Crestwell &amp; Finch Legal
      </h1>
    </div>
  );
}
