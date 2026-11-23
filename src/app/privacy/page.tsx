import { permanentRedirect } from "next/navigation";

// Keep one authoritative policy document. The App Store, app, and website all
// resolve to the same public file so analytics disclosures cannot drift apart.
export default function PrivacyPage(): never {
  permanentRedirect("/OnTimer_Privacy_Policy.html");
}
