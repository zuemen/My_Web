"use client";

import { forwardRef } from "react";
import { Check, X, AlertTriangle, Circle, ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import type { Tone } from "@/data/demos";
import styles from "./ReplayFrame.module.css";

export interface LogItem {
  id: string;
  title: L;
  tone: Tone;
  code?: string;
  tx?: string;
}

interface ReplayFrameProps {
  label: string;
  /** Chain or venue, shown as a badge in the header. */
  venue: string;
  items: LogItem[];
  index: number;
  playing: boolean;
  canPlay: boolean;
  goTo: (index: number) => void;
  toggle: () => void;
  note: L;
  liveUrl?: string;
  children: React.ReactNode;
}

export const ToneIcon = ({ tone, size = 13 }: { tone: Tone; size?: number }) => {
  if (tone === "pass") return <Check size={size} strokeWidth={2.5} aria-hidden="true" />;
  if (tone === "refuse") return <X size={size} strokeWidth={2.5} aria-hidden="true" />;
  if (tone === "warn") return <AlertTriangle size={size} strokeWidth={2.2} aria-hidden="true" />;
  return <Circle size={size - 5} strokeWidth={3} aria-hidden="true" />;
};

/**
 * The chrome every replay shares: header, stage slot, run log and controls.
 * The run log doubles as the step list — each line jumps the stage to that
 * step — and carries the explorer link for the transaction behind it, so a
 * sceptical reader is one click from the chain.
 */
const ReplayFrame = forwardRef<HTMLDivElement, ReplayFrameProps>(function ReplayFrame(
  { label, venue, items, index, playing, canPlay, goTo, toggle, note, liveUrl, children },
  ref,
) {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <div ref={ref} className={styles.frame} role="group" aria-roledescription={t(dict.demo.replayLabel)} aria-label={label}>
      <div className={styles.head}>
        <span className={styles.live} aria-hidden="true" />
        <span className={styles.headLabel}>{label}</span>
        <span className={styles.venue}>{venue}</span>
        <span className={styles.counter}>
          {t(dict.demo.step)} {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.stage}>{children}</div>

        <div className={styles.logWrap}>
          <p className={styles.logTitle}>{t(dict.demo.runLog)}</p>
          <ol className={styles.log}>
            {items.map((item, i) => {
              const state = i === index ? styles.current : i < index ? styles.done : styles.todo;
              return (
                <li key={item.id} className={`${styles.logItem} ${state}`} data-tone={item.tone}>
                  <button
                    type="button"
                    className={styles.logButton}
                    onClick={() => goTo(i)}
                    aria-current={i === index ? "step" : undefined}
                  >
                    <span className={styles.logIcon}>
                      <ToneIcon tone={item.tone} />
                    </span>
                    <span className={styles.logText}>
                      <span className={styles.logTitleText}>{t(item.title)}</span>
                      {item.code && item.code !== "OK" && <code className={styles.logCode}>{item.code}</code>}
                    </span>
                  </button>
                  {item.tx ? (
                    <a
                      href={item.tx}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.txLink}
                      aria-label={`${t(dict.demo.tx)}: ${t(item.title)}`}
                    >
                      {t(dict.demo.tx)}
                      <ArrowUpRight size={11} />
                    </a>
                  ) : (
                    <span className={styles.txNone}>{t(dict.demo.noTx)}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button type="button" className={styles.ctrl} onClick={() => goTo(index - 1)} aria-label={t(dict.demo.previous)}>
            <ChevronLeft size={16} />
          </button>
          {canPlay && (
            <button type="button" className={styles.ctrl} onClick={toggle} aria-label={playing ? t(dict.demo.pause) : t(dict.demo.play)}>
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}
          <button type="button" className={styles.ctrl} onClick={() => goTo(index + 1)} aria-label={t(dict.demo.next)}>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className={styles.progress} aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`${styles.tick} ${i <= index ? styles.tickOn : ""}`}
              data-tone={i <= index ? item.tone : undefined}
            />
          ))}
        </div>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
            {t(dict.demo.openLive)}
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>

      <p className={styles.note}>{t(note)}</p>
    </div>
  );
});

export default ReplayFrame;
