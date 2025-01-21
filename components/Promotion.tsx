'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const WhitePaperHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px",
    amount: 0.3
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const gradientVariants = {
    hidden: { opacity: 20, scale: 0.8 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div ref={ref} className="relative w-full min-h-[60vh] bg-white dark:bg-black text-neutral-950 dark:text-white px-6 py-40 overflow-hidden">
      
      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative max-w-4xl mx-auto"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
        >
          <motion.span 
            variants={itemVariants}
            className="block"
          >
            ADVANCING THE FUTURE OF
          </motion.span>
          <motion.span 
            variants={itemVariants}
            className="block"
          >
            NURSE-CENTRIC AI IN HEALTHCARE
          </motion.span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl leading-relaxed"
        >
          Altrix is committed to redefining nursing workflows through rigorous research and innovation. 
          We draw inspiration for solutions from our observational clinical studies, contributions to technical research, and healthcare design white papers. 
          This approach positions Altrix as a leader in advancing AI that supports the role of nurses in healthcare.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4"
        >
          <Link href={"https://independent.academia.edu/HectorBenitezVentura"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded transition-all duration-300 
                       hover:shadow-lg hover:dark:shadow-white/20 hover:shadow-black/20"
            >
              READ RESEARCH
            </motion.button>
          </Link>
          
          <Link href={'/waitlist'}>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded 
                       transition-all duration-300 hover:shadow-lg hover:dark:shadow-white/20 hover:shadow-black/20"
            >
              REQUEST DEMO
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          variants={gradientVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                   rounded-full blur-3xl pointer-events-none"
        />

        {/* Additional decorative elements for more visual interest */}
        
      </motion.div>
    </div>
  );
};

export default WhitePaperHero;