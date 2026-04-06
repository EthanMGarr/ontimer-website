import React from "react";
import { createRoot } from "react-dom/client";
import SpamReportWidget from "../components/SpamReportWidget";

const container = document.getElementById("spam-report-root");

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: "24px 16px",
        background: "#ffffff",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: "border-box",
      }}>
        <SpamReportWidget />
      </div>
    </React.StrictMode>
  );
} else {
  console.error("[SpamWidget] Could not find #spam-report-root element.");
}
