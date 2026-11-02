"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type Lang } from "@/i18n/config";
import styles from "./WorkGraph.module.css";

/**
 * The work on this site as a graph, inspected with a ChainLens-style lens:
 * Zuemen Chu at the centre, every project in data/projects.ts around him, and
 * on the outside the tools two or more projects share. Lines are what the
 * projects actually list in their tags, so the lens shows real connections —
 * point it at vLEI and the projects built on it light up. Click a project to
 * jump to it on /projects.
 *
 * Reads data/projects.ts, so a new project appears here without touching this
 * file. 30 fps cap; stops off-screen, in hidden tabs and under
 * prefers-reduced-motion (then every label is drawn, nothing moves).
 */

const T = {
  aria: l(
    "A graph of this site's projects around Zuemen Chu, joined to the tools they share. A lens follows the pointer and names what it covers; selecting a project opens it on the projects page.",
    "以 Zuemen Chu 為中心的作品圖：每個專案連到它們共用的技術。放大鏡跟著游標，鏡內會顯示名稱；點專案會跳到作品頁的那一項。",
  ),
  idle: l("move the lens over my work · click a project to open it", "把放大鏡移到我的作品上 · 點專案可以打開"),
  shared: l("shared by", "共用於"),
  open: l("click to open", "點擊打開"),
  caption: l("Projects and the tools they share · from data/projects.ts", "專案與它們共用的技術 · 資料來自 data/projects.ts"),
};

const NAME = "Zuemen Chu";
const TOUCH_HOLD = 1.6; // seconds the lens stays after a finger lifts

