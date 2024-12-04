'use client';

import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const SplineComponent = () => {
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
    <div ref={ref} className='relative w-full min-h-screen pb-20'> {/* Added padding bottom */}
      <h1 className='font-semibold mb-20 text-6xl mt-20 text-center'>
        Energize your{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500'>
          EHR System
        </span>{' '}
        with Altrix
      </h1>

      <div className="relative w-full min-h-[800px] h-[calc(100vh-240px)]"> {/* Dynamic height calculation */}
        {/* Placeholder Image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isSplineLoaded ? 'opacity-0' : 'opacity-100'
        }`}>
          <Image
            src="/placeholder-scene.png"
            alt="3D Scene Placeholder"
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
              scene="https://prod.spline.design/HPdEZkNyA5oFnrdi/scene.splinecode"
              onLoad={() => setIsSplineLoaded(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineComponent;