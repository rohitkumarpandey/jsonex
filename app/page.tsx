import { CornerDownRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top, rgba(170,59,255,0.08), transparent 40%), var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* HERO */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "clamp(4rem, 8vw, 8rem) 2rem",
          maxWidth: "90rem",
          margin: "0 auto",
        }}
      >
        {/* PRIMARY SEO HEADING */}
        <h1 style={{ fontSize: "clamp(2.8rem, 4vw, 3.6rem)", marginBottom: "1rem", letterSpacing: "-0.1rem" }}>
          JSON Viewer, Formatter & Explorer Online
        </h1>

        {/* BRAND */}
        <div
          style={{
            fontSize: "clamp(3.4rem, 6vw, 5.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.15rem",
            color: "var(--text-h)",
            marginBottom: "0.8rem",
          }}
        >
          JSONex
        </div>

        <p
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
            lineHeight: "1.7",
            maxWidth: "70rem",
            marginBottom: "3.2rem",
          }}
        >
          Free online JSON viewer, formatter, and explorer for developers.
          Visualize complex JSON in a tree view, edit with real-time validation,
          and explore relationships using graph visualization — all in one tool.
        </p>

        <a
          href="/json-explorer"
          aria-label="Open JSON viewer and formatter tool"
          style={{
            padding: "1.4rem 2.6rem",
            fontSize: "1.8rem",
            borderRadius: "1rem",
            border: "0.1rem solid var(--accent-border)",
            background: "var(--accent-bg)",
            color: "var(--text-h)",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          Open JSON Viewer & Formatter
          <CornerDownRight size={14} style={{marginTop: "0.4rem"}} />
        </a>
      </section>

      {/* FEATURES */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
          gap: "1.6rem",
          padding: "4rem clamp(1.6rem, 5vw, 6rem)",
          maxWidth: "100rem",
          justifyContent:"center",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h2 style={{ gridColumn: "1/-1", fontSize: "2rem", textAlign: "center" }}>
          JSON Viewer, Formatter and Editor Features
        </h2>

        {[
          {
            title: "JSON Editor",
            desc: "Edit and format JSON with real-time validation, linting, and syntax highlighting.",
          },
          {
            title: "JSON Tree View",
            desc: "Visualize nested JSON data with an expandable and collapsible tree view.",
          },
          {
            title: "JSON Graph Explorer",
            desc: "Explore relationships between JSON nodes using interactive graph visualization.",
          },
        ].map((f) => (
          <article
            key={f.title}
            style={{
              border: "0.1rem solid var(--border)",
              borderRadius: "1.2rem",
              padding: "1.8rem",
              background: "var(--bg)",
            }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                marginBottom: "0.8rem",
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: "1.3rem", lineHeight: "1.6" }}>
              {f.desc}
            </p>
          </article>
        ))}
      </section>

      {/* SEO CONTENT BLOCK */}
      <section
        style={{
          padding: "4rem clamp(1.6rem, 5vw, 6rem)",
          maxWidth: "90rem",
          margin: "0 auto",
          borderTop: "0.1rem solid var(--border)",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Online JSON Viewer, Formatter and Editor
        </h2>

        <p style={{ lineHeight: "1.7", fontSize: "1.4rem" }}>
          JSONex is a complete JSON viewer, formatter, and editor designed for
          developers working with APIs, logs, and structured data. Format and
          beautify JSON instantly, inspect data in a tree view, and debug faster
          using multiple visualization modes.
        </p>

        <p style={{ lineHeight: "1.7", fontSize: "1.4rem", marginTop: "1rem" }}>
          Whether you are formatting JSON, validating API responses, or exploring
          complex nested objects, this tool provides everything you need in one
          place — without switching between multiple JSON tools.
        </p>
      </section>
    </main>
  );
}