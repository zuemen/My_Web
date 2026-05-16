export interface Award {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  certificateUrl: string;
}

export const awards: Award[] = [
  {
    slug: "moda-digital-credential-2025",
    title: "Digital Credential Scenario Innovation Challenge — Merit Award",
    issuer: "Ministry of Digital Affairs, Taiwan (moda)",
    date: "2025-11",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
  },
];
