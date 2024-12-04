'use client';

import React, { useEffect, useRef, useState } from 'react';

const ScrollTransitionContainerReverse = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      // Get the section's position and dimensions
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate the scroll percentage within this section
      let scrolled = 0;
      
      if (sectionTop <= 0) {
        scrolled = Math.min(Math.abs(sectionTop) / (sectionHeight - windowHeight), 1);
      }
      
      setScrollPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id='invert' ref={sectionRef} className="relative h-[200vh]"> {/* Section height */}
      {/* Background transition layer - constrained to this section */}
      <div 
        className="sticky top-0 h-screen w-full pointer-events-none transition-colors duration-300"
        style={{
          backgroundColor: `rgb(${Math.round(scrollPercentage*1.5 * 255)}, ${Math.round(scrollPercentage*1.5 * 255)}, ${Math.round(scrollPercentage*1.5 * 255)})`
        }}
      />
      
      {/* Content */}
    </div>
  );
};

export default ScrollTransitionContainerReverse;