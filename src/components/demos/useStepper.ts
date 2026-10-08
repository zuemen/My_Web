"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface StepperOptions {
  count: number;
  /** How long each step holds before advancing, per step index. */
  durationOf: (index: number) => number;
  /** Pause on the last step before looping back to the first. */
  endHold?: number;
}

/**
 * Drives a replay one step at a time. It advances only while the replay is on
 * screen, never for visitors who ask for reduced motion, and stops for good
 * once the visitor takes a step by hand — a replay that keeps moving under
 * someone who is reading it is worse than none.
 */
export const useStepper = ({ count, durationOf, endHold = 2600 }: StepperOptions) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  // Bumped on every manual jump so the same step can be replayed from the top.
  const [nonce, setNonce] = useState(0);

  const autoplay = playing && inView && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const last = index === count - 1;
    const timer = window.setTimeout(
      () => setIndex(last ? 0 : index + 1),
      durationOf(index) + (last ? endHold : 0),
    );
    return () => window.clearTimeout(timer);
  }, [autoplay, index, count, durationOf, endHold]);

  const goTo = useCallback(
    (next: number) => {
      setPlaying(false);
      setIndex(((next % count) + count) % count);
      setNonce((n) => n + 1);
    },
    [count],
  );

  const toggle = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  return {
    ref,
    index,
    nonce,
    /** The visitor's intent, for the play/pause button. */
    playing,
    /** Whether steps are actually advancing right now. */
    running: autoplay,
    /** Reduced-motion visitors step by hand; there is nothing to play. */
    canPlay: !reduced,
    goTo,
    toggle,
    reduced: Boolean(reduced),
  };
};
