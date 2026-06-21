export default function PrivacyPage() {
    return (
      <main
        className="w-[90%] mx-auto py-10"
        style={{ color: "var(--text)" }}
      >
        {/* Inner content wrapper (important) */}
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <header className="mb-10">
            <h1
              className="text-2xl font-semibold mb-2"
              style={{ color: "var(--text-h)" }}
            >
              Privacy Policy
            </h1>
            <p className="text-xs opacity-70">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </header>
  
          {/* Intro */}
          <section className="mb-10">
            <p className="text-sm leading-relaxed">
              JSONex is designed with a privacy-first architecture. All processing
              happens locally in your browser, ensuring that your data never leaves
              your device.
            </p>
          </section>
  
          {/* How it works */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              How JSONex Works
            </h2>
            <p className="text-sm leading-relaxed">
              All features — including formatting, validation, and editing — are
              executed entirely within your browser using client-side JavaScript.
              No API requests are made with your JSON data.
            </p>
          </section>
  
          {/* Data Collection */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Data Collection
            </h2>
  
            <p className="text-sm leading-relaxed mb-3">
              JSONex does not collect, store, or process any of the data you input.
            </p>
  
            <ul className="mt-3 space-y-2.5">
              {[
                "No user input is sent to servers",
                "No JSON content is stored or logged",
                "No databases are used to persist your data",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="mt-[6px] text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    ●
                  </span>
                  <span
                    className="text-[13px] leading-relaxed"
                    style={{ color: "var(--text-h)" }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </section>
  
          {/* Data Usage */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Data Usage
            </h2>
            <p className="text-sm leading-relaxed">
              Since no data is collected, JSONex does not use, analyze, or share
              your data. All operations are performed locally and are cleared when
              the session ends.
            </p>
          </section>
  
          {/* Tracking */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Tracking & Analytics
            </h2>
            <p className="text-sm leading-relaxed">
              JSONex does not track or inspect your JSON content. If analytics are
              used, they are limited to anonymous usage metrics.
            </p>
          </section>
  
          {/* Offline */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Offline Usage
            </h2>
            <p className="text-sm leading-relaxed">
              JSONex works completely offline. No internet connection is required
              for core functionality.
            </p>
          </section>
  
          {/* Security */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Security
            </h2>
            <p className="text-sm leading-relaxed">
              Because your data never leaves your device, risks related to data
              transmission and storage are minimized.
            </p>
          </section>
  
          {/* Changes */}
          <section className="mb-10">
            <h2
              className="text-base font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              Changes to This Policy
            </h2>
            <p className="text-sm leading-relaxed">
              This policy may be updated over time. Updates will be posted on this
              page.
            </p>
          </section>
  
          {/* Final Highlight */}
          <section
            className="mt-12 p-5 rounded-xl border"
            style={{
              background: "var(--accent-bg)",
              borderColor: "var(--accent-border)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-h)" }}
            >
              Your data stays in your browser. JSONex never sees it.
            </p>
          </section>
        </div>
      </main>
    );
  }