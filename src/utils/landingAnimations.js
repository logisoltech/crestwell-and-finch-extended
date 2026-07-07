import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshScrollTrigger } from "@/utils/gsapSetup";

export const SITE_READY_EVENT = "site:ready";

const SECTION_SELECTORS = [
  ".philosophy",
  ".expertise",
  ".why",
  ".experience",
  ".legal-desk",
  "footer.footer",
].join(", ");

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;

  refreshScrollTrigger();
  window.addEventListener("load", () => refreshScrollTrigger(), { once: true });
  setTimeout(() => refreshScrollTrigger(), 500);
}

export function clearStuckStyles(root) {
  if (!root) return;

  gsap.set(root, { opacity: 1, visibility: "visible", clearProps: "opacity,visibility,transform,filter" });
  gsap.set(
    root.querySelectorAll(
      "section, footer, .navbar, .hero, .hero__eyebrow, .hero__title-line, .hero__paragraph, .hero__btn-primary, .hero__link-secondary, .navbar__link",
    ),
    { clearProps: "opacity,visibility,transform,filter,y,x,scale,rotate" },
  );
}

export function initHeroReveal(pageContent, onComplete) {
  if (!pageContent) return;

  clearStuckStyles(pageContent);

  const navbar = pageContent.querySelector(".navbar");
  const hero = pageContent.querySelector(".hero");
  const eyebrow = pageContent.querySelector(".hero__eyebrow");
  const titleLines = pageContent.querySelectorAll(".hero__title-line");
  const paragraphs = pageContent.querySelectorAll(".hero__paragraph");
  const ctas = pageContent.querySelectorAll(".hero__btn-primary, .hero__link-secondary");

  gsap.set(pageContent, { opacity: 1, visibility: "visible" });

  if (hero) gsap.set(hero, { opacity: 0, y: 40, visibility: "visible" });
  if (navbar) gsap.set(navbar, { opacity: 0, y: -30, visibility: "visible" });
  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 40, visibility: "visible" });
  gsap.set(titleLines, { opacity: 0, y: 80, visibility: "visible" });
  gsap.set(paragraphs, { opacity: 0, y: 30, visibility: "visible" });
  gsap.set(ctas, { opacity: 0, y: 30, visibility: "visible" });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set([hero, navbar, eyebrow, ...titleLines, ...paragraphs, ...ctas], {
        clearProps: "opacity,transform,filter,y",
      });
      onComplete?.();
    },
  });

  if (navbar) {
    tl.to(navbar, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" }, 0);
  }

  if (hero) {
    tl.to(hero, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 0.05);
  }

  if (eyebrow) {
    tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" }, 0.28);
  }

  if (titleLines.length) {
    tl.to(
      titleLines,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      },
      0.38,
    );
  }

  if (paragraphs.length) {
    tl.to(
      paragraphs,
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
      0.72,
    );
  }

  if (ctas.length) {
    tl.to(
      ctas,
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" },
      0.92,
    );
  }
}

export function initBrandScrollSequence(root) {
  const brand = root.querySelector(".brand");
  if (!brand) return;

  const center = brand.querySelector(".brand-center-heading");
  const left = brand.querySelector(".brand-left-label");
  const right = brand.querySelector(".brand-right-label");

  if (!center || !left || !right) return;

  const isMobile = window.matchMedia("(max-width: 900px)").matches;

  if (isMobile) {
    gsap.set([center, left, right, brand], {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clearProps: "height,minHeight,transform,filter",
    });
    return;
  }

  const naturalHeight = brand.offsetHeight;

  gsap.set(brand, {
    opacity: 1,
    visibility: "visible",
    height: naturalHeight,
    minHeight: naturalHeight,
    width: "100%",
    overflow: "hidden",
  });
  gsap.set(left, { opacity: 0, x: -150, visibility: "visible" });
  gsap.set(right, { opacity: 0, x: 150, visibility: "visible" });
  gsap.set(center, { opacity: 0, y: 80, scale: 0.9, visibility: "visible" });

  const expandToFullscreen = () => {
    gsap.set(brand, { height: "100vh", minHeight: "100vh" });
  };

  const resetHeight = () => {
    gsap.set(brand, { height: naturalHeight, minHeight: naturalHeight });
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: brand,
      start: "top top",
      end: "+=275%",
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      pinSpacing: true,
      onEnter: expandToFullscreen,
      onEnterBack: expandToFullscreen,
      onLeave: () => {
        gsap.set(brand, { clearProps: "height,minHeight" });
      },
      onLeaveBack: resetHeight,
    },
  });

  tl.to(
    center,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    },
    0,
  );

  tl.to({}, { duration: 0.45 });

  tl.to(center, {
    scale: 0.92,
    duration: 0.85,
    ease: "power1.inOut",
  });

  tl.to(
    left,
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.55",
  );

  tl.to({}, { duration: 0.4 });

  tl.to(
    right,
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.1",
  );

  tl.to({}, { duration: 0.55 });
}

function getMethodRowBackground(item, state) {
  const isLight = item.classList.contains("method-item--light");

  if (state === "active") {
    return "rgba(255, 255, 255, 0.11)";
  }

  if (state === "past") {
    return isLight ? "rgba(255, 255, 255, 0.025)" : "rgba(255, 255, 255, 0.045)";
  }

  return isLight ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.06)";
}

