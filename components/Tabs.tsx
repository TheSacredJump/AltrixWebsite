"use client";

import Image from "next/image";
import { Tabs } from "./ui/tabs";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const DummyContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full relative"
    >
      <h1 className="mt-8 text-2xl">Decrease nurse burnout by 39%</h1>
      <div className="dark:hidden">
      <Image
        src="/aiscribes_light.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
      <div className="hidden dark:block">
      <Image
        src="/aiscribes_dark.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
    </motion.div>
  );
};

const QualityContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full relative"
    >
      <h1 className="mt-8 text-2xl">Increase in HCHAPS (quality of care) scores by 20%</h1>
      <div className="dark:hidden">
      <Image
        src="/aiscribes_light.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
      <div className="hidden dark:block">
      <Image
        src="/aiscribes_dark.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
    </motion.div>
  );
};

const DocsContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full relative"
    >
      <h1 className="mt-8 text-2xl">Decrease in documentation errors by 68%</h1>
      <div className="dark:hidden">
      <Image
        src="/aiscribes_light.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
      <div className="hidden dark:block">
      <Image
        src="/aiscribes_dark.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
    </motion.div>
  );
};

const BillingContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full relative"
    >
      <h1 className="mt-8 text-2xl">Increase in insurance billing accuracy by 43%</h1>
      <div className="dark:hidden">
      <Image
        src="/aiscribes_light.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
      <div className="hidden dark:block">
      <Image
        src="/aiscribes_dark.png"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
      </div>
    </motion.div>
  );
};

export default function TabsDemo() {
  const tabs = [
    {
      title: "Burnout",
      value: "burnout",
      content: (
        <div id="metrics" className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6677db] to-violet-500 dark:from-neutral-900 dark:to-neutral-950">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Burnout Metrics
          </motion.p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Quality",
      value: "quality",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6677db] to-violet-500 dark:from-neutral-900 dark:to-neutral-950">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Quality Metrics
          </motion.p>
          <QualityContent />
        </div>
      ),
    },
    {
      title: "Documentation",
      value: "documentation",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6677db] to-violet-500 dark:from-neutral-900 dark:to-neutral-950">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Documentation Metrics
          </motion.p>
          <DocsContent />
        </div>
      ),
    },
    {
      title: "Billing",
      value: "billing",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6677db] to-violet-500 dark:from-neutral-900 dark:to-neutral-950">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Billing Metrics
          </motion.p>
          <BillingContent />
        </div>
      ),
    },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8 }}
      className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40 mb-64"
    >
      <Tabs tabs={tabs} />
    </motion.div>
  );
}