"use client";

import { useId, useRef, useState } from "react";
import { Play } from "lucide-react";
import styles from "./DemoVideo.module.css";

interface DemoVideoProps {
  src: string;
  poster?: string;
  /** Accessible name, e.g. "Demo video: ChainLens". */
  label: string;
  /** Text for the play button, read by screen readers. */
  playLabel: string;
  captions?: { en: string; zh: string; enLabel: string; zhLabel: string };
  /** For a silent illustration: what it shows, in words (read via aria-describedby). */
  description?: string;
  /** Chinese captions come on by default in 中 mode. */
  zhDefault?: boolean;
  className?: string;
}

/**
 * A narrated demo. Until the first play the browser's control bar stays off:
 * it sat over the bottom of every poster, where the posters carry their
 * "synthetic data · illustration" notes. One play button opens the video,
 * and from then on the native controls take over.
 */
const DemoVideo = ({
  src,
  poster,
  label,
  playLabel,
  captions,
  description,
  zhDefault = false,
  className,
}: DemoVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const descId = useId();
  const describedBy = description ? descId : undefined;

  const start = () => {
    setStarted(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <video
        ref={ref}
        className={styles.video}
        controls={started}
        preload="none"
        playsInline
        poster={poster}
        aria-label={label}
        aria-describedby={describedBy}
      >
        <source src={src} type="video/mp4" />
        {captions && (
          <>
            <track kind="captions" src={captions.en} srcLang="en" label={captions.enLabel} />
            <track
              kind="captions"
              src={captions.zh}
              srcLang="zh-Hant"
              label={captions.zhLabel}
              default={zhDefault}
            />
          </>
        )}
      </video>
      {!started && (
        <button
          type="button"
          className={styles.play}
          onClick={start}
          aria-label={`${playLabel}: ${label}`}
          aria-describedby={describedBy}
        >
          <span className={styles.playIcon}>
            <Play size={22} aria-hidden="true" />
          </span>
        </button>
      )}
      {description && (
        <p id={descId} className={styles.srOnly}>
          {description}
        </p>
      )}
    </div>
  );
};

export default DemoVideo;
