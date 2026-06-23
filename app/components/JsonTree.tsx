"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  data: any;
};

/* ---------------- SEARCH ---------------- */

function searchJson(data: any, query: string): string[][] {
  const matches: string[][] = [];
  const q = query.toLowerCase();

  function walk(obj: any, path: string[]) {
    if (obj === null || obj === undefined) return;

    if (typeof obj !== "object") {
      if (String(obj).toLowerCase().includes(q)) {
        matches.push(path);
      }
      return;
    }

    if (Array.isArray(obj)) {
      obj.forEach((v, i) => walk(v, [...path, String(i)]));
    } else {
      Object.entries(obj).forEach(([k, v]) => {
        if (k.toLowerCase().includes(q)) {
          matches.push([...path, k]);
        }
        walk(v, [...path, k]);
      });
    }
  }

  walk(data, []);
  return matches;
}

/* ---------------- NODE ---------------- */

function TreeNode({
  name,
  value,
  path,
  activePath,
  expandedSet,
  setExpandedSet,
  setActivePath,
}: any) {
  const currentPath = path.join("/");

  const isObject = typeof value === "object" && value !== null;
  const isArray = Array.isArray(value);

  const isExpanded = expandedSet.has(currentPath);
  const isActive = activePath === currentPath;

  const toggle = () => {
    setExpandedSet((prev: Set<string>) => {
      const next = new Set(prev);
      if (next.has(currentPath)) next.delete(currentPath);
      else next.add(currentPath);
      return next;
    });
  };

  if (!isObject) {
    const str = String(value);

    return (
      <div
        onClick={() => setActivePath(currentPath)}
        style={{
          paddingLeft: "1.2rem",
          fontSize: "1.2rem",
          cursor: "pointer",
          color: isActive ? "#c084fc" : "var(--text)",
          background: isActive ? "rgba(192,132,252,0.15)" : "transparent",
        }}
      >
        {name && <span style={{ color: "var(--accent)" }}>{name}: </span>}
        <span style={{ color: "var(--text-h)" }}>
          {/* {str.length > 30 ? str.slice(0, 30) + "..." : str} */}
          {str}
        </span>
      </div>
    );
  }

  const keys = Object.keys(value);

  return (
    <div style={{ paddingLeft: "1.2rem", fontSize: "1.2rem" }}>
      <div
        onClick={toggle}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          color: "var(--text-h)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "0.15s ease",
            fontSize: "1.1rem",
            opacity: 0.8,
          }}
        >
          ❯
        </span>

        {name && <span style={{ color: "var(--accent)" }}>{name}:</span>}

        <span style={{ color: "var(--text)" }}>
          {isArray ? `[${keys.length}]` : `{${keys.length}}`}
        </span>
      </div>

      {isExpanded && (
        <div
          style={{
            borderLeft: "0.1rem solid var(--border)",
            marginLeft: "0.6rem",
            paddingLeft: "1rem",
          }}
        >
          {keys.map((key) => (
            <TreeNode
              key={key}
              name={key}
              value={value[key]}
              path={[...path, key]}
              activePath={activePath}
              setActivePath={setActivePath}
              expandedSet={expandedSet}
              setExpandedSet={setExpandedSet}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- MAIN ---------------- */

export default function JsonTree({ data }: Props) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<string[][]>([]);
  const [index, setIndex] = useState(0);
  const [activePath, setActivePath] = useState("");
  const isEmpty = data &&
    (data === "{}" || typeof data === "object" && data !== null && Object.keys(data).length === 0);
  const [expandedSet, setExpandedSet] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (!data || typeof data !== "object" || !Array.isArray(data)) return;
    // if data size is small then only expand it
    if (Array.isArray(data) && data?.length > 15 || Object.keys(data).length > 15) {
      return;
    }

    const firstLevel = new Set<string>();

    // expand root
    firstLevel.add("");

    Object.keys(data).forEach((key) => {
      firstLevel.add(key); // first level paths
    });

    setExpandedSet(firstLevel);
  }, [data]);
  const expandPath = (path: string[]) => {
    setExpandedSet((prev) => {
      const next = new Set(prev);

      for (let i = 0; i < path.length; i++) {
        next.add(path.slice(0, i + 1).join("/"));
      }

      return next;
    });
  };

  const runSearch = (q: string) => {
    if (!q.trim()) {
      setMatches([]);
      setIndex(0);
      setActivePath("");
      return;
    };

    const res = searchJson(data, q);
    setMatches(res);
    setIndex(0);

    if (res.length > 0) {
      setActivePath(res[0].join("/"));
      expandPath(res[0]);
    }
  };

  const next = () => {
    if (!matches.length) return;

    const i = (index + 1) % matches.length;
    setIndex(i);

    setActivePath(matches[i].join("/"));
    expandPath(matches[i]);
  };

  const prev = () => {
    if (!matches.length) return;

    const i = (index - 1 + matches.length) % matches.length;
    setIndex(i);

    setActivePath(matches[i].join("/"));
    expandPath(matches[i]);
  };

  const clear = () => {
    setQuery("");
    setMatches([]);
    setIndex(0);
    setActivePath("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        fontFamily: "var(--mono)",
        height: "100%"
      }}
      className="json-tree-container"
    >
      {isEmpty && (
        <div className="empty-state">
          <p className="hint">
            A JSON tree view that supports search with fuzzy matching.
            <br></br>
            Try pasting a JSON object to get started!
          </p>
        </div>
      )}
      {/* SEARCH BAR */}

      {!isEmpty &&
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.8rem",
              borderBottom: "0.1rem solid var(--border)",
            }}
          >
            {/* INPUT (FULL WIDTH FIX) */}
            <div style={{ position: "relative", flex: 1 }}>
              <input
                value={query}
                onChange={(e) => {
                  const q = e.target.value;
                  setQuery(q);
                  runSearch(q);
                }}
                placeholder="Search"
                style={{
                  width: "100%",
                  fontSize: "1.2rem",
                  padding: "0.6rem 2.6rem 0.6rem 0.8rem",
                  border: "0.1rem solid var(--border)",
                  borderRadius: "0.6rem",
                  background: "var(--bg)",
                  color: "var(--text-h)",
                  outline: "none",
                }}
              />

              {/* CLEAR (VERTICAL CENTER FIX) */}
              {query && (
                <button
                  onClick={clear}
                  style={{
                    position: "absolute",
                    right: "0.6rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.6rem",
                    height: "1.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--text)",
                    fontSize: "1.2rem",
                    lineHeight: "1",
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* SEARCH */}
            {/* <button onClick={runSearch} style={iconBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button> */}


            <>
              {/* NAV */}
              <button className="search-icon-btn" onClick={prev} disabled={!matches || matches.length == 0}>
                <ArrowUp size={12} />
              </button>
              <button className="search-icon-btn" onClick={next} disabled={!matches || matches.length == 0}>
                <ArrowDown size={12} />
              </button>

              {/* MATCH COUNT (current/total) */}
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: "1rem",
                  padding: "0.2rem",
                  borderRadius: "0.6rem",
                  color: "var(--text)",
                  minWidth: "8rem",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {matches.length > 0 ? `${index + 1}/${matches.length}` : "No results"}
              </div>
            </>


          </div>
        </>}
      {!isEmpty &&
        <>
          {/* TREE */}
          <div style={{ overflow: "auto", padding: "0.8rem" }}>
            <TreeNode
              value={data}
              path={[]}
              activePath={activePath}
              setActivePath={setActivePath}
              expandedSet={expandedSet}
              setExpandedSet={setExpandedSet}
            />
          </div>
        </>
      }
    </div>
  );
}