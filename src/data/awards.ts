export interface Award {
  slug: string;
  title: string;
  issuer: string;
  /** YYYY-MM. Kept sortable; formatted for display at the call site. */
  date: string;
  role?: string;
  /** Omitted when no certificate file has been added to /public/awards yet. */
  certificateUrl?: string;
}

/** Source of truth for awards. Newest first. */
export const awards: Award[] = [
  {
    slug: "nurie-ai-2026",
    title: "Cross-Platform Innovation Awards",
    issuer: "Nurie AI",
    date: "2026-05",
    certificateUrl: "/awards/nurie-ai-2026-certificate.pdf",
  },
  {
    slug: "moda-digital-credential-2025",
    title: "Digital Credential Scenario Innovation Challenge — Merit Award",
    issuer: "Ministry of Digital Affairs, Taiwan (moda)",
    date: "2025-11",
    role: "Team Leader",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
  },
];
