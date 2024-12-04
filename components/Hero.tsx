"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // Make sure to install next-themes if you haven't
import Link from 'next/link';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setIsImageVisible(true), 600);
  }, []);

  return (
    <div className="pt-32 pb-32 min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col items-center justify-center relative px-4 transition-all duration-300">
      {/* Background Grid with Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-50 dark:opacity-100 transition-opacity"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(102, 119, 219, 0.1), transparent 50%),
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '1200px 1200px, 80px 80px, 80px 80px',
          backgroundPosition: '50% 50%, 0 0, 0 0',
          backgroundRepeat: 'no-repeat, repeat, repeat'
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, 
              rgba(102, 119, 219, 0.1) 0%, 
              transparent 50%
            )
          `,
          animation: 'pulse 8s infinite'
        }}
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Content */}
        <div className={`space-y-8 text-center transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Main Heading */}
          <h1 className="text-4xl md:text-7xl font-bold">
            Your Nursing Station
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6677db] to-violet-500">
              On Auto-Pilot
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Save nurses 3 hours a day on administrative tasks
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Link href={"/waitlist"}>
            <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Request Demo
            </button>
            </Link>
            <Link href={"/whitepaper"}>
            <button className="border border-gray-200 dark:border-white/20 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center gap-2">
              Watch Overview
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className={`mt-16 transform transition-all duration-1000 ease-out ${
            isImageVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}>
            <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6677db] to-violet-500 opacity-20 blur-2xl" />
              <div className="dark:hidden relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200/50 dark:border-white/10">
                <Image
                  src="/queue_light.png"
                  alt="Altrix Platform Interface - Light Mode"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
              <div className="hidden dark:block relative w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200/50 dark:border-white/10">
                <Image
                  src="/queue_dark.png"
                  alt="Altrix Platform Interface - Dark Mode"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;