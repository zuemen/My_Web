"use client";

import { MotionConfig } from "framer-motion";

/**
 * The CSS `prefers-reduced-motion` block in globals.css only neutralises CSS
 * animations and transitions — framer-motion drives its animations in JS, so
 * it ignores that rule entirely. `reducedMotion="user"` makes every motion
 * component on the site honour the OS setting instead.
 */
const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export default MotionProvider;
