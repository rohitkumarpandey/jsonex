"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #1f2028, #0f1117)",
        color: "var(--text-h)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 700,
          marginBottom: "10px",
          letterSpacing: "-1px",
        }}
      >
        JSONKit
      </h1>

      <p
        style={{
          fontSize: "16px",
          color: "var(--text)",
          maxWidth: "500px",
          lineHeight: "1.6",
          marginBottom: "40px",
        }}
      >
        A powerful JSON visualizer with editor, tree view, and graph explorer.
        Built for developers who deal with complex APIs and data structures.
      </p>

      {/* CTA Button */}
      <button
        onClick={() => router.push("/jsonkit")}
        style={{
          padding: "14px 28px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid var(--accent-border)",
          background: "var(--accent-bg)",
          color: "var(--text-h)",
          cursor: "pointer",
          transition: "0.2s ease",
          fontWeight: 600,
        }}
        onMouseOver={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        Open JSON Kit →
      </button>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "12px",
          color: "var(--text)",
        }}
      >
        Built for developers ⚡
      </div>
    </div>
  );
}