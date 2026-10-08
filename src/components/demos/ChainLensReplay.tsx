"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L } from "@/i18n/config";
import type { Tone } from "@/data/demos";
import caseData from "@/data/chainlens-case.json";
import ReplayFrame, { type LogItem } from "./ReplayFrame";
import { useStepper } from "./useStepper";
import { STAGE, columnX, edgePath, layoutCase, type CaseEdge, type CaseNode } from "./chainlensLayout";
import styles from "./ChainLensReplay.module.css";

interface Act extends LogItem {
  caption: L;
  /** Show nodes up to this many hops upstream; null shows the whole graph. */
  reveal: number | null;
}

const fmt = (n: number) => n.toLocaleString("en-US");

/*
 * Six acts, following ChainLens's own CaseReplay: the withdrawal looks clean,
 * the trace goes upstream hop by hop, the collection wallet lights up, the
 * whole operation comes into view, risk propagates along the path, and the
 * decision lands with its evidence.
 */
const acts: Act[] = [
  {
    id: "request",
    tone: "neutral",
    reveal: 0,
    code: "blacklist: clear",
    title: l("Withdrawal request: 500,000 USDT", "出金申請：500,000 USDT"),
    caption: l(
      "A user asks to withdraw 500,000 USDT to TOtcOut01. The address has never been reported — a list check would release it.",
      "使用者申請把 500,000 USDT 提領到 TOtcOut01。這個地址從未被通報——只做名單比對就會放行。",
    ),
  },
  {
    id: "hop1",
    tone: "neutral",
    reveal: 1,
    title: l("Trace one hop upstream", "往上游追溯一階"),
    caption: l(
      "ChainLens walks the graph against the flow of funds: who paid this address directly?",
      "鏈鏡沿著資金流的反方向走：是誰直接把錢打給這個地址？",
    ),
  },
  {
    id: "hop2",
    tone: "warn",
    reveal: 2,
    code: "fan_in · fan_out · gather_scatter",
    title: l("Two hops up: a collection wallet", "往上兩階：一個集資主錢包"),
    caption: l(
      "Two hops up, TAggregator01 matches three laundering patterns at once: many-to-one collection, rapid fan-out, gather-scatter.",
      "往上兩階，TAggregator01 同時命中三種洗錢圖樣：多對一集資、快速扇出、集散。",
    ),
  },
  {
    id: "network",
    tone: "neutral",
    reveal: null,
    code: "53 addresses · 63 transfers",
    title: l("The whole operation comes into view", "整個詐騙網絡浮現"),
    caption: l(
      "Victims pay fake ‘support’ accounts, which feed a master wallet, mules and peeling chains — and two cash-out addresses.",
      "被害人付款給假客服帳戶，再流入主錢包、車手與剝洋蔥鏈——最後到兩個出金地址。",
    ),
  },
  {
    id: "propagate",
    tone: "warn",
    reveal: null,
    code: "1 − (1 − 0.33)(1 − 0.60) = 0.73",
    title: l("Risk propagates along the path", "風險沿路徑傳遞"),
    caption: l(
      "The address looks normal on its own (0.33). Its link to the collection wallet carries 0.60. Combined: 0.73.",
      "這個地址單看結構正常（0.33），但它與集資主錢包的關聯分數是 0.60。合併後：0.73。",
    ),
  },
  {
    id: "decision",
    tone: "refuse",
    reveal: null,
    code: "Hold · manual review",
    title: l("Hold the withdrawal, with evidence", "暫緩出金，附上證據"),
    caption: l(
      "Hold and start manual review, with the fund path and a draft suspicious transaction report attached. The control address next door scores 0.10 and is released.",
      "暫緩出金並啟動人工審查，同時附上資金路徑與可疑交易申報草稿。對照組的一般地址分數 0.10，照常放行。",
    ),
  },
];

const columnHeads: { col: number; label: L }[] = [
  { col: 0, label: l("Victims", "被害人") },
  { col: 1, label: l("Fake support", "假客服") },
  { col: 2, label: l("Master wallet", "主錢包") },
  { col: 3, label: l("Mules", "車手") },
  { col: 5, label: l("Peeling chains", "剝洋蔥鏈") },
  { col: 7, label: l("Cash-out", "出金") },
];

/* On a phone the graph is wider than the screen; each act scrolls it to where
   the story is (0 = victims on the left, 1 = the cash-out address). */
const FOCUS = [1, 1, 0.55, 0, 0.6, 1];

const LABELLED = new Set(["TOtcOut01", "TAggregator01", "TMule03", "TNormalUser01"]);

