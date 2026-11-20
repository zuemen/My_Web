import { pageMetadata } from "@/lib/seo";
import Events from "@/components/Events";

export const generateMetadata = pageMetadata({
  path: "/events",
  title: "Events",
  description:
    "Talks, teaching, organizing and conferences by Zuemen Chu (朱廷翊): TABEI's Taiwan Blockchain Annual Conference, the Web3 Cross-Domain Talent Certification Course at NCCU, ETHTaipei 2026, the Trustworthy AI Hackathon 2026 and more.",
});

export default function EventsPage() {
  return (
    <main id="main-content" className="page-shell">
      <Events />
    </main>
  );
}
