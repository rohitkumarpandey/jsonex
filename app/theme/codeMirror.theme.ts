import { EditorView } from "@codemirror/view";

export const jsonKitTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "var(--bg)",
      color: "var(--text)",
      fontFamily: "var(--mono)",
      fontSize: "13px",
    },

    ".cm-content": {
      caretColor: "var(--accent)",
    },

    ".cm-cursor": {
      borderLeftColor: "var(--accent)",
    },

    ".cm-selectionBackground, .cm-selectionMatch": {
      backgroundColor: "var(--accent-bg)",
    },

    ".cm-activeLine": {
      backgroundColor: "rgba(0,0,0,0.03)",
    },

    ".cm-gutters": {
      backgroundColor: "var(--bg)",
      color: "var(--text)",
      borderRight: "1px solid var(--border)",
    },

    ".cm-activeLineGutter": {
      backgroundColor: "var(--accent-bg)",
    },

    ".cm-lineNumbers": {
      color: "var(--text)",
    },

    ".cm-matchingBracket": {
      backgroundColor: "var(--accent-bg)",
      outline: "1px solid var(--accent-border)",
      color: "var(--text-h)",
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "var(--accent-bg)",
      border: "1px solid var(--accent-border)",
      color: "var(--text-h)",
    },

    ".cm-tooltip": {
      backgroundColor: "var(--code-bg)",
      color: "var(--text-h)",
      border: "1px solid var(--border)",
    },
  },
  { dark: false }
);