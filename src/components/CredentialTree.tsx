"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L, type Lang } from "@/i18n/config";
import { wrapCanvasText } from "./wrapCanvasText";
import styles from "./CredentialTree.module.css";

/**
 * The record on this site, drawn as a Merkle credential: eight claims hashed
 * pairwise up to one root signed as did:web:zuemen.net. Pointing at a claim
 * discloses only that line, plus the three sibling hashes a verifier needs to
 * recompute the root; the other seven stay hidden. It illustrates selective
 * disclosure — the hashes are a non-cryptographic FNV-1a stand-in and nothing
 * here is a verifiable proof, which the caption says.
 *
 * Canvas technique follows nearhackathon.com: a pre-rendered hex glyph atlas
 * (drawImage per cell, no fillText), 30 fps cap, paused off-screen, in a hidden
 * tab, under prefers-reduced-motion, or by the pause button (WCAG 2.2.2).
 */

// [key, value, issuer] — wording matches data/experience.ts, data/awards.ts and
// the TABEI summit listing (chain.tw annuals/2026: Associate Researcher, TABEI).
const CLAIMS: [string, L, L][] = [
  ["education", l("NCCU · Management Information Systems ’27", "政大資訊管理學系 ’27"), l("National Chengchi University", "國立政治大學")],
  ["tabei", l("Associate Researcher · TABEI", "臺灣區塊鏈愛好者協會 副研究員"), l("TABEI", "臺灣區塊鏈愛好者協會")],
  ["cathay", l("PM Intern · Blockchain Technology Development", "區塊鏈技術發展科 專案管理實習生"), l("Cathay Financial Holdings", "國泰金控")],
  ["research", l("Research Assistant · AI + Quantum Computing", "AI + 量子計算計畫 研究助理"), l("NCCU MIS", "政大資管系")],
  ["award.1", l("FinTech Taipei Awards 2026 — Winner", "2026 台北金融科技獎 — 獲獎"), l("FinTech Taipei", "台北金融科技獎")],
  ["award.2", l("GLEIF Appreciation Award", "GLEIF 感謝獎"), l("GLEIF", "GLEIF")],
  ["award.3", l("Digital Credential Challenge 2025 — Merit", "2025 數位憑證情境創新挑戰賽 — 優選"), l("Ministry of Digital Affairs", "數位發展部")],
  ["talk", l("Opening remarks · Taiwan Blockchain Summit 2026 — Trustworthy AI", "引言人 · 第 11 屆臺灣區塊鏈 Ai 好者年會"), l("TABEI · 2026-11-23", "臺灣區塊鏈愛好者協會 · 2026-11-23")],
];

const TEXT = {
  title: l("My record, as a credential", "我的經歷，是一張可驗證憑證"),
  subtitle: l(
    "Pick a claim: only that line is disclosed, with the hashes that tie it to the signed root. The other seven stay hidden and still check out.",
    "點選任一項：只揭露那一條，以及把它連到已簽章 root 的雜湊；其餘七條保持遮住，仍然驗得到。",
  ),
  revealed: l("REVEALED CLAIM", "已揭露"),
  leafRevealed: l("revealed", "已揭露"),
  issuer: l("issuer", "發證單位"),
  sees: l("verifier sees 1 of 8 claims", "驗證者只看到 8 條中的 1 條"),
  proof: l("3 proof hashes · root matches ✓", "3 個證明雜湊 · root 相符 ✓"),
  note: l(
    "Illustration — the hashes are a demonstrative stand-in, not a cryptographic proof.",
    "示意動畫 — 雜湊為示範用，不是密碼學證明。",
  ),
  canvas: l(
    "Illustration: a Merkle tree of eight claims from this record under a root labelled did:web:zuemen.net. Selecting a claim reveals only that claim and the sibling hashes along its path to the root.",
    "示意：以八條經歷組成的 Merkle 樹，root 標示為 did:web:zuemen.net。選取任一條時，只揭露該條與通往 root 的兄弟雜湊。",
  ),
  pause: l("Pause animation", "暫停動畫"),
  play: l("Play animation", "播放動畫"),
};

// FNV-1a 32-bit → 8 hex chars. Demonstrative only.
const h32 = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