const ChainLensReplay = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const durationOf = useCallback(() => 5400, []);
  const { ref, index, nonce, playing, canPlay, goTo, toggle } = useStepper({ count: acts.length, durationOf });

  const nodes = caseData.nodes as CaseNode[];
  const edges = caseData.edges as CaseEdge[];
  const target = caseData.target;
  const path = caseData.highlightPath as string[];
  const placed = useMemo(() => layoutCase(nodes, edges, target), [nodes, edges, target]);

  const act = acts[index] as Act;
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: (FOCUS[index] ?? 0) * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  }, [index]);
  const visible = (id: string) => {
    if (act.reveal === null) return true;
    const d = placed.get(id)?.distance;
    return d !== null && d !== undefined && d <= act.reveal;
  };
  const showRisk = index >= 2;
  const showPath = index >= 4;
  const pathEdges = new Set(path.slice(1).map((id, i) => `${path[i]}>${id}`));
  const pathD = path
    .map((id, i) => {
      const p = placed.get(id) as { x: number; y: number };
      return `${i === 0 ? "M" : "L"}${p.x} ${p.y}`;
    })
    .join("");

  const toneOf = (n: CaseNode): Tone | "target" | "plain" => {
    if (n.id === target) return index >= 5 ? "refuse" : "target";
    if (n.id === "TNormalUser01" && index >= 5) return "pass";
    if (showRisk && (n.motif || n.score >= 0.8)) return "warn";
    return "plain";
  };

  const key = `${act.id}-${nonce}`;

  return (
    <ReplayFrame
      ref={ref}
      label="ChainLens"
      venue={t(l("Synthetic scenario · TRC-20 USDT", "合成情境 · TRC-20 USDT"))}
      items={acts}
      index={index}
      playing={playing}
      canPlay={canPlay}
      goTo={goTo}
      toggle={toggle}
      note={l(
        "Replay of ChainLens's built-in screening case, drawn from the project's own snapshot (53 addresses, 63 transfers). The scenario graph is synthetic; the GNN benchmark is offline and plays no part in this decision.",
        "重播鏈鏡內建的篩查案例，圖資料取自專案快照（53 個地址、63 筆轉帳）。情境圖為合成資料；GNN 基準是離線研究，不參與這個判定。",
      )}
      liveUrl="https://chain-lens-beta.vercel.app"
    >
      <div ref={scrollerRef} className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
          role="img"
          aria-label={t(act.caption)}
        >
          {columnHeads.map((h) => (
            <text key={h.col} x={columnX(h.col)} y={44} className={styles.colHead} textAnchor="middle">
              {t(h.label)}
            </text>
          ))}

          <g>
            {edges.map((e) => {
              const from = placed.get(e.s);
              const to = placed.get(e.t);
              if (!from || !to) return null;
              const on = visible(e.s) && visible(e.t);
              const hot = showPath && pathEdges.has(`${e.s}>${e.t}`);
              return (
                <motion.path
                  key={`${e.s}>${e.t}`}
                  d={edgePath(from, to)}
                  className={hot ? styles.edgeHot : styles.edge}
                  initial={false}
                  animate={{ opacity: on ? (showPath && !hot ? 0.35 : 1) : 0 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </g>

          {showPath && (
            <motion.path
              key={`trail-${key}`}
              d={pathD}
              className={styles.trail}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          )}

          <g>
            {nodes.map((n) => {
              const p = placed.get(n.id);
              if (!p) return null;
              const on = visible(n.id);
              const tone = toneOf(n);
              const big = n.id === target || n.id === "TAggregator01";
              return (
                <motion.g
                  key={n.id}
                  initial={false}
                  animate={{ opacity: on ? (showPath && !path.includes(n.id) && tone === "plain" ? 0.45 : 1) : 0 }}
                  transition={{ duration: 0.45, delay: on && act.reveal !== null ? 0.15 : 0 }}
                >
                  {n.id === target && (
                    <circle cx={p.x} cy={p.y} r={22} className={styles.halo} data-tone={tone} />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={big ? 10 : n.role === "peel_side" ? 4 : 7}
                    className={styles.node}
                    data-tone={tone}
                  />
                  {LABELLED.has(n.id) && (n.id !== "TNormalUser01" || index >= 3) && (
                    <text
                      x={p.x}
                      y={p.y + (n.id === "TNormalUser01" ? -16 : 28)}
                      className={styles.nodeLabel}
                      data-tone={tone}
                      textAnchor="middle"
                    >
                      {n.id}
                      {n.id === "TNormalUser01" && index >= 5 ? " · 0.10" : ""}
                    </text>
                  )}
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className={styles.readout}>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>{t(l("Requested", "申請金額"))}</span>
          <span className={styles.cellValue}>{fmt(caseData.amountUsdt)} USDT</span>
        </div>
        <div className={styles.cell} data-on={index >= 4}>
          <span className={styles.cellLabel}>{t(l("Own structure", "自身結構"))}</span>
          <span className={styles.cellValue}>{index >= 4 ? caseData.selfScore.toFixed(2) : "—"}</span>
        </div>
        <div className={styles.cell} data-on={index >= 4}>
          <span className={styles.cellLabel}>{t(l("Linked risk", "關聯風險"))}</span>
          <span className={styles.cellValue}>{index >= 4 ? caseData.associationScore.toFixed(2) : "—"}</span>
        </div>
        <div className={styles.cell} data-on={index >= 4} data-strong="true">
          <span className={styles.cellLabel}>{t(l("Combined", "綜合風險"))}</span>
          <span className={styles.cellValue}>{index >= 4 ? caseData.riskScore.toFixed(2) : "—"}</span>
        </div>
        <div className={styles.cell} data-decision={index >= 5}>
          <span className={styles.cellLabel}>{t(l("Decision", "判定"))}</span>
          <span className={styles.cellValue}>
            {index >= 5 ? t(l("Hold · review", "暫緩 · 人工審查")) : index === 0 ? t(l("List check: release", "名單比對：放行")) : "…"}
          </span>
        </div>
      </div>

      <p className={styles.caption} aria-live="polite">
        {t(act.caption)}
      </p>
    </ReplayFrame>
  );
};

export default ChainLensReplay;
