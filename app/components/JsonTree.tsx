"use client";

import { useState } from "react";

type Props = {
  data: any;
};

function TreeNode({ name, value }: { name?: string; value: any }) {
  const [collapsed, setCollapsed] = useState(true);

  const isObject = typeof value === "object" && value !== null;
  const isArray = Array.isArray(value);

  if (!isObject) {
    return (
      <div
        style={{
          paddingLeft: "12px",
          color: "var(--text)",
        }}
      >
        {name && (
          <span style={{ color: "var(--accent)" }}>
            {name}:{" "}
          </span>
        )}
        <span style={{ color: "var(--text-h)" }}>
          {JSON.stringify(value)}
        </span>
      </div>
    );
  }

  const keys = Object.keys(value);
  const count = keys.length;

  return (
    <div style={{ paddingLeft: "12px" }}>
      {/* Header */}
      <div
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--text-h)",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <span style={{
          display: "inline-block",

          transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",

          transition: "0.15s ease",

          fontSize: "12px",

          opacity: 0.8,
        }}>
          ❯
        </span>

        {name && (
          <span style={{ color: "var(--accent)" }}>
            {name}:
          </span>
        )}

        <span style={{ color: "var(--text)" }}>
          {isArray ? `[${count}]` : `{${count}}`}
        </span>
      </div>

      {/* Children */}
      {!collapsed && (
        <div
          style={{
            borderLeft: "1px solid var(--border)",
            marginLeft: "6px",
            paddingLeft: "10px",
          }}
        >
          {keys.map((key) => (
            <TreeNode
              key={key}
              name={key}
              value={value[key]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function JsonTree({ data }: Props) {
  if (!data) {
    return (
      <div
        style={{
          height: "90vh",
          width: "28%",
          background: "var(--bg)",
          color: "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          borderRight: "1px solid var(--border)",
        }}
      >
        Invalid JSON
      </div>
    );
  }

  return (
    <div
      style={{
        height: "90vh",
        width: "28%",
        overflow: "auto",
        background: "var(--bg)",
        color: "var(--text)",
        fontSize: "12px",
        padding: "8px",
        fontFamily: "var(--mono, monospace)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <TreeNode value={data} />
    </div>
  );
}