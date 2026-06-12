export default function LandingPage() {
  return (
    <div
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
      <div
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
        <h1
          style={{
            fontSize: "clamp(3.4rem, 6vw, 5.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.15rem",
            color: "var(--text-h)",
            marginBottom: "0.8rem",
          }}
        >
          JSONKit
        </h1>

        {/* TAGLINE */}
        <div
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            letterSpacing: "0.15rem",
            textTransform: "uppercase",
            color: "var(--text)",
            marginBottom: "1.8rem",
          }}
        >
          Made for the developer, by the developer
        </div>

        <p
          style={{
            fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
            lineHeight: "1.7",
            maxWidth: "70rem",
            color: "var(--text)",
            marginBottom: "3.2rem",
            padding: "0 1rem",
          }}
        >
          A developer-first JSON exploration toolkit. Visualize, edit, and
          understand complex JSON structures with an interactive tree view,
          graph explorer, and real-time editor.
        </p>

        <a
          href="/jsonkit"
          style={{
            padding: "1.4rem 2.6rem",
            fontSize: "1.5rem",
            borderRadius: "1rem",
            border: "0.1rem solid var(--accent-border)",
            background: "var(--accent-bg)",
            color: "var(--text-h)",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.2s ease",
            display: "inline-block",
          }}
        >
          Open JSONKit
        </a>
      </div>

      {/* FEATURES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
          gap: "1.6rem",
          padding: "4rem clamp(1.6rem, 5vw, 6rem)",
          maxWidth: "110rem",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {[
          {
            title: "JSON Editor",
            desc: "Edit JSON with real-time validation, linting, and formatting support.",
          },
          {
            title: "Tree View",
            desc: "Expand and collapse deeply nested structures with instant navigation.",
          },
          {
            title: "Graph Explorer",
            desc: "Visualize relationships between nodes in an interactive graph layout.",
          },
        ].map((f) => (
          <div
            key={f.title}
            style={{
              border: "0.1rem solid var(--border)",
              borderRadius: "1.2rem",
              padding: "1.8rem",
              background: "var(--bg)",
            }}
          >
            <div
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--text-h)",
                marginBottom: "0.8rem",
              }}
            >
              {f.title}
            </div>
            <div style={{ fontSize: "1.3rem", lineHeight: "1.6" }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* USE CASES */}
      <div
        style={{
          padding: "4rem clamp(1.6rem, 5vw, 6rem)",
          maxWidth: "90rem",
          margin: "0 auto",
          borderTop: "0.1rem solid var(--border)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
            color: "var(--text-h)",
            marginBottom: "1.2rem",
          }}
        >
          Built for real-world debugging
        </h2>

        <p style={{ lineHeight: "1.7", fontSize: "1.4rem" }}>
          JSONKit helps developers understand complex API responses, logs,
          configuration files, and nested data structures. Whether you are
          debugging backend services or inspecting frontend payloads, it gives
          you instant clarity through multiple visualization modes.
        </p>

        <p style={{ lineHeight: "1.7", fontSize: "1.4rem", marginTop: "1rem" }}>
          Instead of manually scanning raw JSON, switch between tree view,
          graph visualization, and editor mode to quickly locate issues and
          understand structure relationships.
        </p>
      </div>
    </div>
  );
}