"use client";

import { FocusCards } from "@/components/ui/focus-cards";
import { useEffect, useState, useRef } from "react";

export default function FocusCardsDemo() {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "More Bedside Time",
      src: "/walking.mp4",
    },
    {
      title: "Decreased Cognitive Overload",
      src: "/burnout.mp4",
    },
    {
      title: "Robust Legal Protection",
      src: "/legal.mp4",
    },
    {
      title: "Lower Burnout Costs",
      src: "/cost.mp4",
    },
    {
      title: "Higher Patient Care Quality",
      src: "/care.mp4",
    },
    {
      title: "Accelerated Revenue Cycles",
      src: "/coding.mp4",
    },
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === titleRef.current && entry.isIntersecting) {
          setIsTitleVisible(true);
        }
        if (entry.target === cardsRef.current && entry.isIntersecting) {
          setIsCardsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    });

    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div id="nursebenefits" className="w-full"></div>
      <h2 
        ref={titleRef}
        className={`text-3xl md:text-6xl font-semibold text-center mb-20 mt-20 transform transition-all duration-1000 ease-out ${
          isTitleVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0'
        }`}
      >
        How Altrix Benefits our{" "}
        <span 
          className={`text-transparent bg-clip-text bg-gradient-to-r from-[#6677db] to-violet-500 transform transition-all duration-1000 delay-300 ${
            isTitleVisible 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          Nurses
        </span>
      </h2>
      <div 
        ref={cardsRef}
        className={`transform transition-all duration-1000 ease-out delay-500 ${
          isCardsVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-20 opacity-0 scale-95'
        }`}
      >
        <FocusCards cards={cards} />
      </div>
      <div className="bg-white dark:bg-neutral-950 mb-14"></div>
    </>
  );
}