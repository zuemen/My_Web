"use client";

import { useEffect, useRef, useState } from "react";

interface LoopVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** False for visitors who ask for less motion, or who paused the previews: the poster frame stays put. */
  play: boolean;
}

/**
 * Silent looping clip for a card. React leaves `muted` out of the server HTML,
 * so browsers may refuse to autoplay it; this sets it on the element and plays
 * the clip only while it is on screen. The file is not requested until the card
 * comes near the viewport (six clips used to load with the page and compete
 * with it for bandwidth); until then the poster shows.
 */
const LoopVideo = ({ src, poster, className, play }: LoopVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  // Attach the source once the card is within a screen of the viewport.
  useEffect(() => {
    const video = ref.current;
    if (!video || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setNear(true);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [near]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;
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
  }, [play, near]);

  return (
    <video
      ref={ref}
      className={className}
      src={near ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
};

export default LoopVideo;
