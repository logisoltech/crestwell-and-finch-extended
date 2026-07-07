"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Preloader from "@/components/Preloader";
import PageAnimations from "@/components/PageAnimations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandTransition from "@/components/BrandTransition";
import Philosophy from "@/components/Philosophy";
import Expertise from "@/components/Expertise";
import CrestwellMethod from "@/components/CrestwellMethod";
import WhyChooseUs from "@/components/WhyChooseUs";
import SelectedExperience from "@/components/SelectedExperience";
import LegalDesk from "@/components/LegalDesk";
import Footer from "@/components/Footer";

export default function HomePage() {
  const pageRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (loading) {
      document.body.classList.add("is-loading");
    } else {
      document.body.classList.remove("is-loading");
    }

    return () => {
      document.body.classList.remove("is-loading");
    };
  }, [mounted, loading]);

  useEffect(() => {
    if (!mounted || loading) return;

    if (!heroReady) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }

    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, [mounted, loading, heroReady]);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleHeroComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <>
      {mounted && loading && <Preloader onComplete={handleLoadingComplete} />}
      {mounted && !loading && (
        <>
          <div ref={pageRef} className="home page-content">
            <Navbar />
            <Hero />
            <BrandTransition />
            <Philosophy />
            <Expertise />
            <CrestwellMethod />
            <WhyChooseUs />
            <SelectedExperience />
            <LegalDesk />
            <Footer />
          </div>
          <PageAnimations rootRef={pageRef} onHeroComplete={handleHeroComplete} />
        </>
      )}
    </>
  );
}
