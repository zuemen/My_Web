/*
 * Ported from github.com/zuemen/ChainLens web/src/graph/replayLayout.ts (MIT,
 * same author), trimmed to what the replay here draws. The scenario graph has
 * known roles, so nodes are laid out in laundering-stage columns —
 * collection, layering, integration — rather than by a force simulation.
 */

export interface CaseNode {
  id: string;
  role: string;
  score: number;
  motif: boolean;
}

export interface CaseEdge {
  s: string;
  t: string;
  a: number;
}

export interface Placed {
  id: string;
  role: string;
  x: number;
  y: number;
  /** Hops upstream of the withdrawal target, against the flow of funds. */
  distance: number | null;
}

export const STAGE = { width: 1200, height: 560 };

const COLUMN_X0 = 70;
const COLUMN_GAP = 150;
const BAND_TOP = 96;
const BAND_BOTTOM = 410;
const MAX_ROW_GAP = 46;
const NORMAL_STRIP_Y = 528;
const NORMAL_X0 = 770;
const NORMAL_GAP = 90;

const columnOf = (id: string, role: string): number | null => {
  switch (role) {
    case "victim":
      return 0;
    case "support":
      return 1;
    case "aggregator":
      return 2;
    case "mule":
      return 3;
    case "peel":
      return 4 + Number(id.at(-1) ?? 0);
    case "otc":
      return 7;
    default:
      return null;
  }
};

export const columnX = (column: number) => COLUMN_X0 + column * COLUMN_GAP;

const reverseDistances = (edges: CaseEdge[], target: string) => {
  const incoming = new Map<string, string[]>();
  for (const e of edges) incoming.set(e.t, [...(incoming.get(e.t) ?? []), e.s]);
  const distances = new Map<string, number>([[target, 0]]);
  const queue = [target];
  while (queue.length > 0) {
    const current = queue.shift() as string;
    for (const source of incoming.get(current) ?? []) {
      if (!distances.has(source)) {
        distances.set(source, (distances.get(current) as number) + 1);
        queue.push(source);
      }
    }
  }
  return distances;
};

const spread = (count: number) => {
  if (count === 1) return [(BAND_TOP + BAND_BOTTOM) / 2];
  const gap = Math.min(MAX_ROW_GAP * 2.2, (BAND_BOTTOM - BAND_TOP) / (count - 1));
  const top = (BAND_TOP + BAND_BOTTOM) / 2 - (gap * (count - 1)) / 2;
  return Array.from({ length: count }, (_, i) => top + gap * i);
};

export const layoutCase = (nodes: CaseNode[], edges: CaseEdge[], target: string) => {
  const distances = reverseDistances(edges, target);
  const placed = new Map<string, Placed>();
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const e of edges) {
    incoming.set(e.t, [...(incoming.get(e.t) ?? []), e.s]);
    outgoing.set(e.s, [...(outgoing.get(e.s) ?? []), e.t]);
  }

  const columns = new Map<number, string[]>();
  for (const node of nodes) {
    const column = columnOf(node.id, node.role);
    if (column !== null) columns.set(column, [...(columns.get(column) ?? []), node.id]);
  }
  const roleOf = new Map(nodes.map((n) => [n.id, n.role]));

  for (const column of [...columns.keys()].sort((a, b) => a - b)) {
    const ids = columns.get(column) as string[];
    const anchor = (id: string) => {
      const parents = (incoming.get(id) ?? []).filter((p) => placed.has(p));
      if (parents.length === 0) return Number.NaN;
      return parents.reduce((sum, p) => sum + (placed.get(p) as Placed).y, 0) / parents.length;
    };
    const sorted =
      column === 0
        ? [...ids].sort((a, b) =>
            `${(outgoing.get(a) ?? [""])[0]}${a}`.localeCompare(`${(outgoing.get(b) ?? [""])[0]}${b}`),
          )
        : [...ids].sort((a, b) => {
            const delta = anchor(a) - anchor(b);
            return Number.isNaN(delta) || delta === 0 ? a.localeCompare(b) : delta;
          });
    const ys = spread(sorted.length);
    sorted.forEach((id, i) => {
      placed.set(id, {
        id,
        role: roleOf.get(id) as string,
        x: columnX(column),
        y: ys[i] ?? 0,
        distance: distances.get(id) ?? null,
      });
    });
  }

  // Small peeled-off amounts hang above-right of their source.
  for (const node of nodes) {
    if (node.role !== "peel_side") continue;
    const parent = (incoming.get(node.id) ?? []).map((id) => placed.get(id)).find(Boolean);
    if (!parent) continue;
    placed.set(node.id, { id: node.id, role: node.role, x: parent.x + 66, y: parent.y - 30, distance: null });
  }

  // Unrelated normal activity sits in a strip along the bottom, for contrast.
  nodes
    .filter((n) => !placed.has(n.id))
    .forEach((node, i) => {
      placed.set(node.id, {
        id: node.id,
        role: node.role,
        x: NORMAL_X0 + i * NORMAL_GAP,
        y: NORMAL_STRIP_Y,
        distance: distances.get(node.id) ?? null,
      });
    });

  return placed;
};

/** Long edges that would cross a column arc between rows instead. */
export const edgePath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  if (Math.abs(to.x - from.x) <= COLUMN_GAP * 1.5) return `M${from.x} ${from.y}L${to.x} ${to.y}`;
  const cx = (from.x + to.x) / 2;
  const bend = Math.min(from.y, to.y) >= NORMAL_STRIP_Y ? -56 : 96;
  const cy = (from.y + to.y) / 2 + bend;
  return `M${from.x} ${from.y}Q${cx} ${cy} ${to.x} ${to.y}`;
};
