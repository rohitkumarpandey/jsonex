"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json as jsonLang } from "@codemirror/lang-json";
import { EditorView, keymap } from "@codemirror/view";
import { linter } from "@codemirror/lint";
import {
  highlightSelectionMatches,
  searchKeymap,
  openSearchPanel,
} from "@codemirror/search";

import { useEffect, useState } from "react";
import { githubLight } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { syntaxHighlighting } from "@codemirror/language";
import { jsonKitHighlight } from "../theme/code-mirror-syntax.theme";
import { jsonKitTheme } from "../theme/codeMirror.theme";

type Props = {
  json: string;
  handleJsonChange: (val: string) => void;
};

// JSON linter
const jsonLinter = linter((view) => {
  const text = view.state.doc.toString();
  try {
    JSON.parse(text);
    return [];
  } catch (e: any) {
    return [
      {
        from: 0,
        to: text.length,
        severity: "error",
        message: e.message,
      },
    ];
  }
});

export default function JsonEditor({ json, handleJsonChange }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // sync with global theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current as "light" | "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // ✨ Beautify function
  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, 2);
      handleJsonChange(formatted);
    } catch (e) {
      alert("Invalid JSON ❌ Please fix errors before formatting.");
    }
  };

  return (
    <div
      style={{
        height: "90vh",
        width: "28%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontSize: "12px",
        borderRight: "1px solid var(--border)",
        background: "var(--bg)",
        position: "relative",
      }}
    >
      {/* 🔥 Toolbar */}
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          display: "flex",
          gap: "6px",
        }}
      >
        <button
          onClick={handleBeautify}
          title="Beautify JSON"
          style={{
            background: "var(--accent-bg)",
            color: "var(--text-h)",
            border: "1px solid var(--accent-border)",
            borderRadius: "6px",
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <CodeMirror
        value={json}
        height="100%"
        width="100%"
        theme={theme === "dark" ? dracula : githubLight}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
        }}
        extensions={[
          jsonLang(),
          jsonLinter,
          EditorView.lineWrapping,
          highlightSelectionMatches(),
          keymap.of(searchKeymap),
          jsonKitTheme,
          syntaxHighlighting(jsonKitHighlight),
        ]}
        onCreateEditor={(view) => {
          requestAnimationFrame(() => {
            openSearchPanel(view);
          });
        }}
        onChange={(value) => {
          handleJsonChange(value);
        }}
        style={{ flex: 1 }}
      />
    </div>
  );
}