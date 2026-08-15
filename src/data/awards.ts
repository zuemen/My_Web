export interface Award {
  slug: string;
  title: string;
  issuer: string;
  /** YYYY-MM. Kept sortable; formatted for display at the call site. */
  date: string;
  /** Headline outcome — "First Place", "Merit Award", "Shortlisted", … */
  result?: string;
  role?: string;
  /** One extra line: prize, track, scale. */
  detail?: string;
  /** Omitted when no certificate file has been added to /public/awards yet. */
  certificateUrl?: string;
  link?: string;
}

/**
 * Source of truth for awards and competitive selections. Newest first.
 * Rendered by the Awards section on /experience and the awards block on /cv,
 * so an entry added here shows up on both.
 */
export const awards: Award[] = [
  {
    slug: "ntu-ibm-qiskit-hackathon-2026",
    title: "NTU–IBM Qiskit Quantum Computing Hackathon Taiwan 2026",
    issuer: "NTU–IBM Quantum Computer Center",
    date: "2026-08",
    result: "Selected",
    detail:
      "Admission by review with limited seats. Held in English, Aug 12–14, 2026, with mentoring from IBM Quantum.",
    link: "https://quantum.ntu.edu.tw/?p=9999",
  },
  {
    slug: "swift-hackathon-2026",
    title: "SWIFT Hackathon 2026",
    issuer: "SWIFT",
    date: "2026-07",
    result: "Proposal shortlisted",
    detail:
      "Selected by the judging panel to advance to the full solution phase.",
  },
  {
    slug: "egx-collegiate-business-2026",
    title: "EGX 1st Collegiate Business Competition",
    issuer: "EGX",
    date: "2026-06",
    result: "First Place, Track A",
    role: "Team Lead",
    detail: "NT$50,000 team prize in a national collegiate competition.",
  },
  {
    slug: "nurie-ai-2026",
    title: "Cross-Platform Innovation Awards",
    issuer: "Nurie AI",
    date: "2026-05",
    detail:
      "Certified for engineering a cross-platform application on the VaultSage server-side API.",
    certificateUrl: "/awards/nurie-ai-2026-certificate.pdf",
  },
  {
    slug: "moda-digital-credential-2025",
    title: "Digital Credential Scenario Innovation Challenge",
    issuer: "Ministry of Digital Affairs, Taiwan (moda)",
    date: "2025-11",
    result: "Merit Award",
    role: "Team Leader",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
  },
];

/** "2025-11" -> "Nov 2025" */
export const formatAwardDate = (date: string) => {
  const [year, month] = date.split("-");
  const label = new Date(Number(year), Number(month) - 1).toLocaleString(
    "en-US",
    { month: "short" },
  );
  return `${label} ${year}`;
};
