'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const ScrollControlledVideo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const totalFrames = 224;

  useEffect(() => {
    const preloadImages = async () => {
      const loadedFrames = [];
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i.toString().padStart(4, '0')}.jpg`;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        loadedFrames.push(img);
      }
      setFrames(loadedFrames);
      setIsLoading(false);
    };

    preloadImages().catch(error => console.error('Error loading frames:', error));
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollPosition = window.scrollY;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(scrollPosition / containerHeight, 0), 1);
    
    const frameIndex = Math.min(
      Math.floor(scrollProgress * totalFrames),
      totalFrames - 1
    );
    
    setCurrentFrame(frameIndex);

    // Update CSS variable for fade effect
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
  }, [totalFrames]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || frames.length === 0) return;

    const img = frames[currentFrame];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [currentFrame, frames]);

  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading frames...</div>;
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 w-full h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-neutral-950 transition-opacity duration-300" 
             style={{ opacity: 'max(0, min(1, (var(--scroll-progress) - 0.5) * 5))' }} />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: 'min(1, max(0, 1 - (var(--scroll-progress) - 0.5) * 5))' }}
        />
      </div>
    </div>
  );
};

export default ScrollControlledVideo;