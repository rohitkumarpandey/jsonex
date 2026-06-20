"use client";

import { useState } from "react";

export default function DocsHub() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install jsonkit");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="docs">
      {/* Header */}
      <div className="header">
        <h1>JsonKit Docs</h1>
        <p>
          Everything you need to parse, debug, explore, and work with JSON faster.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid">
        <a className="card" href="#">
          <h3>📘 Documentation</h3>
          <p>Learn how to use JsonKit features step-by-step</p>
        </a>

        <a className="card" href="#">
          <h3>⚡ Playground</h3>
          <p>Test JSON, debug issues, and experiment instantly</p>
        </a>

        <a className="card" href="#">
          <h3>🔌 API Reference</h3>
          <p>Integrate JsonKit into your workflow</p>
        </a>

        <a className="card" href="#">
          <h3>📝 Changelog</h3>
          <p>See latest updates and upcoming features</p>
        </a>
      </div>

      {/* Features */}
      <div className="section">
        <h2>Core Features</h2>
        <ul>
          <li>✔ JSON Beautify & Minify</li>
          <li>✔ Smart Search & Replace</li>
          <li>✔ Tree View Explorer</li>
          <li>✔ Error Highlighting & Debugging</li>
          <li>✔ Large JSON Performance Optimized</li>
        </ul>
      </div>

      {/* Install / API */}
      <div className="section">
        <h2>Quick Start</h2>

        <div className="code">
          <code>npm install jsonkit</code>
          <button onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Built for developers who deal with JSON daily.</p>
      </div>

      <style jsx>{`
        .docs {
          padding: 24px;
          color: var(--text);
        }

        .header h1 {
          color: var(--text-h);
          font-size: 28px;
          margin-bottom: 6px;
        }

        .header p {
          color: var(--text);
          margin-bottom: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .card {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .card h3 {
          color: var(--text-h);
          margin-bottom: 6px;
          font-size: 16px;
        }

        .card p {
          font-size: 13px;
        }

        .section {
          margin-bottom: 30px;
        }

        .section h2 {
          color: var(--text-h);
          margin-bottom: 10px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 6px;
        }

        .code {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
        }

        code {
          color: var(--accent);
        }

        button {
          background: var(--accent-bg);
          border: 1px solid var(--accent-border);
          color: var(--accent);
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background: var(--accent);
          color: #000;
        }

        .footer {
          margin-top: 40px;
          font-size: 13px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}