const WorkGraph = ({ height = 420 }: { height?: number }) => {
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const router = useRouter();
  const routerRef = useRef(router);
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

    // ── Graph from data/projects.ts ──
    type Kind = "me" | "project" | "tool";
    type N = { kind: Kind; key: string; x: number; y: number; links: number[]; slug?: string; idx?: number };
    const nodes: N[] = [{ kind: "me", key: NAME, x: 0, y: 0, links: [] }];
    const edges: [number, number][] = [];

    projects.forEach((p, i) => {
      nodes.push({ kind: "project", key: p.slug, x: 0, y: 0, links: [], slug: p.slug, idx: i });
      edges.push([0, nodes.length - 1]);
    });
    // Only tools at least two projects list: those are the connections.
    const usage = new Map<string, number[]>();
    projects.forEach((p, i) => p.tags.forEach((tag) => usage.set(tag, [...(usage.get(tag) ?? []), i + 1])));
    for (const [tag, users] of usage) {
      if (users.length < 2) continue;
      nodes.push({ kind: "tool", key: tag, x: 0, y: 0, links: [] });
      const ti = nodes.length - 1;
      users.forEach((pi) => edges.push([pi, ti]));
    }
    edges.forEach(([a, b]) => { nodes[a]!.links.push(b); nodes[b]!.links.push(a); });

    const dots = edges.map((_, i) => ({ e: i, u: (i * 0.37) % 1, speed: 0.22 + ((i * 7) % 5) * 0.03 }));

    let narrow = false;
    let W = 0, H = 0, dpr = 1, time = 0, raf = 0, last = 0, visible = true, disposed = false;
    const lens = { x: 0, y: 0, r: 90 };
    const ptr = { x: 0, y: 0, active: false, hold: 0 };

    // Deterministic layout: me in the middle, projects on an inner ellipse,
    // shared tools pushed outside towards the projects that use them.
    function layout() {
      const r = canvas!.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas!.width = Math.round(W * dpr); canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = W / 2, cy = (H - 34) / 2 + 4;
      narrow = W < 640;
      const rx = Math.min(W * (narrow ? 0.3 : 0.26), 300), ry = (H - 34) * 0.3;
      const P = nodes.filter((n) => n.kind === "project");
      nodes[0]!.x = cx; nodes[0]!.y = cy;
      P.forEach((n, i) => {
        const a = -Math.PI / 2 + (i / P.length) * Math.PI * 2;
        n.x = cx + Math.cos(a) * rx; n.y = cy + Math.sin(a) * ry;
      });
      // Shared tools: order them by where their projects sit, then space them
      // evenly round an outer ring so none pile up.
      const tools = nodes
        .filter((n) => n.kind === "tool")
        .map((n) => {
          const sx = n.links.reduce((s, i) => s + Math.cos(Math.atan2((nodes[i]!.y - cy) / ry, (nodes[i]!.x - cx) / rx)), 0);
          const sy = n.links.reduce((s, i) => s + Math.sin(Math.atan2((nodes[i]!.y - cy) / ry, (nodes[i]!.x - cx) / rx)), 0);
          return { n, a: Math.atan2(sy, sx) };
        })
        .sort((p, q) => p.a - q.a);
      const offset = tools.length ? tools[0]!.a : 0;
      tools.forEach(({ n }, k) => {
        const a = offset + (k / tools.length) * Math.PI * 2;
        n.x = cx + Math.cos(a) * rx * (narrow ? 1.42 : 1.6);
        n.y = cy + Math.sin(a) * ry * 1.52;
      });
      // Push apart anything that overlaps, then keep inside the frame.
      for (let it = 0; it < 80; it++)
        for (let i = 1; i < nodes.length; i++)
          for (let j = i + 1; j < nodes.length; j++) {
            const A = nodes[i]!, B = nodes[j]!;
            const dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1, min = 54;
            if (d < min) {
              const m = (min - d) / 2;
              if (A.kind === "tool") { A.x -= (dx / d) * m; A.y -= (dy / d) * m; }
              if (B.kind === "tool") { B.x += (dx / d) * m; B.y += (dy / d) * m; }
            }
          }
      nodes.forEach((n) => { n.x = Math.max(44, Math.min(W - 44, n.x)); n.y = Math.max(18, Math.min(H - 48, n.y)); });
      lens.r = Math.max(64, Math.min(96, W * 0.11));
      if (!lens.x) { lens.x = cx; lens.y = cy; }
    }

    const inLens = (x: number, y: number) => reducedRef.current || Math.hypot(x - lens.x, y - lens.y) < lens.r;
    // Phones get a short name: the acronym in the title's brackets, else its first word.
    const shortName = (i: number, lng: Lang) => {
      const p = projects[i]!, full = pick(p.shortTitle, lng);
      if (!narrow || full.length <= 14) return full;
      const acr = /\(([A-Z]{2,})\)/.exec(p.title.en)?.[1];
      return acr ?? full.split(/\s+/)[0]!;
    };
    const label = (n: N, lng: Lang) =>
      n.kind === "project" ? shortName(n.idx!, lng) : n.kind === "me" ? (narrow ? NAME : `${NAME} 朱廷翊`) : n.key;

    // The node nearest the lens centre, if any is inside it.
    function focus(): N | null {
      let best: N | null = null, bd = Infinity;
      for (const n of nodes) {
        const d = Math.hypot(n.x - lens.x, n.y - lens.y);
        if (d < lens.r * 0.55 && d < bd) { bd = d; best = n; }
      }
      return best;
    }

    function draw(dt: number) {
      const still = reducedRef.current, lng = langRef.current;
      ctx!.clearRect(0, 0, W, H);

      if (ptr.hold > 0) { ptr.hold -= dt; if (ptr.hold <= 0) ptr.active = false; }
      // Lens: pointer, otherwise a slow tour of the project ring.
      const P = nodes.filter((n) => n.kind === "project");
      const tour = P[Math.floor(time / 3.2) % P.length]!;
      const tx = ptr.active ? ptr.x : tour.x, ty = ptr.active ? ptr.y : tour.y;
      const k = 1 - Math.exp(-(ptr.active ? 12 : 2.4) * dt);
      lens.x += (tx - lens.x) * k; lens.y += (ty - lens.y) * k;

      const f = focus();
      const lit = new Set<number>(f ? [nodes.indexOf(f), ...f.links] : []);

      // Edges
      edges.forEach(([a, b]) => {
        const A = nodes[a]!, B = nodes[b]!;
        const hot = lit.has(a) && lit.has(b) && (a === nodes.indexOf(f!) || b === nodes.indexOf(f!));
        ctx!.strokeStyle = hot ? col.accent : col.rule;
        ctx!.globalAlpha = hot ? 0.9 : inLens((A.x + B.x) / 2, (A.y + B.y) / 2) ? 0.45 : 0.18;
        ctx!.lineWidth = hot ? 1.6 : 1;
        ctx!.beginPath(); ctx!.moveTo(A.x, A.y); ctx!.lineTo(B.x, B.y); ctx!.stroke();
      });

      // Particles flowing outwards: me → projects → tools
      for (const d of dots) {
        const [a, b] = edges[d.e]!, A = nodes[a]!, B = nodes[b]!;
        if (!still) d.u = (d.u + d.speed * dt) % 1;
        const x = A.x + (B.x - A.x) * d.u, y = A.y + (B.y - A.y) * d.u;
        ctx!.globalAlpha = inLens(x, y) ? 0.9 : 0.25;
        ctx!.fillStyle = col.accent;
        ctx!.beginPath(); ctx!.arc(x, y, 1.6, 0, Math.PI * 2); ctx!.fill();
      }

      // Nodes and labels
      ctx!.textAlign = "center"; ctx!.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const inside = inLens(n.x, n.y), on = lit.has(i);
        const r = n.kind === "me" ? 9 : n.kind === "project" ? 6.5 : 4.5;
        const stroke = n.kind === "me" ? col.pass : n.kind === "project" ? col.accent : col.warn;
        ctx!.globalAlpha = on ? 1 : inside ? 0.85 : 0.35;
        ctx!.fillStyle = col.panel; ctx!.strokeStyle = stroke; ctx!.lineWidth = on ? 2 : 1.3;
        ctx!.beginPath();
        if (n.kind === "tool") ctx!.rect(n.x - r, n.y - r, r * 2, r * 2);
        else ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fill(); ctx!.stroke();

        // Name always faint; full strength in the lens or when connected.
        const show = n.kind !== "tool" || !narrow || inside || on || still;
        if (show) {
          ctx!.globalAlpha = on ? 1 : inside ? 0.9 : n.kind === "me" ? 0.75 : n.kind === "tool" ? 0.42 : 0.38;
          ctx!.fillStyle = n.kind === "me" ? col.text : n.kind === "project" ? col.text : col.warn;
          ctx!.font = `${n.kind === "me" ? 13 : 11}px ${mono}`;
          ctx!.fillText(label(n, lng), n.x, n.y + (n.kind === "tool" ? -13 : 18));
        }
      });

      // Lens
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

      // Read-out: what the lens is on, and what it connects to
      ctx!.globalAlpha = 1; ctx!.textAlign = "left"; ctx!.font = `11px ${mono}`;
      let line = pick(T.idle, lng), color = col.muted;
      if (f?.kind === "project") {
        const p = projects[f.idx!]!;
        line = `${pick(p.shortTitle, lng)} · ${pick(p.category, lng)} · ${p.tags.slice(0, 4).join(" · ")}  —  ${pick(T.open, lng)}`;
        color = col.text;
      } else if (f?.kind === "tool") {
        line = `${f.key} · ${pick(T.shared, lng)} ${f.links.map((i) => label(nodes[i]!, lng)).join(" · ")}`;
        color = col.warn;
      } else if (f?.kind === "me") {
        line = `${NAME} 朱廷翊 · ${projects.length} projects · ${nodes.filter((n) => n.kind === "tool").length} shared tools`;
        color = col.pass;
      }
      ctx!.fillStyle = color; ctx!.fillText(line, 12, H - 14, W - 24);
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

    const at = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = at(e);
      ptr.x = p.x; ptr.y = p.y; ptr.active = true; ptr.hold = 0;
      const over = nodes.some((n) => n.kind === "project" && Math.hypot(n.x - p.x, n.y - p.y) < 16);
      canvas.style.cursor = over ? "pointer" : "crosshair";
      if (reducedRef.current) draw(0);
    };
    // A finger lifts as soon as it taps, so keep the lens there for a moment.
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "touch") ptr.hold = TOUCH_HOLD;
      else ptr.active = false;
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const hit = nodes.find((n) => n.kind === "project" && Math.hypot(n.x - x, n.y - y) < 18);
      if (!hit?.slug) return;
      if (window.location.pathname === "/projects") window.location.hash = hit.slug;
      else routerRef.current.push(`/projects#${hit.slug}`);
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);
    const ro = new ResizeObserver(() => { layout(); draw(0); });
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; schedule(); });
    ro.observe(canvas); io.observe(canvas);
    document.addEventListener("visibilitychange", schedule);
    document.fonts?.ready.then(() => { if (!disposed) { layout(); draw(0); } });
    layout(); draw(0); schedule();
    nudgeRef.current = schedule;

    return () => {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    routerRef.current = router;
    langRef.current = lang;
    reducedRef.current = !!reduced;
    nudgeRef.current();
  }, [lang, reduced, router]);

  return (
    <figure className={styles.figure}>
      <div className={styles.stage} style={{ height }}>
        <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label={pick(T.aria, lang)} />
      </div>
      <figcaption className={styles.caption}>{pick(T.caption, lang)}</figcaption>
    </figure>
  );
};

export default WorkGraph;
