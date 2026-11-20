import { pageMetadata } from "@/lib/seo";
import Teaching from "@/components/Teaching";

export const generateMetadata = pageMetadata({
  path: "/teaching",
  title: "Teaching",
  description:
    "Courses taught by Zuemen Chu (朱廷翊): the Web3 Cross-Domain Talent Certification Course at NCCU (NCCU FTL × TABEI, 2026) — cryptography, stablecoins, digital identity and RWA tokenization, with certificates issued to Taiwan's Digital Credential Wallet.",
});

export default function TeachingPage() {
  return (
    <main id="main-content" className="page-shell">
      <Teaching />
    </main>
  );
}
