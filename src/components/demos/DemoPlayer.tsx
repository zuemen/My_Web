"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { chains } from "@/data/projects";
import type { DemoScript, DemoStep } from "@/data/demos";
import ReplayFrame, { ToneIcon } from "./ReplayFrame";
import { useStepper } from "./useStepper";
import styles from "./DemoPlayer.module.css";

type CheckState = "pass" | "fail" | "skip" | "na" | "idle";

/** The gate evaluates its checks in order, so everything after a failure is not reached. */
const checkStates = (script: DemoScript, step: DemoStep): Record<string, CheckState> => {
  const out: Record<string, CheckState> = {};
  let failed = false;
  for (const { id } of script.gate.checks) {
    if (step.kind === "event") out[id] = "idle";
    else if (step.na?.includes(id)) out[id] = "na";
    else if (failed) out[id] = "skip";
    else if (id === step.fail) {
      out[id] = "fail";
      failed = true;
    } else out[id] = "pass";
  }
  return out;
};

// Seconds. The packet reaches the gate, the checks light in order, then the
// outcome lands — the same rhythm on every step so the eye learns it once.
const WIRE = 0.55;
const STAGGER = 0.16;

const DemoPlayer = ({ script }: { script: DemoScript }) => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const durationOf = useCallback(
    (i: number) => (script.steps[i]?.kind === "event" ? 4400 : 5600),
    [script.steps],
  );
  const { ref, index, nonce, playing, canPlay, goTo, toggle } = useStepper({
    count: script.steps.length,
    durationOf,
  });

  const step = script.steps[index] as DemoStep;
  const actor = (id: string) => t(script.actors[id] ?? { en: id, zh: id });
  const states = checkStates(script, step);
  const isEvent = step.kind === "event";
  const nChecks = script.gate.checks.length;
  const outcomeAt = isEvent ? WIRE : WIRE + nChecks * STAGGER + 0.1;
  // A refused action stops at the gate; anything else carries on to its target.
  const reaches = step.tone !== "refuse";
  const venue = script.chain ? chains[script.chain].name : script.venue ? t(script.venue) : "";
  const key = `${step.id}-${nonce}`;

  const stampText =
    step.tone === "refuse"
      ? t(dict.demo.refused)
      : step.tone === "warn"
        ? t(dict.demo.flagged)
        : t(dict.demo.accepted);

  return (
    <ReplayFrame
      ref={ref}
      label={t(script.name)}
      venue={venue}
      items={script.steps}
      index={index}
      playing={playing}
      canPlay={canPlay}
      goTo={goTo}
      toggle={toggle}
      note={script.note}
      liveUrl={script.liveUrl}
    >
      <div className={styles.lane}>
        <div className={`${styles.node} ${styles.from}`}>
          <span className={styles.nodeKicker}>{t(dict.demo.from)}</span>
          <span className={styles.nodeLabel}>{actor(step.from)}</span>
          <motion.span
            key={`p-${key}`}
            className={styles.packet}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <code>{step.packet}</code>
          </motion.span>
        </div>

        <div className={styles.wire} aria-hidden="true">
          <motion.span
            key={`d1-${key}`}
            className={`${styles.dot} ${styles.dotH}`}
            initial={{ left: "0%", opacity: 1 }}
            animate={{ left: "100%", opacity: [1, 1, 0] }}
            transition={{ duration: WIRE, ease: "easeInOut" }}
          />
          <motion.span
            key={`d1v-${key}`}
            className={`${styles.dot} ${styles.dotV}`}
            initial={{ top: "0%", opacity: 1 }}
            animate={{ top: "100%", opacity: [1, 1, 0] }}
            transition={{ duration: WIRE, ease: "easeInOut" }}
          />
        </div>

        <div className={`${styles.gate} ${isEvent ? styles.gateIdle : ""}`}>
          <div className={styles.gateHead}>
            <code className={styles.gateName}>{script.gate.name}</code>
            {isEvent && <span className={styles.gateNote}>{t(dict.demo.stateUpdate)}</span>}
          </div>
          <ul className={styles.checks}>
            {script.gate.checks.map((check, i) => {
              const state = states[check.id];
              return (
                <motion.li
                  key={`${check.id}-${key}`}
                  className={styles.check}
                  data-state={state}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: state === "idle" ? 0.5 : state === "skip" || state === "na" ? 0.42 : 1 }}
                  transition={{ delay: isEvent ? 0 : WIRE + i * STAGGER, duration: 0.2 }}
                >
                  <span className={styles.checkIcon}>
                    {state === "pass" && <ToneIcon tone="pass" size={12} />}
                    {state === "fail" && <ToneIcon tone={step.tone === "warn" ? "warn" : "refuse"} size={12} />}
                  </span>
                  <span className={styles.checkLabel}>{t(check.label)}</span>
                  {state === "skip" && <span className={styles.checkState}>{t(dict.demo.notReached)}</span>}
                  {state === "na" && <span className={styles.checkState}>{t(dict.demo.notApplicable)}</span>}
                </motion.li>
              );
            })}
          </ul>

          <AnimatePresence>
            {!isEvent && (
              <motion.div
                key={`s-${key}`}
                className={styles.stamp}
                data-tone={step.tone}
                initial={{ opacity: 0, scale: 1.2, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0 }}
                transition={{ delay: outcomeAt, duration: 0.25, ease: "easeOut" }}
              >
                <span>{stampText}</span>
                {step.code && <code>{step.code}</code>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`${styles.wire} ${reaches ? "" : styles.wireCut}`} aria-hidden="true">
          {reaches && (
            <>
              <motion.span
                key={`d2-${key}`}
                className={`${styles.dot} ${styles.dotH}`}
                initial={{ left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ delay: outcomeAt, duration: WIRE, ease: "easeInOut" }}
              />
              <motion.span
                key={`d2v-${key}`}
                className={`${styles.dot} ${styles.dotV}`}
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ delay: outcomeAt, duration: WIRE, ease: "easeInOut" }}
              />
            </>
          )}
        </div>

        <div className={`${styles.node} ${styles.to}`}>
          <span className={styles.nodeKicker}>{t(dict.demo.to)}</span>
          <span className={styles.nodeLabel}>{actor(step.to)}</span>
          {reaches && (
            <motion.span
              key={`f-${key}`}
              className={styles.flash}
              data-tone={step.tone}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.35] }}
              transition={{ delay: outcomeAt + WIRE, duration: 0.8 }}
            />
          )}
        </div>
      </div>

      {script.meter && step.meter !== undefined && (
        <div className={styles.meter}>
          <div className={styles.meterHead}>
            <span>{t(script.meter.label)}</span>
            <span className={styles.meterValue}>
              {step.meter} / {script.meter.max} {script.meter.unit}
            </span>
          </div>
          <div className={styles.meterTrack}>
            <motion.div
              className={styles.meterFill}
              initial={false}
              animate={{ width: `${(step.meter / script.meter.max) * 100}%` }}
              transition={{ delay: reaches ? outcomeAt : 0, duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <p className={styles.caption} aria-live="polite">
        {t(step.caption)}
      </p>
    </ReplayFrame>
  );
};

export default DemoPlayer;
