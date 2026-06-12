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

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(json);
      handleJsonChange(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Invalid JSON ❌ Please fix errors before formatting.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "1.2rem",
        position: "relative",
        overflow: "hidden"
      }}
      className="json-editor-container"
    >
      {/* TOOLBAR */}
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          display: "flex",
          gap: ".6rem",
        }}
      >
        <button
          onClick={handleBeautify}
          style={{
            background: "var(--accent-bg)",
            color: "var(--text-h)",
            border: ".1rem solid var(--accent-border)",
            borderRadius: ".6rem",
            padding: ".4rem .8rem",
            cursor: "pointer",
          }}
        >
          ≡
        </button>
      </div>

      {/* 🔥 CRITICAL FIX: this becomes scroll container */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",   // 🔥 ONLY THIS SCROLLS (wrapper)
        }}
      >
        <CodeMirror
          value={json}
          theme={theme === "dark" ? dracula : githubLight}
          height="100%"
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
          onChange={(value) => handleJsonChange(value)}
        />
      </div>
    </div>
  );
}