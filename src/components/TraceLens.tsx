"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L, type Lang } from "@/i18n/config";
import { wrapCanvasText } from "./wrapCanvasText";
import styles from "./TraceLens.module.css";

/**
 * The 404 page's easter egg: a ChainLens-style analyst lens over a synthetic
 * transaction graph. The suspicious path is ChainLens scenario 07 (as in
 * zuemen/zuemen manim/projects.py): sources pool into an OTC out-address, two
 * fast in-out relays (~8 min per hop), then 200,000 USDT to TRelay03. Sweeping
 * the lens over the path names each pattern; once it has seen the whole path,
 * the verdict reads like the demo — rule engine 0.19 release, graph model 0.98
 * escalates, a person decides.
 *
 * 30 fps cap; stops off-screen, in hidden tabs and under prefers-reduced-motion
 * (then it draws one still frame with the whole path revealed).
 */

const T = {
  aria: l(
    "A transaction graph with a magnifying lens that follows your pointer or finger. Inside the lens, a suspicious path is labelled: pooled sources, an OTC out-address, two fast relays and the destination TRelay03.",
    "一張交易圖，放大鏡跟著游標或手指移動。鏡內會標出可疑路徑：多個來源集資到 OTC 出金地址，經兩個快進快出中繼，最後到 TRelay03。",
  ),
  idle: l("tap or sweep the lens over the graph", "點一下或移動放大鏡到圖上"),
  found: l("found", "已發現"),
  verdict: l("rule engine 0.19 · release → graph model 0.98 · enhanced review → a person decides", "規則引擎 0.19 · 放行 → 圖模型 0.98 · 加強審查 → 由人決定"),
  caption: l("ChainLens · synthetic scenario 07 · illustration", "ChainLens · 合成情境 07 · 示意"),
};

type Tag = "sources" | "otc" | "relay" | "dest";
const TAG_TEXT: Record<Tag, L> = {
  sources: l("pooled sources", "多來源集資"),
  otc: l("OTC out", "OTC 出金"),
  relay: l("relay · ~8 min/hop", "中繼 · 每跳約 8 分"),
  dest: l("TRelay03", "TRelay03"),
};

// Seeded PRNG so the noise graph is identical on every visit.
const rng = (seed: number) => {
  let s = seed >>> 0;
  return () => (((s = (Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) + 0x9e3779b9) >>> 0)) / 4294967296);
};