function setMethodRowState(item, state) {
  const inner = item.querySelector(".method-row__inner");
  const row = item.querySelector(".method-row");
  if (!inner || !row) return;

  if (state === "active") {
    gsap.to(inner, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(row, {
      backgroundColor: getMethodRowBackground(item, "active"),
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    return;
  }

  if (state === "past") {
    gsap.to(inner, {
      opacity: 0.7,
      filter: "blur(0px)",
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(row, {
      backgroundColor: getMethodRowBackground(item, "past"),
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
    return;
  }

  gsap.to(inner, {
    opacity: 0.4,
    filter: "blur(12px)",
    scale: 0.98,
    y: 40,
    duration: 0.8,
    ease: "power3.out",
    overwrite: "auto",
  });
  gsap.to(row, {
    backgroundColor: getMethodRowBackground(item, "future"),
    duration: 0.8,
    ease: "power3.out",
    overwrite: "auto",
  });
}

export function initMethodScrollAnimations(root) {
  const section = root.querySelector(".method");
  if (!section) return;

  const items = gsap.utils.toArray(section.querySelectorAll(".method-item"));
  if (!items.length) return;

  const isMobile = window.matchMedia("(max-width: 1100px)").matches;

  if (isMobile) {
    items.forEach((item) => {
      const inner = item.querySelector(".method-row__inner");
      if (inner) {
        gsap.set(inner, { opacity: 1, filter: "none", scale: 1, y: 0, clearProps: "all" });
      }
    });
    return;
  }

  items.forEach((item) => {
    const inner = item.querySelector(".method-row__inner");
    if (inner) {
      gsap.set(inner, { opacity: 0.4, filter: "blur(12px)", scale: 0.98, y: 40 });
    }
  });

  const activateRow = (activeIndex) => {
    items.forEach((item, index) => {
      if (index < activeIndex) {
        setMethodRowState(item, "past");
      } else if (index === activeIndex) {
        setMethodRowState(item, "active");
      } else {
        setMethodRowState(item, "future");
      }
    });
  };

  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: "center center",
      end: "center center",
      onEnter: () => activateRow(index),
      onEnterBack: () => activateRow(index),
    });
  });
}

export function initScrollAnimations(root) {
  if (!root) return;

  gsap.utils.toArray(root.querySelectorAll(SECTION_SELECTORS)).forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 80,
      filter: "blur(10px)",
      duration: 0.9,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const philosophyGrid = root.querySelector(".philosophy__grid");
  if (philosophyGrid) {
    gsap.from(philosophyGrid.querySelectorAll(".philosophy__service"), {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: philosophyGrid,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const chooseBlock = root.querySelector(".why__block--choose");
  if (chooseBlock) {
    gsap.from(chooseBlock.querySelectorAll(".why__feature"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: chooseBlock,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const peopleGrid = root.querySelector(".why__people-grid");
  if (peopleGrid) {
    gsap.from(peopleGrid.querySelectorAll(".why__attorney"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: peopleGrid,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const experienceCards = root.querySelector(".experience__cards");
  if (experienceCards) {
    gsap.from(experienceCards.querySelectorAll(".experience__card"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: experienceCards,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  initExpertiseScrollAnimations(root);
}

function initExpertiseScrollAnimations(root) {
  const section = root.querySelector(".expertise");
  if (!section) return;

  const leftTop = section.querySelector(".expertise__left-top");
  if (leftTop) {
    gsap.from(leftTop.querySelectorAll(".expertise__heading-word"), {
      opacity: 0,
      y: 50,
      duration: 0.9,
      stagger: 0.1,
      ease: "power4.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: leftTop,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }

  const right = section.querySelector(".expertise__right");
  if (right) {
    gsap.from(right.querySelectorAll(".expertise-item"), {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: right,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }
}

export function initExpertiseInteractions(root) {
  if (!root) return () => {};

  const cleanups = [];

  root.querySelectorAll(".expertise-row").forEach((row) => {
    const icon = row.querySelector(".expertise-row__icon");
    const item = row.closest(".expertise-item");

    const onEnter = () => {
      gsap.to(icon, { rotation: 45, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      gsap.to(row, { backgroundColor: "#fcfcfc", duration: 0.3, overwrite: "auto" });
    };

    const onLeave = () => {
      const isOpen = item?.classList.contains("expertise-item--open");
      gsap.to(icon, {
        rotation: isOpen ? 45 : 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(row, {
        backgroundColor: isOpen ? "#fcfcfc" : "transparent",
        duration: 0.3,
        overwrite: "auto",
      });
    };

    row.addEventListener("mouseenter", onEnter);
    row.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      row.removeEventListener("mouseenter", onEnter);
      row.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function initInsightsCardHovers(root) {
  if (!root) return () => {};

  const cleanups = [];

  root.querySelectorAll(".insights__card").forEach((card) => {
    const onEnter = () => {
      gsap.to(card, {
        y: -5,
        boxShadow: "0 12px 32px rgba(17, 17, 17, 0.08)",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "none",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function onSiteReady(callback) {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback();
  window.addEventListener(SITE_READY_EVENT, handler);

  return () => window.removeEventListener(SITE_READY_EVENT, handler);
}
