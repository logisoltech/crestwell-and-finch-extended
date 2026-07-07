import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power2.out", duration: 0.8 });
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
}

export function scrollOnce(trigger, start = "top 85%") {
  return {
    trigger,
    start,
    end: "bottom 20%",
    toggleActions: "play none none none",
    once: true,
    markers: false,
  };
}

export function scrollFrom(targets, fromVars, trigger, start = "top 85%") {
  return gsap.from(targets, {
    immediateRender: false,
    ...fromVars,
    scrollTrigger: scrollOnce(trigger, start),
  });
}

export function cleanupGSAP(scope) {
  if (typeof window === "undefined") return;

  ScrollTrigger.getAll().forEach((t) => {
    if (!scope) {
      t.kill();
      return;
    }

    const triggerEl = t.trigger;
    if (
      triggerEl === scope ||
      (triggerEl instanceof Element && scope.contains(triggerEl))
    ) {
      t.kill();
    }
  });

  if (scope) {
    gsap.killTweensOf(scope.querySelectorAll("*"));
    gsap.killTweensOf(scope);
  } else {
    gsap.killTweensOf("*");
  }
}

export function refreshScrollTrigger() {
  if (typeof window !== "undefined") {
    ScrollTrigger.refresh();
  }
}

export function bindHoverY(elements, y = -6, duration = 0.3) {
  const items = gsap.utils.toArray(elements);
  const cleanups = items.map((el) => {
    const onEnter = () => {
      gsap.to(el, { y, duration, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(el, { y: 0, duration, ease: "power2.out", overwrite: "auto" });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  });
  return () => cleanups.forEach((fn) => fn());
}

export function withMedia(callback) {
  if (typeof window === "undefined") return () => {};

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => callback(false));
  mm.add("(max-width: 767px)", () => callback(true));

  return () => mm.revert();
}

export function fromVars(reduced, desktop, mobile = { opacity: 0 }) {
  return reduced ? mobile : desktop;
}

export function runAnimations(fn) {
  if (typeof window === "undefined") return () => {};

  registerGSAP();
  const extraCleanup = fn() ?? (() => {});
  refreshScrollTrigger();

  return () => {
    extraCleanup();
    refreshScrollTrigger();
  };
}
