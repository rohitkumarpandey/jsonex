const jsonKitThemeSpec ={
  "&": {
    color: "var(--text)",
    backgroundColor: "var(--code-bg)",
    fontFamily:
      "var(--mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
    fontSize: "1.2rem",
  },

  ".cm-content": {
    caretColor: "var(--accent)",
  },

  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--accent)",
  },

  ".cm-selectionBackground, ::selection": {
    backgroundColor: "var(--accent-bg)",
  },

  ".cm-activeLine": {
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  ".cm-gutters": {
    backgroundColor: "var(--bg)",
    color: "var(--text)",
    border: "none",
  },

  ".cm-lineNumbers .cm-gutterElement": {
    color: "var(--text)",
    opacity: 0.4,
  },

  ".cm-tooltip": {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
  },

  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: "var(--accent-bg)",
      color: "var(--text-h)",
    },
  },
}
export default jsonKitThemeSpec;