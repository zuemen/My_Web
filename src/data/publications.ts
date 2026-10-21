// 論文上線需本人確認（教授同意、ICLR 雙盲）——見 decisions
//
// Publications are not on the site yet. Adding an entry here publishes it on
// /research (#publications) and /cv. Rules for when one is added: no
// submission or manuscript numbers and no unpublished PDFs for papers under
// review; while a venue is double-blind, do not list the author names.

import { l, type L } from "@/i18n/config";

export type PublicationStatus =
  | "under-review"
  | "accepted"
  | "published"
  | "preprint";

export interface Publication {
  /** Stable key, also used as the element id. */
  id: string;
  title: L;
  /** In the order printed on the paper. */
  authors: string[];
  /** Index into `authors` (0-based) of the site owner, shown in bold. */
  selfIndex: number;
  /** Full venue name. */
  venue: L;
  /** Short form for compact lists, e.g. "IEEE TNNLS". */
  venueShort: string;
  year: number;
  status: PublicationStatus;
  /** YYYY-MM the manuscript was submitted. */
  submitted?: string;
  links?: { paper?: string; arxiv?: string; openreview?: string; code?: string };
  tags?: string[];
}

/** Badge text per status. */
export const STATUS_LABEL: Record<PublicationStatus, L> = {
  published: l("Published", "已發表"),
  accepted: l("Accepted", "已接受"),
  "under-review": l("Under review", "審稿中"),
  preprint: l("Preprint", "預印本"),
};

/** Sort order: settled work first, then by year, newest first. */
const STATUS_ORDER: PublicationStatus[] = [
  "published",
  "accepted",
  "under-review",
  "preprint",
];

/** Empty on purpose until the owner confirms each entry (see header). */
const entries: Publication[] = [];

export const publications: Publication[] = [...entries].sort(
  (a, b) =>
    STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) ||
    b.year - a.year,
);
