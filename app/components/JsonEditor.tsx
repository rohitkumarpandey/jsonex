"use client";

import CodeMirror from "@uiw/react-codemirror";
import { json as jsonLang } from "@codemirror/lang-json";
import { EditorView, keymap } from "@codemirror/view";
import { linter } from "@codemirror/lint";
import {
  highlightSelectionMatches,
  searchKeymap,
} from "@codemirror/search";

import { useEffect, useRef, useState } from "react";
import { githubLight } from "@uiw/codemirror-theme-github";
import { syntaxHighlighting } from "@codemirror/language";
import { Braces, Copy, Download, Upload } from "lucide-react";

/* ✅ NEW: CodeMirror theme matching your CSS variables */
import { EditorView as CMView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import jsonKitThemeSpec from "../theme/codeMirror.theme";
import { codeMirrorSyntaxTheme } from "../theme/code-mirror-syntax.theme";

const jsonKitTheme = CMView.theme(
  jsonKitThemeSpec,
  { dark: true }
);

const jsonKitHighlightStyle = HighlightStyle.define(codeMirrorSyntaxTheme);

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
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(!json || json.trim() === "");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

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

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (!isEmpty) return;

      const text = e.clipboardData?.getData("text");
      if (!text) return;

      try {
        JSON.parse(text);
        handleJsonChange(text);
        showToast("JSON Pasted ✅");
      } catch { }
    };

    window.addEventListener("paste", handleGlobalPaste);
    return () => window.removeEventListener("paste", handleGlobalPaste);
  }, [isEmpty]);

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(json);
      handleJsonChange(JSON.stringify(parsed, null, 2));
      showToast("Beautified ✅");
    } catch {
      showToast("Invalid JSON ❌");
    }
  };

  const processJsonText = (text: string) => {
    try {
      JSON.parse(text);
      handleJsonChange(text);
      setIsEmpty(false);
      showToast("JSON Loaded ✅");
    } catch {
      showToast("Invalid JSON ❌");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processJsonText(text);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();

    URL.revokeObjectURL(url);
    showToast("Downloaded ✅");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    showToast("Copied ✅");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processJsonText(text);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "1.2rem",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
      className="json-editor-container"
    >
      {isEmpty && (
        <div className="empty-state">
          <p className="hint">
            Upload, paste (Ctrl + V), or drag & drop your JSON file
          </p>

          <div className="actions">
            <button onClick={() => fileInputRef.current?.click()} className="btn">
              Upload JSON
            </button>
            <button onClick={() => setIsEmpty(false)} className="btn">
              Paste JSON
            </button>
          </div>
        </div>
      )}

      {!isEmpty && (
        <div className="toolbar">
          <button onClick={handleBeautify} className="btn" title="Format JSON">
            <Braces size={16} />
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="btn">
            <Upload size={16} />
          </button>

          <button onClick={handleDownload} className="btn">
            <Download size={16} />
          </button>

          <button onClick={handleCopy} className="btn">
            <Copy size={16} />
          </button>
        </div>
      )}

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      {!isEmpty && (
        <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <CodeMirror
            value={json}
            theme={theme === "dark" ? jsonKitTheme : githubLight}
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
              syntaxHighlighting(jsonKitHighlightStyle),
            ]}
            onChange={(value) => handleJsonChange(value)}
          />
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}

      <style jsx>{`
        .toolbar {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          display: flex;
          gap: 0.6rem;
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          color: var(--text);
          text-align: center;
        }

        .hint {
          opacity: 0.8;
          font-size: 1rem;
          max-width: 420px;
        }

        .actions {
          display: flex;
          gap: 0.6rem;
        }

        .toast {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-bg);
          color: var(--text-h);
          border: 0.1rem solid var(--accent-border);
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          font-size: 0.9rem;
          z-index: 20;
          animation: fadeInOut 2s ease;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
        }
      `}</style>
    </div>
  );
}