"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./SignedText.module.css";

/**
 * Text that arrives as a hash and "verifies" back into itself, left to right,
 * the way a signed claim checks out. Small and deliberately rare:
 *
 *  - `view`  plays once per browser session per `onceKey` when the text scrolls
 *            into view (page titles on /projects and /experience);
 *  - `hover` plays when pointed at or focused (the name in the footer).
 *
 * The real text always holds the layout (no width jump) and is what assistive
 * tech reads; the scrambled copy is aria-hidden on top of it. Nothing plays
 * under prefers-reduced-motion. Timing borrows the nearhackathon.com counter:
 * a 65 ms step, character i settling after 380 + gap·i ms, where the gap is
 * 65 ms for short text and shrinks so long titles settle in about a second.
 */

const HEX = "0123456789abcdef";

// FNV-1a 32-bit → hex. Demonstrative fingerprint, not a signature.
export const fingerprint = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
};

interface SignedTextProps {
  text: string;
  trigger: "view" | "hover";
  /** For `view`: plays once per session for this key. */
  onceKey?: string;
  /** Called when the text has settled (used to reveal a signature line). */
  onVerified?: () => void;
}

const SignedText = ({ text, trigger, onceKey, onVerified }: SignedTextProps) => {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState<string | null>(null); // null = not animating
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const doneRef = useRef(onVerified);

  useEffect(() => {
    doneRef.current = onVerified;
  }, [onVerified]);

  const play = () => {
    if (reduced) {
      doneRef.current?.();
      return;
    }
    cancelAnimationFrame(raf.current);
    const chars = [...text];
    const gap = Math.min(65, 900 / Math.max(chars.length, 1));
    const start = performance.now();
    let lastStep = -1;
    const step = (now: number) => {
      const ms = now - start;
      if (ms >= 450 + gap * chars.length) {
        setShown(null);
        doneRef.current?.();
        return;
      }
      const n = Math.floor(ms / 65);
      if (n !== lastStep) {
        lastStep = n;
        setShown(
          chars
            .map((c, i) =>
              ms < 380 + gap * i && /\S/.test(c) && !/[.,·&—'’()]/.test(c)
                ? HEX[((Math.imul(i + 1, 0x9e3779b1) >>> 0) + n * 7 + i) & 15]
                : c,
            )
            .join(""),
        );
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const key = `signed:${onceKey ?? text}`;
    let seen = false;
    try {
      seen = sessionStorage.getItem(key) === "1";
    } catch {}
    // Already verified this session (or reduced motion): show the result only.
    if (seen || reduced) {
      doneRef.current?.();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        try {
          sessionStorage.setItem(key, "1");
        } catch {}
        play();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
    // play only reads refs and the text prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, onceKey, text, reduced]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const hoverProps =
    trigger === "hover"
      ? { onPointerEnter: () => shown === null && play(), onFocus: () => shown === null && play() }
      : {};

  return (
    <span ref={ref} className={styles.stack} {...hoverProps}>
      <span className={shown === null ? undefined : styles.holding}>{text}</span>
      {shown !== null && (
        <span className={styles.scramble} aria-hidden="true">
          {shown}
        </span>
      )}
    </span>
  );
};

export default SignedText;
