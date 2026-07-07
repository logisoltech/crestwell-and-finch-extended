"use client";

import { useState, useCallback } from "react";
import SplitWords from "@/components/SplitWords";
import { EXPERTISE_AREAS } from "@/data/expertise";
import AccordionItem from "@/components/AccordionItem";
import "@/styles/expertise.css";

export default function Expertise() {
  const [openId, setOpenId] = useState(null);
  const [pendingId, setPendingId] = useState(null);

  const handleCloseComplete = useCallback(() => {
    if (pendingId !== null) {
      setOpenId(pendingId);
      setPendingId(null);
    }
  }, [pendingId]);

  const handleToggle = useCallback(
    (id) => {
      if (openId === id) {
        setOpenId(null);
        setPendingId(null);
        return;
      }

      if (openId !== null) {
        setPendingId(id);
        setOpenId(null);
        return;
      }

      setOpenId(id);
    },
    [openId],
  );

  return (
    <section className="expertise" id="practice-areas">
      <div className="expertise__container">
        <div className="expertise__layout">
          <aside className="expertise__left">
            <div className="expertise__left-top">
              <h2 className="expertise__heading">
                <SplitWords
                  text="Domains of Expertise"
                  wordClass="expertise__heading-word"
                />
              </h2>

              <span className="expertise__divider" aria-hidden="true" />

              <p className="expertise__intro">
                Focused legal counsel across high-value personal, commercial,
                and institutional matters.
              </p>
            </div>

            <a href="#all-practice-areas" className="expertise__view-all">
              <span className="expertise__view-all-text">
                View All Practice Areas &#8599;
              </span>
              <span className="expertise__view-all-line" aria-hidden="true" />
            </a>
          </aside>

          <div className="expertise__right">
            {EXPERTISE_AREAS.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={handleToggle}
                onCloseComplete={handleCloseComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
