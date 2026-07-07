"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP, refreshScrollTrigger } from "@/utils/gsapSetup";
import {
  initHeroReveal,
  initBrandScrollSequence,
  initScrollAnimations,
  initMethodScrollAnimations,
  initExpertiseInteractions,
  initInsightsCardHovers,
  scheduleScrollRefresh,
  SITE_READY_EVENT,
} from "@/utils/landingAnimations";

export default function PageAnimations({ rootRef, onHeroComplete }) {
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      registerGSAP();

      const root = rootRef?.current;
      if (!root) return;

      let teardownInteractions = () => {};
      let teardownHovers = () => {};

      const ctx = gsap.context(() => {
        initHeroReveal(root, () => {
          onHeroComplete?.();
          refreshScrollTrigger();
          window.dispatchEvent(new CustomEvent(SITE_READY_EVENT));
        });
        initBrandScrollSequence(root);
        initScrollAnimations(root);
        initMethodScrollAnimations(root);
        teardownInteractions = initExpertiseInteractions(root);
        teardownHovers = initInsightsCardHovers(root);
        scheduleScrollRefresh();
      }, root);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        teardownInteractions();
        teardownHovers();
        ctx.revert();
      };
    },
    { scope: rootRef, dependencies: [onHeroComplete] },
  );

  return null;
}
