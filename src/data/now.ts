import { l, type L } from "@/i18n/config";

/**
 * "Now" on the homepage, above Recent Updates: what is in progress, as of
 * `nowUpdatedAt`. Keep it to three to five lines and bump the date whenever
 * a line changes. Wording follows the records it comes from — the Cathay line
 * uses the unit and title in data/experience.ts (and the bio).
 */
export const nowUpdatedAt = "2026-10-21";

export const now: L[] = [
  l(
    "Project Management Intern in the Blockchain Technology Development Section at Cathay Financial Holdings",
    "國泰金控區塊鏈技術發展科專案管理實習生",
  ),
  // TODO: 11/2 中華電信結果公布後更新或移除
  l(
    "Preparing for the Chunghwa Telecom competition grand final",
    "準備 2026 中華電信智慧創新應用大賽總決賽",
  ),
  l(
    "Building agent identity & payment prototypes (x402, agent DIDs)",
    "開發 agent 身分與支付原型（x402、agent DID）",
  ),
];
