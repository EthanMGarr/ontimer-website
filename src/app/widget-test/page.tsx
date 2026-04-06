"use client";

import { useEffect } from "react";

export default function WidgetTest() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/spam-widget.iife.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ background: "#eef2fb", minHeight: "100vh" }}>
      <section style={{ padding: "70px 20px 50px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div id="spam-report-root"></div>
        </div>
      </section>
    </div>
  );
}