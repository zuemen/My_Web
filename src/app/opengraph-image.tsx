import { ImageResponse } from "next/og";

/**
 * Replaces the /og.png that metadata referenced but that never existed in
 * /public, so every share of the site rendered an imageless preview card.
 * Generated at build time, so there is no binary to keep in sync with the
 * site's copy.
 *
 * Deliberately English-only: ImageResponse renders through Satori, which has
 * no CJK glyphs unless a font is embedded, and 朱廷翊 would come out as tofu
 * boxes. Embedding a CJK face would mean a build-time font fetch for two
 * characters that the title tag already carries.
 */

export const alt = "Zuemen Chu — Blockchain & Digital Trust Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0b";
const ACCENT = "#4f9eff";
const TEXT = "#ededed";
const MUTED = "#9b9ba3";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          borderTop: `8px solid ${ACCENT}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              color: ACCENT,
              fontWeight: 700,
            }}
          >
            ZUEMEN.CHU
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 86,
              lineHeight: 1.05,
              fontWeight: 800,
              color: TEXT,
              letterSpacing: -2,
            }}
          >
            Zuemen Chu
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 44,
              lineHeight: 1.2,
              fontWeight: 600,
              color: ACCENT,
            }}
          >
            Blockchain &amp; Digital Trust Infrastructure
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: MUTED }}>
            Self-Sovereign Identity · Smart Contract Security · RWA Tokenization
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 24,
              color: MUTED,
            }}
          >
            Research Assistant, NCCU MIS · zuemen.net
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
