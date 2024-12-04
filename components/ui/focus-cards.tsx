"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        const handleLoadedMetadata = () => {
          setDimensions({
            width: video.videoWidth,
            height: video.videoHeight,
          });
          // Pause video initially and set current time to 0
          video.pause();
          video.currentTime = 0;
        };
        
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        
        if (video.videoWidth) {
          handleLoadedMetadata();
        }

        return () => {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
      }
    }, []);

    // Handle video playback on hover
    useEffect(() => {
      const video = videoRef.current;
      if (video) {
        if (hovered === index) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    }, [hovered, index]);

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.90]"
        )}
        style={{
          aspectRatio: dimensions.width ? `${dimensions.width}/${dimensions.height}` : 'auto'
        }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          src={card.src}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            hovered === index ? "" : "grayscale brightness-90"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div 
            className={cn(
              "text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200",
            )}
          >
            {card.title}
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}