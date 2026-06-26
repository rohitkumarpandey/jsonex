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
        <h1
          style={{
            fontSize: "clamp(2.8rem, 4vw, 3.6rem)",
            marginBottom: "1rem",
            letterSpacing: "-0.1rem",
          }}
        >
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
          Format, validate, search, and visualize JSON with tree and graph
          views, upload or download files, and work across multiple tabs—all in
          one place.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
          }}
        >
          <a
            href="/json-explorer"
            aria-label="Open JSON Explorer"
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
              textDecoration: "none",
            }}
          >
            Open JSON Explorer
            <CornerDownRight size={14} style={{ marginTop: "0.4rem" }} />
          </a>

          <a href="/feedback" className="feedback-link">
            [Got any feedback?]
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
          gap: "1.6rem",
          padding: "4rem clamp(1.6rem, 5vw, 6rem)",
          maxWidth: "100rem",
          justifyContent: "center",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h2
          style={{
            gridColumn: "1/-1",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          JSON Viewer, Formatter & Visualization Features
        </h2>

        {[
          {
            title: "JSON Editor",
            desc: "Format, edit, validate, and search JSON with syntax highlighting and real-time error detection.",
          },
          {
            title: "JSON Tree View",
            desc: "Navigate deeply nested JSON with an expandable tree view for faster inspection and debugging.",
          },
          {
            title: "JSON Graph Explorer",
            desc: "Visualize relationships between JSON objects and arrays using an interactive graph view.",
          },
          {
            title: "Developer Tools",
            desc: "Upload and download JSON files, work across multiple tabs, and inspect large JSON documents with ease.",
          },
        ].map((feature) => (
          <article
            key={feature.title}
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
              {feature.title}
            </h3>

            <p
              style={{
                fontSize: "1.3rem",
                lineHeight: "1.6",
              }}
            >
              {feature.desc}
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
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Complete Online JSON Viewer, Formatter & Explorer
        </h2>

        <p
          style={{
            lineHeight: "1.7",
            fontSize: "1.4rem",
          }}
        >
          JSONex is an all-in-one JSON toolkit for developers working with APIs,
          logs, configuration files, and structured data. Format and validate
          JSON instantly, inspect data in an expandable tree view, visualize
          relationships with an interactive graph, and edit content with
          real-time validation.
        </p>

        <p
          style={{
            lineHeight: "1.7",
            fontSize: "1.4rem",
            marginTop: "1rem",
          }}
        >
          Whether you're debugging API responses, exploring complex nested
          objects, or formatting large JSON files, JSONex brings everything
          together in one place. Search instantly, upload and download JSON
          files, work across multiple tabs, and switch seamlessly between code,
          tree, and graph views—without relying on multiple JSON tools.
        </p>
      </section>
    </main>
  );
}