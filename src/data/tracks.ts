import { l, type L } from "@/i18n/config";

export type TrackId = "mandates" | "identity" | "risk" | "earlier";

export interface Track {
  id: TrackId;
  /** Short numeral-free label for chips and the nav rail. */
  label: L;
  title: L;
  /** One sentence: the claim the projects in this track are evidence for. */
  thesis: L;
}

/**
 * The work groups into three theses. Readers from investment and startups
 * scan for a direction first and a project list second, so /projects and the
 * homepage both lead with these, and every project belongs to exactly one.
 */
export const tracks: Track[] = [
  {
    id: "mandates",
    label: l("Agent mandates", "Agent 授權"),
    title: l("Bounded authority for agents that move money", "替會動用資金的 AI agent 設下邊界"),
    thesis: l(
      "Before an AI agent pays, trades or transfers, the counterparty should be able to check who authorised it, what it may do, and whether that still holds — inside the transaction, not in a dashboard after the fact.",
      "AI agent 付款、交易或轉帳之前，對手方應該能查證：誰授權了它、它被允許做什麼、授權是否仍有效——而且是在交易當下檢查，不是事後在後台追查。",
    ),
  },
  {
    id: "identity",
    label: l("Organisational identity", "組織身分"),
    title: l("Verifiable organisational identity", "可驗證的組織身分"),
    thesis: l(
      "Every agent call, credential and reported number should trace back to a legal entity and to a person authorised to act for it — and stop working the moment that authority is revoked.",
      "每一次 agent 呼叫、每一張憑證、每一個申報數字，都應該能追溯到一個法人、以及一位被授權代表它的人——授權一撤銷就立刻失效。",
    ),
  },
  {
    id: "risk",
    label: l("Explainable risk", "可解釋風控"),
    title: l("Explainable on-chain risk", "可解釋的鏈上風控"),
    thesis: l(
      "A risk flag a compliance officer cannot explain is a flag they cannot act on. Every verdict ships with the graph evidence behind it, not a bare score.",
      "法遵人員解釋不了的風險警示，就無法據以行動。每一個判定都附上背後的圖結構證據，而不是一個黑箱分數。",
    ),
  },
  {
    id: "earlier",
    label: l("Earlier work", "早期作品"),
    title: l("Earlier work", "早期作品"),
    thesis: l(
      "Where the current work started: tokenisation mechanics and quantum machine-learning research.",
      "現在這些工作的起點：資產代幣化的機制實作，以及量子機器學習研究。",
    ),
  },
];

export const trackById = (id: TrackId) => tracks.find((t) => t.id === id) as Track;
