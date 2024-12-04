'use client';

import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import StickyScrollRevealDemo from './Sticky';

const Steps = () => {
  const [isInView, setIsInView] = useState(false);
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setTimeout(() => setShouldRenderSpline(true), 100);
        } else {
          setIsInView(false);
          setTimeout(() => {
            setShouldRenderSpline(false);
            setIsSplineLoaded(false);
          }, 500);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div id='steps' ref={ref} className='w-full min-h-screen bg-black pt-[50vh]'>
      <h1 className='text-6xl font-semibold text-white mb-10 text-center'>
        Natural Implementation at Every Step
      </h1>

      <div className="relative w-full min-h-[800px] h-[calc(100vh-240px)]">
        {/* Placeholder Image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isSplineLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
          <Image
            src="/steps-placeholder.png"
            alt="Steps Preview"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Spline Scene Container */}
        {shouldRenderSpline && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            isSplineLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
            <Spline
              scene="https://prod.spline.design/pXcjy52tWA9zvfgm/scene.splinecode"
              onLoad={() => setIsSplineLoaded(true)}
            />
          </div>
        )}
      </div>
      <div className='w-full h-[200vh] mt-32'>
        <StickyScrollRevealDemo />
      </div>
    </div>
  );
};

export default Steps;