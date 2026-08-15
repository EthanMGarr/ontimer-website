import type { Metadata } from "next";
import { Suspense } from "react";
import MedicationPreviewAccess from "./MedicationPreviewAccess";

export const metadata: Metadata = {
  title: "Private Medication Schedule Preview",
  robots: { index: false, follow: false, noarchive: true },
};

export default function MedicationPreviewAccessPage() {
  return <Suspense fallback={null}><MedicationPreviewAccess /></Suspense>;
}
