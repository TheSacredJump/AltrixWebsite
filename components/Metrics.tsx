"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FeaturesSectionDemo() {
    const features = [
      {
        title: "Integrated Into Your EHR",
        description:
          "Our middleware drives deep integration with major EHRs like Epic, Cerner, & Athena, as well as homegrown systems of record.",
        skeleton: <SkeletonOne />,
        className:
          "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
      },
      {
        title: "Trusted, Verifiable in Real-Time",
        description:
          "With visibility into the source of AI generation, nurses can seamlessly trace data point to its original location.",
        skeleton: <SkeletonTwo />,
        className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
      },
      {
        title: "Onsite Support and Implementation Suite",
        description:
          "Go live in 2 - 4 weeks. Through the support of our engineers, we're on call 24/7 for both nurse managers and IT teams.",
        skeleton: <SkeletonThree />,
        className:
          "col-span-1 lg:col-span-3 lg:border-r dark:border-neutral-800",
      },
      {
        title: "HIPAA & Encryption at its Core",
        description:
          "Altrix is fully HIPAA compliant with advanced encryption for data. Built on a secure U.S.-based cloud infrastructure, our platform safeguards patient privacy.",
        skeleton: <SkeletonFour />,
        className: "col-span-1 lg:col-span-3 border-b lg:border-none",
      },
    ];
  
    return (
      <div id="about" className="relative z-20 py-10 lg:py-20 max-w-7xl mx-auto dark:bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-8"
        >
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Built for Enterprise
          </h4>
  
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            Scalable, Secure, and Deeply Integrated
          </p>
        </motion.div>
  
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={feature.className}
              >
                <FeatureCard>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <div className="h-full w-full">{feature.skeleton}</div>
                </FeatureCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  const FeatureCard = ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
        {children}
      </div>
    );
  };

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex py-4 px-2 gap-10"
      >
        <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-[400px]">
          <div className="relative w-full h-full">
            <Image
              src="/aiscribes_light.png"
              alt="header light"
              fill
              className="object-cover object-left-top rounded-sm dark:hidden"
            />
            <Image
              src="/aiscribes_dark.png"
              alt="header dark"
              fill
              className="object-cover object-left-top rounded-sm hidden dark:block"
            />
          </div>
        </div>
  
        <div className="absolute bottom-0 z-40 inset-x-0 h-40 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent" />
        <div className="absolute top-0 z-40 inset-x-0 h-40 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent" />
      </motion.div>
    );
  };
  
  export const SkeletonTwo = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    const images = [
      { light: "/aiscribes_light.png", dark: "/aiscribes_dark.png" },
      { light: "/aiscribes_light.png", dark: "/aiscribes_dark.png" },
      { light: "/aiscribes_light.png", dark: "/aiscribes_dark.png" },
      { light: "/aiscribes_light.png", dark: "/aiscribes_dark.png" },
      { light: "/aiscribes_light.png", dark: "/aiscribes_dark.png" },
    ];
  
    return (
      <motion.div
        ref={ref}
        className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden"
      >
        {[0, 1].map((rowIndex) => (
          <div key={rowIndex} className="flex flex-row -ml-20">
            {images.map((image, idx) => (
              <motion.div
                key={`images-${rowIndex}-${idx}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: (rowIndex * images.length + idx) * 0.1
                }}
                whileHover={{ scale: 1.1, zIndex: 100 }}
                style={{
                  rotate: Math.random() * 20 - 10,
                }}
                className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
              >
                <div className="relative h-20 w-20 md:h-40 md:w-40">
                  <Image
                    src={image.light}
                    alt="feature image light"
                    fill
                    className="rounded-lg object-cover flex-shrink-0 dark:hidden"
                  />
                  <Image
                    src={image.dark}
                    alt="feature image dark"
                    fill
                    className="rounded-lg object-cover flex-shrink-0 hidden dark:block"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
  
        <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
        <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
      </motion.div>
    );
  };
  
  export const SkeletonThree = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="h-full w-full"
      >
        <Link
          href="/whitepaper"
          target="__blank"
          className="relative block h-[400px] w-full group/image"
        >
          <div className="w-full h-full relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
            </motion.div>
  
            <div className="relative w-full h-full bg-white dark:bg-neutral-900 rounded-lg shadow-2xl overflow-hidden">
              <Image
                src="/search_light.png"
                alt="header light"
                fill
                className="object-cover rounded-lg blur-none group-hover/image:blur-md transition-all duration-200 dark:hidden"
              />
              <Image
                src="/search_dark.png"
                alt="header dark"
                fill
                className="object-cover rounded-lg blur-none group-hover/image:blur-md transition-all duration-200 hidden dark:block"
              />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };
  
  export const SkeletonFour = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10"
      >
        <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
      </motion.div>
    );
  };

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
