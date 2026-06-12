"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        borderTop: ".1rem solid var(--border)",
        padding: "1.6rem 2.4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.2rem",
        color: "var(--text)",
        background: "var(--bg)",
      }}
    >
      {/* LEFT */}
      <div style={{ opacity: 0.8 }}>
        © {new Date().getFullYear()} JSONKit
      </div>

      {/* RIGHT LINKS */}
      <div style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
        <a
          href="/docs"
          style={linkStyle}
        >
          Docs
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          GitHub
        </a>

        <a
          href="/privacy"
          style={linkStyle}
        >
          Privacy
        </a>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  color: "var(--text)",
  textDecoration: "none",
  opacity: 0.8,
  transition: "0.2s ease",
};