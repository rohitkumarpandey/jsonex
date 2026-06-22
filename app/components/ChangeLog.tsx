"use client";

import React from "react";

type Change = {
  date: string;
  title: string;
  items: {
    type: "added" | "improved" | "fixed" | "addition" | "improvement";
    text: string;
  }[];
  upcoming?: boolean;
};

const changelog: Change[] = [
  {
    date: "Coming Soon",
    title: "Upcoming Features",
    upcoming: true,
    items: [
      { type: "addition", text: "JSON diff viewer" },
      { type: "addition", text: "Setting theme" },
      {
        type: "improvement",
        text: "Performance optimizations for large JSON files",
      },
    ],
  },
  {
    date: "Jun 20, 2026",
    title: "Initial Release",
    items: [
      { type: "added", text: "JSON editor, JSON Tree and JSON Graph" },
    ],
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "added":
    case "addition":
      return "var(--accent)";
    case "improved":
    case "improvement":
      return "#38bdf8";
    case "fixed":
      return "#f87171";
    default:
      return "var(--text)";
  }
};

export default function ChangelogTimeline() {
  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        {changelog.map((entry, index) => (
          <div key={index} className="timeline-item">
            {/* Left line */}
            <div className="timeline-left">
              <div
                className={`dot ${entry.upcoming ? "blinking" : ""}`}
              />
              {index !== changelog.length - 1 && (
                <div className="line" />
              )}
            </div>

            {/* Content */}
            <div className="timeline-content">
              <div className="date">{entry.date}</div>
              <div className="title">{entry.title}</div>

              <ul>
                {entry.items.map((item, i) => (
                  <li key={i}>
                    <span
                      className="badge"
                      style={{ color: getTypeColor(item.type) }}
                    >
                      {item.type}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* WRAPPER (Responsive alignment fix) */
        .timeline-wrapper {
          width: 90%;
          padding: 20px 0;
          margin-left: 1.6rem;
        }

        /* Center ONLY on large screens */
        @media (min-width: 1024px) {
          .timeline-wrapper {
            margin: 0 auto;
            max-width: 800px;
          }
        }

        .timeline {
          width: 100%;
        }

        .timeline-item {
          display: flex;
          gap: 16px;
          position: relative;
        }

        .timeline-left {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .dot {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid var(--accent-border);
        }
        .dot.blinking {
          background: var(--border);
        }

        .blinking {
          animation: blink 1.2s infinite;
        }

        @keyframes blink {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.4);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .line {
          width: 2px;
          flex: 1;
          background: var(--border);
          margin-top: 4px;
        }

        .timeline-content {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 16px;
          margin-bottom: 20px;
          width: 100%;
        }

        .date {
          font-size: 12px;
          color: var(--text);
          margin-bottom: 4px;
        }

        .title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-h);
          margin-bottom: 10px;
        }

        ul {
          padding-left: 0;
          list-style: none;
        }

        li {
          font-size: 14px;
          color: var(--text);
          margin-bottom: 6px;
          display: flex;
          gap: 8px;
        }

        .badge {
          font-weight: 600;
          text-transform: capitalize;
          min-width: 80px;
        }
      `}</style>
    </div>
  );
}