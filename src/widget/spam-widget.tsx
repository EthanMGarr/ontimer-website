import React from "react";
import { createRoot } from "react-dom/client";
import SpamReportWidget from "../components/SpamReportWidget";

function mount() {
  const el = document.getElementById("spam-report-root");

  if (!el) {
    console.warn("spam-report-root not found");
    return;
  }

  const root = createRoot(el);
  root.render(<SpamReportWidget />);
}

// Run immediately when script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}