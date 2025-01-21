"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ZoomIn } from "lucide-react";

export default function TimelineDemo() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const targetId = Number(entry.target.getAttribute('data-index'));
        if (entry.isIntersecting) {
          setVisibleSections(prev => {
            const newSet = new Set(prev);
            newSet.add(targetId);
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });

    const sections = document.querySelectorAll('[data-index]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const Feature = ({ title, description, isHovered }: { 
    title: string; 
    description: string; 
    isHovered: boolean;
  }) => (
    <div 
      className={`transform transition-all duration-300 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setHoveredFeature(title)}
      onMouseLeave={() => setHoveredFeature(null)}
    >
      <h3 className="font-semibold mb-2 text-sm md:text-base">{title}</h3>
      <p className={`text-sm text-neutral-600 dark:text-neutral-300 transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-80'
      }`}>
        {description}
      </p>
    </div>
  );

  const data = [
    {
      title: "AutoChart",
      content: (
        <div 
          data-index="0"
          className={`transition-opacity duration-1000 ease-out ${
            visibleSections.has(0) 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <Card className="overflow-hidden border-none shadow-lg dark:bg-neutral-900">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Right column: Image */}
                <div className={`transition-opacity duration-700 ease-out ${
                  visibleSections.has(0)
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer bg-[#6677db]/10 py-1 rounded-lg">
                        <div className="aspect-[4/3] relative w-full rounded-lg overflow-hidden">
                          <Image
                            src="/queue_light.png"
                            alt="AI Scribes Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/queue_dark.png"
                            alt="AI Scribes Dark Mode"
                            fill
                            className="rounded-lg object-contain hidden dark:block 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-all duration-300 flex items-center justify-center opacity-0 
                            group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-neutral-900">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src="/queue_light.png"
                          alt="AI Scribes Light Mode"
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/aiscribes_dark.png"
                          alt="AI Scribes Dark Mode"
                          fill
                          className="object-contain hidden dark:block"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Left column: Description */}
                <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
                  <p className="text-base font-medium border-l-4 border-[#6677db] pl-4">
                  Capture nurse-patient interactions, automatically generating flowsheets.
                  By being directly integrated in your EHR, it helps nurses focus on patient care.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Instant Transparency"
                      description="Allows nurses to effectively review and confirm generated notes before submission."
                      isHovered={hoveredFeature === "Instant Transparency"}
                    />

                    <Feature
                      title="Customizable to Your Unit"
                      description="We understand every unit, nurse, and flowsheet is different — Altrix has you covered."
                      isHovered={hoveredFeature === "Customizable to Your Unit"}
                    />

                    <Feature
                      title="State-of-the-art AI"
                      description="Our propietary agent achieves unparalelled accuracy and speeds with uncompromised scale. "
                      isHovered={hoveredFeature === "State-of-the-art AI"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "EHR Assistant",
      content: (
        <div 
          data-index="0"
          className={`transform transition-all duration-1000 ease-out ${
            visibleSections.has(0) 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <Card className="overflow-hidden border-none shadow-lg dark:bg-neutral-900 bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Right column: Image */}
                <div className={`transform transition-all duration-700 ease-out ${
                  visibleSections.has(0)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer bg-[#6677db]/10 p-1 rounded-lg">
                        <div className="aspect-[4/3] relative w-full rounded-lg overflow-hidden">
                          <Image
                            src="/ehr-assistant.png"
                            alt="EHR Search Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/search_dark.png"
                            alt="EHR Search Dark Mode"
                            fill
                            className="rounded-lg object-contain hidden dark:block 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-all duration-300 flex items-center justify-center opacity-0 
                            group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-neutral-900">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src="/ehr-assistant.png"
                          alt="EHR SearchLight Mode"
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/search_dark.png"
                          alt="EHR Search Dark Mode"
                          fill
                          className="object-contain hidden dark:block"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Left column: Description */}
                <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
                  <p className="text-base font-medium border-l-4 border-[#6677db] pl-4">
                  Empower nurses with instant access to patient information and streamline routine tasks through natural language commands. 

                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Surface Information"
                      description="Instantly surface patient information, from medication history to vital sign trendlines."
                      isHovered={hoveredFeature === "Surface Information"}
                    />

                    <Feature
                      title="Queue Orders"
                      description="Queue lab orders, technician orders, all through a natural language interface."
                      isHovered={hoveredFeature === "Queue Orders"}
                    />

                    <Feature
                      title="Voice Mode"
                      description="Hands full? In a coding situation? Go hands-free."
                      isHovered={hoveredFeature === "Voice Mode"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "Floor Visibility",
      content: (
        <div 
          data-index="0"
          className={`transform transition-all duration-1000 ease-out ${
            visibleSections.has(0) 
              ? ' opacity-100' 
              : ' opacity-0'
          }`}
        >
          <Card className="overflow-hidden border-none shadow-lg dark:bg-neutral-900">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Right column: Image */}
                <div className={`transform transition-all duration-700 ease-out ${
                  visibleSections.has(0)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer bg-[#6677db]/10 px-1 rounded-lg">
                        <div className="aspect-[4/3] relative w-full rounded-lg overflow-hidden">
                          <Image
                            src="/vercel_2.png"
                            alt="Current Interaction Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/vercel_4.png"
                            alt="Current Interaction Dark Mode"
                            fill
                            className="rounded-lg object-contain hidden dark:block 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-all duration-300 flex items-center justify-center opacity-0 
                            group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-neutral-900">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src="/vercel_2.png"
                          alt="Current Interaction Light Mode"
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/vercel_4.png"
                          alt="Current Interaction Dark Mode"
                          fill
                          className="object-contain hidden dark:block"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Left column: Description */}
                <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
                  <p className="text-base font-medium border-l-4 border-[#6677db] pl-4">
                  Provide management with real-time insights into patient demand and resource allocation. 
                  Optimize staffing decisions and workload distribution across the floor.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Real-Time Patient Acuity"
                      description="Track patient care, pinpointing high-stress areas within the hospital."
                      isHovered={hoveredFeature === "Real-Time Patient Acuity"}
                    />

                    <Feature
                      title="Optimal Nurse Deployment"
                      description="Recommends optimal RN deployment to balance workloads and improve care efficiency."
                      isHovered={hoveredFeature === "Optimal Nurse Deployment"}
                    />

                    <Feature
                      title="Unlock Predictive Analytics"
                      description="Leverage historical data to enable proactive resource planning."
                      isHovered={hoveredFeature === "Unlock Predictive Analytics"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      title: "AutoCode",
      content: (
        <div 
          data-index="0"
          className={`transform transition-all duration-1000 ease-out ${
            visibleSections.has(0) 
              ? ' opacity-100' 
              : ' opacity-0'
          }`}
        >
          <Card className="overflow-hidden border-none shadow-lg dark:bg-neutral-900">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Right column: Image */}
                <div className={`transform transition-all duration-700 ease-out ${
                  visibleSections.has(0)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="aspect-[4/3] relative w-full rounded-lg overflow-hidden">
                          <Image
                            src="/autocode-image.png"
                            alt="Edit Form Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/editform_dark.png"
                            alt="Edit Form Dark Mode"
                            fill
                            className="rounded-lg object-contain hidden dark:block 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 
                            transition-all duration-300 flex items-center justify-center opacity-0 
                            group-hover:opacity-100">
                            <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-neutral-900">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src="/autocode-image.png"
                          alt="Edit Form Light Mode"
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/editform_dark.png"
                          alt="Edit Form Dark Mode"
                          fill
                          className="object-contain hidden dark:block"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Left column: Description */}
                <div className="space-y-6 text-neutral-800 dark:text-neutral-200">
                  <p className="text-base font-medium border-l-4 border-[#6677db] pl-4">
                  Coming Soon —— automatically convert the day's documentation into CPT & ICD codes.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="ICD, CPC, & HCPCS Compatible"
                      description="Global compatibility to handle a nurse's entire day."
                      isHovered={hoveredFeature === "ICD, CPC, & HCPCS Compatible"}
                    />

                    <Feature
                      title="Reduce Claim Denials"
                      description="Minimizes errors, reducing claim denials through automated coding accuracy."
                      isHovered={hoveredFeature === "Reduce Claim Denials"}
                    />

                    <Feature
                      title="Faster Revenue Cycles"
                      description="Processes information in real time, enabling faster revenue cycles."
                      isHovered={hoveredFeature === "Faster Revenue Cycles"}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div id="features" className="w-full" ref={timelineRef}>
      <Timeline data={data} />
    </div>
  );
}