type Node = { hash: string };
// Leaves hash the English text so the tree is the same in both languages.
const LEVELS: Node[][] = (() => {
  const levels: Node[][] = [CLAIMS.map(([k, v, iss]) => ({ hash: h32(`${k}=${v.en}|${iss.en}`) }))];
  while (levels[levels.length - 1]!.length > 1) {
    const prev = levels[levels.length - 1]!;
    const next: Node[] = [];
    for (let i = 0; i < prev.length; i += 2) next.push({ hash: h32(prev[i]!.hash + prev[i + 1]!.hash) });
    levels.push(next);
  }
  return levels;
})();
const DEPTH = LEVELS.length; // 4: 8 → 4 → 2 → 1

// Role of node i on level lv when `leaf` is disclosed.
const roleOf = (lv: number, i: number, leaf: number) =>
  leaf >> lv === i ? "path" : ((leaf >> lv) ^ 1) === i ? "proof" : "hidden";

const CredentialTree = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Read inside the draw loop without restarting the effect.
  const langRef = useRef<Lang>(lang);
  const pausedRef = useRef(false);
  const nudgeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = getComputedStyle(document.documentElement);
    const c = (name: string) => root.getPropertyValue(name).trim();
    const col = {
      panel: c("--color-surface"),
      soft: c("--color-accent-soft"),
      border: c("--color-border"),
      rule: c("--color-rule"),
      text: c("--color-text-primary"),
      text2: c("--color-text-secondary"),
      muted: c("--color-text-tertiary"),
      label: c("--color-label"),
      accent: c("--color-accent"),
      pass: c("--color-pass"),
      warn: c("--color-warn"),
    };
    const mono = getComputedStyle(canvas).fontFamily;

    const HEX = "0123456789abcdef";
    const CELL = 18;
    const CARD_H = 92; // room for a two-line claim
    const TOUCH_HOLD = 4; // extra seconds before auto-advance after a tap
    const atlas = document.createElement("canvas");
    const actx = atlas.getContext("2d")!;
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, narrow = false, phoneW = 58;
    let xy: { x: number; y: number }[][] = [];
    let card = { x: 0, y: 0, w: 0, h: CARD_H };
    let sel = 1, auto = 0, time = 0, raf = 0, last = 0, visible = true, disposed = false;
    const ptr = { x: 0, y: 0, active: false, tapped: false, idle: 99 };

    function layout() {
      const r = canvas!.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height; narrow = W < 640;
      canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      atlas.width = HEX.length * CELL * dpr; atlas.height = CELL * dpr;
      actx.setTransform(dpr, 0, 0, dpr, 0, 0);
      actx.clearRect(0, 0, HEX.length * CELL, CELL);
      actx.fillStyle = col.accent; actx.font = `12px ${mono}`;
      actx.textAlign = "center"; actx.textBaseline = "middle";
      [...HEX].forEach((ch, i) => actx.fillText(ch, i * CELL + CELL / 2, CELL / 2));
      cols = Math.ceil(W / CELL); rows = Math.ceil(H / CELL);

      card = { x: 16, y: 16, w: narrow ? W - 32 : Math.min(460, W * 0.5), h: CARD_H };
      if (narrow) {
        // Phones: root on the left, the eight claims stacked down the right.
        const top = card.y + card.h + 28, bottom = H - 44;
        // Four columns of nodes plus ~68px right of the leaves for their labels;
        // narrow the nodes so neighbouring columns never overlap.
        phoneW = Math.max(42, Math.min(58, Math.floor((W - 32 - 68 - 12) / 4)));
        const left = 16 + phoneW / 2, right = W - 16 - 68 - phoneW / 2;
        xy = LEVELS.map((lv, li) =>
          lv.map((_, i) => {
            const span = (bottom - top) / lv.length;
            return { x: right - (right - left) * (li / (DEPTH - 1)), y: top + span * (i + 0.5) };
          }),
        );
      } else {
        const top = 46, bottom = H - 96, padX = Math.max(40, W * 0.06);
        xy = LEVELS.map((lv, li) =>
          lv.map((_, i) => {
            const span = (W - padX * 2) / lv.length;
            return { x: padX + span * (i + 0.5), y: bottom - (bottom - top) * (li / (DEPTH - 1)) };
          }),
        );
      }
    }

    function draw(dt: number) {
      const lng = langRef.current;
      const still = pausedRef.current;
      ctx!.clearRect(0, 0, W, H);

      // Background: flickering hex cells from the atlas.
      const tick = Math.floor(time * 8);
      for (let r = 0; r < rows; r++)
        for (let cc = 0; cc < cols; cc++) {
          const n = Math.imul(r * 131 + cc + 1, 0x9e3779b1) >>> 0;
          ctx!.globalAlpha = 0.012 + 0.03 * (((n >>> 8) % 100) / 100) * (0.5 + 0.5 * Math.sin(time * 1.3 + (n % 17)));
          const ch = (n + (still ? 0 : tick * ((n % 3) + 1))) % 16;
          ctx!.drawImage(atlas, ch * CELL * dpr, 0, CELL * dpr, CELL * dpr, cc * CELL, r * CELL, CELL, CELL);
        }
      ctx!.globalAlpha = 1;

      // Which claim is disclosed: nearest leaf to the pointer, else auto-advance.
      ptr.idle += dt;
      if (ptr.active || ptr.tapped) {
        ptr.tapped = false; // a tap can lift before this frame runs
        auto = 0;
        let best = Infinity;
        xy[0]!.forEach((p, i) => {
          const d = narrow ? Math.abs(p.y - ptr.y) : Math.abs(p.x - ptr.x);
          if (d < best) { best = d; sel = i; }
        });
      } else if (!still && ptr.idle > 1.5) {
        auto += dt;
        if (auto > 2.6) { auto = 0; sel = (sel + 3) % 8; }
      }

      const grow = still ? 1 : clamp01(time / 2.2);
      const leafW = narrow ? phoneW : Math.min(86, (W - 2 * Math.max(40, W * 0.06)) / 8 - 10);

      // Edges, centre to centre; boxes are drawn over them.
      for (let lv = 1; lv < DEPTH; lv++)
        xy[lv]!.forEach((p, i) => {
          const k = smooth(grow * (DEPTH - 1) - (lv - 1));
          if (k <= 0) return;
          for (const s of [0, 1]) {
            const ch = xy[lv - 1]![i * 2 + s]!;
            const hot = roleOf(lv - 1, i * 2 + s, sel) !== "hidden" && roleOf(lv, i, sel) === "path";
            ctx!.strokeStyle = hot ? col.accent : col.rule;
            ctx!.globalAlpha = hot ? 0.9 : 0.5;
            ctx!.lineWidth = hot ? 1.6 : 1;
            ctx!.beginPath();
            ctx!.moveTo(ch.x, ch.y);
            ctx!.lineTo(ch.x + (p.x - ch.x) * k, ch.y + (p.y - ch.y) * k);
            ctx!.stroke();
          }
        });

      ctx!.textAlign = "center"; ctx!.textBaseline = "middle";
      for (let lv = 0; lv < DEPTH; lv++)
        xy[lv]!.forEach((p, i) => {
          const k = smooth(grow * (DEPTH - 1) - lv + 1);
          if (k <= 0) return;
          const role = roleOf(lv, i, sel);
          const isRoot = lv === DEPTH - 1, isLeaf = lv === 0;
          const stroke = isRoot ? col.pass : role === "path" ? (isLeaf ? col.pass : col.accent) : role === "proof" ? col.warn : col.rule;
          const w = narrow ? phoneW : isLeaf ? leafW : 86, h = narrow ? 24 : 26;
          ctx!.globalAlpha = k;
          ctx!.fillStyle = role === "hidden" ? col.panel : col.soft;
          ctx!.strokeStyle = stroke; ctx!.lineWidth = role === "hidden" ? 1 : 1.4;
          ctx!.beginPath(); ctx!.roundRect(p.x - w / 2, p.y - h / 2, w, h, 2); ctx!.fill(); ctx!.stroke();
          const shown = !isLeaf || role !== "hidden";
          ctx!.fillStyle = role === "hidden" ? col.muted : col.text;
          const digits = w < 60 ? 4 : w < 80 ? 5 : 6;
          ctx!.font = `${w < 80 ? 10 : 11}px ${mono}`;
          ctx!.fillText(shown ? "0x" + LEVELS[lv]![i]!.hash.slice(0, digits) : "0x" + "•".repeat(digits), p.x, p.y + 0.5);
          if (isLeaf) {
            ctx!.fillStyle = role === "path" ? col.pass : col.muted;
            ctx!.font = `11px ${mono}`;
            if (narrow) { ctx!.textAlign = "left"; ctx!.fillText(CLAIMS[i]![0], p.x + w / 2 + 8, p.y); ctx!.textAlign = "center"; }
            else {
              ctx!.fillText(CLAIMS[i]![0], p.x, p.y + 30);
              ctx!.fillStyle = role === "path" ? col.text : col.rule;
              ctx!.fillText(role === "path" ? pick(TEXT.leafRevealed, lng) : "•••", p.x, p.y + 46);
            }
          }
          if (isRoot) {
            ctx!.font = `10px ${mono}`; ctx!.fillStyle = col.pass;
            if (narrow) {
              ctx!.fillStyle = col.panel; ctx!.fillRect(p.x - 38, p.y - 37, 76, 26);
              ctx!.fillStyle = col.pass; ctx!.fillText("did:web:", p.x, p.y - 30); ctx!.fillText("zuemen.net ✓", p.x, p.y - 18);
            }
            else ctx!.fillText("did:web:zuemen.net  ✓", p.x, p.y - 24);
          }
          ctx!.globalAlpha = 1;
        });

      // Disclosure card.
      const [key, val, iss] = CLAIMS[sel]!;
      ctx!.globalAlpha = smooth(grow * (DEPTH - 1) - (DEPTH - 2));
      ctx!.font = `${narrow ? 13 : 14}px ${mono}`;
      const valLines = wrapCanvasText(ctx!, pick(val, lng), card.w - 28, 2);
      const extra = (valLines.length - 1) * 18;
      ctx!.fillStyle = col.soft; ctx!.strokeStyle = col.pass; ctx!.lineWidth = 1.2;
      ctx!.beginPath(); ctx!.roundRect(card.x, card.y, card.w, card.h - 18 + extra, 2); ctx!.fill(); ctx!.stroke();
      ctx!.textAlign = "left";
      ctx!.font = `10px ${mono}`; ctx!.fillStyle = col.label;
      ctx!.fillText(`${pick(TEXT.revealed, lng)} · ${key.toUpperCase()}`, card.x + 14, card.y + 18);
      ctx!.font = `${narrow ? 13 : 14}px ${mono}`; ctx!.fillStyle = col.text;
      valLines.forEach((line, i) => ctx!.fillText(line, card.x + 14, card.y + 40 + i * 18, card.w - 28));
      ctx!.font = `11px ${mono}`; ctx!.fillStyle = col.pass;
      ctx!.fillText(`${pick(TEXT.issuer, lng)} · ${pick(iss, lng)}`, card.x + 14, card.y + 60 + extra, card.w - 28);

      // Footer line inside the canvas.
      ctx!.globalAlpha = 1; ctx!.font = `11px ${mono}`;
      ctx!.fillStyle = col.muted; ctx!.fillText(pick(TEXT.sees, lng), 16, H - 18);
      if (!narrow) { ctx!.textAlign = "right"; ctx!.fillStyle = col.warn; ctx!.fillText(pick(TEXT.proof, lng), W - 16, H - 18); }
      ctx!.textAlign = "center";
    }

    const FRAME = 1000 / 30;
    const running = () => visible && !document.hidden && !pausedRef.current && !disposed;
    function tick(now: number) {
      raf = 0;
      if (!running()) return;
      if (!last) last = now - FRAME;
      const d = now - last;
      if (d >= FRAME - 0.5) {
        const dt = Math.min(d / 1000, 0.05);
        last = now; time += dt; draw(dt);
      }
      schedule();
    }
    function schedule() {
      if (!running()) { cancelAnimationFrame(raf); raf = 0; last = 0; draw(0); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.active = true; ptr.tapped = true; ptr.idle = 0;
      if (pausedRef.current) draw(0); // still respond while paused
    };
    // A finger lifts as soon as it taps, so hold that claim long enough to read.
    const onLeave = (e: PointerEvent) => {
      ptr.active = false;
      if (e.pointerType === "touch") ptr.idle = -TOUCH_HOLD;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => { layout(); draw(0); });
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; schedule(); });
    ro.observe(canvas); io.observe(canvas);
    document.addEventListener("visibilitychange", schedule);
    document.fonts?.ready.then(() => { if (!disposed) { layout(); draw(0); } });
    layout(); draw(0); schedule();
    // Lets the pause button and language toggle resume or redraw at once.
    nudgeRef.current = schedule;

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Pause/play or a language switch: update what the loop reads, then resume or
  // redraw without rebuilding it.
  useEffect(() => {
    langRef.current = lang;
    pausedRef.current = paused || !!reduced;
    nudgeRef.current();
  }, [paused, reduced, lang]);

  return (
    <section id="credential" className={styles.section}>
      <div className="section-wide">
        <SectionHeading wide title={t(TEXT.title)} subtitle={t(TEXT.subtitle)} />
        {!reduced && (
          <button type="button" className={styles.motion} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {t(paused ? TEXT.play : TEXT.pause)}
          </button>
        )}
        <div className={styles.stage}>
          <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label={t(TEXT.canvas)} />
        </div>
        <p className={styles.note}>{t(TEXT.note)}</p>
      </div>
    </section>
  );
};

export default CredentialTree;
