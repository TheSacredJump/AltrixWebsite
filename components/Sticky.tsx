"use client";

import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "Step One",
    description:
      "At the beginning of the morning look at the patients you are staffed on ",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Two",
    description:
      "Add those patients to a  queue your on your Altrix portal ",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Three",
    description:
      "Before entering a room turn on Altrix through mobile device",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Four",
    description:
      "Perform  assessment on your given patient ",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Five",
    description:
      "Go see your next patient",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Six",
    description:
      "When you finally have time to sit at your computer all of your charting results will be ready to submit to your EHR",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Seven",
    description:
      "Spend seconds per interction validating it using transparency",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Step Eight",
    description:
      "Push to the EHR",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/placeholder2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
