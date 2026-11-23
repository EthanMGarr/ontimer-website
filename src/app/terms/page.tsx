import { permanentRedirect } from "next/navigation";

// Keep one authoritative terms document for the app and website.
export default function TermsPage(): never {
  permanentRedirect("/OnTimer_Terms_of_Service.html");
}
