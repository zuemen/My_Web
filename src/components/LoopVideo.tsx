"use client";

import { useEffect, useRef } from "react";

interface LoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** False for visitors who ask for less motion: the poster frame stays put. */
  play: boolean;
}

/**
 * Silent looping clip for a card. React leaves `muted` out of the server HTML,
 * so browsers may refuse to autoplay it; this sets it on the element and plays
 * the clip only while it is on screen.
 */
const LoopVideo = ({ src, poster, className, play }: LoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (!play) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [play]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
};

export default LoopVideo;