const TraceLens = () => {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const langRef = useRef<Lang>(lang);
  const reducedRef = useRef(!!reduced);
  const nudgeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = getComputedStyle(document.documentElement);
    const c = (n: string) => root.getPropertyValue(n).trim();
    const col = {
      panel: c("--color-surface"), rule: c("--color-rule"), text: c("--color-text-primary"),
      text2: c("--color-text-secondary"), muted: c("--color-text-tertiary"),
      accent: c("--color-accent"), pass: c("--color-pass"), warn: c("--color-warn"),
    };
    const mono = getComputedStyle(canvas).fontFamily;

    // ── Graph: normalised coordinates, converted to pixels on resize ──
    type N = { nx: number; ny: number; tag: Tag | null; x: number; y: number };
    type E = { a: number; b: number; sus: boolean; len: number };
    const nodes: N[] = [], edges: E[] = [];
    const add = (nx: number, ny: number, tag: Tag | null = null) => (nodes.push({ nx, ny, tag, x: 0, y: 0 }), nodes.length - 1);
    const link = (a: number, b: number, sus = false) => edges.push({ a, b, sus, len: 0 });
    const R = rng(7);

    const otc = add(0.34, 0.52, "otc");
    for (let i = 0; i < 5; i++) link(add(0.1 + R() * 0.06, 0.2 + i * 0.15, i === 2 ? "sources" : null), otc, true);
    const r1 = add(0.52, 0.48, "relay");
    const r2 = add(0.68, 0.55);
    const dst = add(0.88, 0.5, "dest");
    link(otc, r1, true); link(r1, r2, true); link(r2, dst, true);
    const path = [otc, r1, r2, dst];

    const base = nodes.length;
    for (let i = 0; i < 64; i++) add(0.03 + R() * 0.94, 0.06 + R() * 0.88);
    for (let i = base; i < nodes.length; i++) {
      const me = nodes[i]!;
      const near = nodes
        .map((n, j) => [j, Math.hypot(n.nx - me.nx, (n.ny - me.ny) * 0.6)] as const)
        .filter(([j]) => j !== i)
        .sort((x, y) => x[1] - y[1]);
      link(i, near[0]![0]);
      if (R() > 0.45) link(i, near[1]![0]);
    }
    const dots = edges.map((e, i) => ({ e: i, u: R(), speed: (e.sus ? 0.35 : 0.16) + R() * 0.12 }));

    let W = 0, H = 0, dpr = 1, time = 0, raf = 0, last = 0, visible = true, disposed = false;
    const lens = { x: 0, y: 0, r: 100 };
    const ptr = { x: 0, y: 0, active: false, hold: 0 };
    const TOUCH_HOLD = 3; // seconds the lens stays where a finger tapped
    const found = new Set<Tag>();

    function layout() {
      const r = canvas!.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((n) => { n.x = n.nx * W; n.y = n.ny * (H - 44) + 8; });
      edges.forEach((e) => { e.len = Math.hypot(nodes[e.b]!.x - nodes[e.a]!.x, nodes[e.b]!.y - nodes[e.a]!.y); });
      lens.r = Math.max(70, Math.min(110, W * 0.14));
      if (!lens.x) { lens.x = W * 0.3; lens.y = H * 0.5; }
    }

    const inLens = (x: number, y: number) => reducedRef.current || Math.hypot(x - lens.x, y - lens.y) < lens.r;

    function draw(dt: number) {
      const still = reducedRef.current;
      const lng = langRef.current;
      ctx!.clearRect(0, 0, W, H);

      if (ptr.hold > 0) {
        ptr.hold -= dt;
        if (ptr.hold <= 0) ptr.active = false;
      }

      // Lens: follow the pointer, otherwise patrol along the path.
      const tx = ptr.active ? ptr.x : W * (0.5 + 0.38 * Math.sin(time * 0.33));
      const ty = ptr.active ? ptr.y : (H - 44) * (0.5 + 0.22 * Math.sin(time * 0.66 + 1)) + 8;
      const a = 1 - Math.exp(-(ptr.active ? 12 : 3) * dt);
      lens.x += (tx - lens.x) * a; lens.y += (ty - lens.y) * a;

      for (const e of edges) {
        const A = nodes[e.a]!, B = nodes[e.b]!;
        const inside = inLens((A.x + B.x) / 2, (A.y + B.y) / 2);
        ctx!.strokeStyle = inside && e.sus ? col.warn : col.rule;
        ctx!.globalAlpha = inside ? (e.sus ? 0.9 : 0.5) : 0.15;
        ctx!.lineWidth = inside && e.sus ? 1.6 : 1;
        ctx!.beginPath(); ctx!.moveTo(A.x, A.y); ctx!.lineTo(B.x, B.y); ctx!.stroke();
      }

      for (const d of dots) {
        const e = edges[d.e]!, A = nodes[e.a]!, B = nodes[e.b]!;
        if (!still) d.u = (d.u + d.speed * dt * (120 / Math.max(e.len, 40))) % 1;
        const x = A.x + (B.x - A.x) * d.u, y = A.y + (B.y - A.y) * d.u;
        const inside = inLens(x, y);
        ctx!.globalAlpha = inside ? 0.95 : 0.2;
        ctx!.fillStyle = inside && e.sus ? col.warn : col.text2;
        ctx!.beginPath(); ctx!.arc(x, y, inside ? 2.1 : 1.3, 0, Math.PI * 2); ctx!.fill();
      }

      ctx!.textAlign = "center"; ctx!.textBaseline = "middle"; ctx!.font = `11px ${mono}`;
      for (const n of nodes) {
        const inside = inLens(n.x, n.y);
        const onPath = path.includes(nodes.indexOf(n));
        ctx!.globalAlpha = inside ? 1 : 0.28;
        ctx!.fillStyle = col.panel;
        ctx!.strokeStyle = (n.tag || onPath) && inside ? col.warn : col.muted;
        ctx!.lineWidth = onPath ? 1.6 : 1;
        ctx!.beginPath(); ctx!.arc(n.x, n.y, onPath ? 6 : 3.4, 0, Math.PI * 2); ctx!.fill(); ctx!.stroke();
        if (n.tag && inside) found.add(n.tag);
      }

      if (!still) {
        ctx!.globalAlpha = 1; ctx!.strokeStyle = col.accent; ctx!.lineWidth = 1.2;
        ctx!.beginPath(); ctx!.arc(lens.x, lens.y, lens.r, 0, Math.PI * 2); ctx!.stroke();
        ctx!.globalAlpha = 0.5;
        for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]] as const) {
          ctx!.beginPath();
          ctx!.moveTo(lens.x + dx * (lens.r - 8), lens.y + dy * (lens.r - 8));
          ctx!.lineTo(lens.x + dx * (lens.r + 6), lens.y + dy * (lens.r + 6));
          ctx!.stroke();
        }
      }

      // Labels go above the nodes and the lens ring, on a backing so they stay legible.
      const label = (text: string, x: number, y: number, color: string) => {
        const w = ctx!.measureText(text).width;
        const cx = Math.max(w / 2 + 6, Math.min(W - w / 2 - 6, x));
        ctx!.globalAlpha = 0.9; ctx!.fillStyle = col.panel;
        ctx!.fillRect(cx - w / 2 - 3, y - 8, w + 6, 16);
        ctx!.globalAlpha = 1; ctx!.fillStyle = color;
        ctx!.fillText(text, cx, y);
      };
      ctx!.textAlign = "center";
      for (const n of nodes) {
        if (!n.tag || !inLens(n.x, n.y)) continue;
        // On narrow screens the relay label is too wide to share a row with OTC.
        const above = n.tag === "relay" && W < 480 ? 32 : 15;
        label(pick(TAG_TEXT[n.tag], lng), n.x, n.y - above, col.warn);
        if (n.tag === "dest") label("200,000 USDT", n.x, n.y + 17, col.text2);
      }

      // Footer line: progress, then the verdict once the whole path was seen.
      ctx!.globalAlpha = 1; ctx!.textAlign = "left"; ctx!.font = `11px ${mono}`;
      const seen = (["sources", "otc", "relay", "dest"] as Tag[]).filter((k) => found.has(k));
      const done = seen.length === 4;
      const status = done
        ? pick(T.verdict, lng)
        : seen.length
          ? `${pick(T.found, lng)}: ${seen.map((k) => pick(TAG_TEXT[k], lng)).join(" → ")}`
          : pick(T.idle, lng);
      const lines = wrapCanvasText(ctx!, status, W - 24, 3);
      const band = lines.length * 15 + 13;
      ctx!.fillStyle = col.panel;
      ctx!.fillRect(0, H - band, W, band);
      ctx!.fillStyle = done ? col.pass : seen.length ? col.warn : col.muted;
      lines.forEach((line, i) => ctx!.fillText(line, 12, H - band + 13 + i * 15, W - 24));
    }

    const FRAME = 1000 / 30;
    const running = () => visible && !document.hidden && !reducedRef.current && !disposed;
    function tick(now: number) {
      raf = 0;
      if (!running()) return;
      if (!last) last = now - FRAME;
      const d = now - last;
      if (d >= FRAME - 0.5) { const dt = Math.min(d / 1000, 0.05); last = now; time += dt; draw(dt); }
      schedule();
    }
    function schedule() {
      if (!running()) { cancelAnimationFrame(raf); raf = 0; last = 0; draw(0); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.active = true; ptr.hold = 0;
    };
    // A finger lifts as soon as it taps, so keep the lens there for a moment.
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") ptr.hold = TOUCH_HOLD;
      else ptr.active = false;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => { layout(); draw(0); });
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; schedule(); });
    ro.observe(canvas); io.observe(canvas);
    document.addEventListener("visibilitychange", schedule);
    layout(); draw(0); schedule();
    nudgeRef.current = schedule;

    return () => {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    langRef.current = lang;
    reducedRef.current = !!reduced;
    nudgeRef.current();
  }, [lang, reduced]);

  return (
    <figure className={styles.figure}>
      <div className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label={pick(T.aria, lang)} />
      </div>
      <figcaption className={styles.caption}>{pick(T.caption, lang)}</figcaption>
    </figure>
  );
};

export default TraceLens;
