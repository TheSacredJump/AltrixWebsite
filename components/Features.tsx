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
                            src="/aiscribes_light.png"
                            alt="AI Scribes Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/aiscribes_dark.png"
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
                          src="/aiscribes_light.png"
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
                    Automates the charting process using ambient AI to listen to conversations, 
                    extract relevant details, and pushing it directly into the EHRs.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Speaks many languages"
                      description="Altrix recognizes over 20 languages and accents, enhancing accessibility for diverse patient populations."
                      isHovered={hoveredFeature === "Speaks many languages"}
                    />

                    <Feature
                      title="Validation"
                      description="A quick validation screen lets nurses review and edit entries before they're sent to the EHR."
                      isHovered={hoveredFeature === "Validation"}
                    />

                    <Feature
                      title="Tailored for your hospital"
                      description="With customizable EHR fields, Altrix adapts seamlessly to the unique requirements of different hospitals and units nationwide."
                      isHovered={hoveredFeature === "Tailored for your hospital"}
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
      title: "Auto Review",
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
                            src="/search_light.png"
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
                          src="/search_light.png"
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
                    Enables nurses to gain a comprehensive understanding of a patient&apos;s medical history by seamlessly accessing and analyzing detailed past records.

                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Increase Quality"
                      description="Empowers nurses to make more informed decisions, tailor care plans to individual patient needs, and enhance the overall quality of care."
                      isHovered={hoveredFeature === "Increase Quality"}
                    />

                    <Feature
                      title="Strong Search Engine"
                      description="Leverages data from previous interactions to support a diverse range of advanced and highly specific search queries."
                      isHovered={hoveredFeature === "Strong Search Engine"}
                    />

                    <Feature
                      title="Instant Responses"
                      description="Delivers rapid, real-time responses that seamlessly align with existing workflows, ensuring minimal disruption and maximum efficiency."
                      isHovered={hoveredFeature === "Instant Responses"}
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
      title: "Auto Handoffs",
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
                            src="/interaction_light.png"
                            alt="Current Interaction Light Mode"
                            fill
                            className="rounded-lg object-contain dark:hidden 
                              transition-transform duration-300 group-hover:scale-105"
                          />
                          <Image
                            src="/interaction_dark.png"
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
                          src="/interaction_light.png"
                          alt="Current Interaction Light Mode"
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/interaction_dark.png"
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
                  Captures and organizes key patient data in real-time through summarizing important updates, flags critical changes, and provides an easy-to-read handoff document for the incoming nurse.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Secure Transfers"
                      description="Safely retrieves prior shift notes without exposing any PHI."
                      isHovered={hoveredFeature === "Secure Transfers"}
                    />

                    <Feature
                      title="Minimizes Errors"
                      description="Enhances handoff process by replacing traditional paper report sheets with AI-powered agents."
                      isHovered={hoveredFeature === "Minimizes Errors"}
                    />

                    <Feature
                      title="Returns Time"
                      description="Nurses often stay past their shifts due to patient handoffs. Altrix helps nurses leave on time."
                      isHovered={hoveredFeature === "Returns Time"}
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
      title: "Command Copilot",
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
                            src="/editform_light.png"
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
                          src="/editform_light.png"
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
                  Enables nurses to swiftly communicate essential needs across the hospital, ensuring they can secure the necessary equipment to provide uninterrupted patient care.
                  </p>
                  
                  <div className="space-y-6 mt-8">
                    <Feature
                      title="Quick Messaging"
                      description="No need to leave the room for request —nurses can stay with the patient and continue their care."
                      isHovered={hoveredFeature === "Quick Messaging"}
                    />

                    <Feature
                      title="Centralize Communications"
                      description="Allows communication across units from a single device, reducing confusion."
                      isHovered={hoveredFeature === "Centralize Communications"}
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