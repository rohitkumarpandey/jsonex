import { tags as t } from "@lezer/highlight";
export const codeMirrorSyntaxTheme = [
  { tag: t.keyword, color: "var(--accent)" },
  { tag: t.string, color: "#a7f3d0" },
  { tag: t.number, color: "#fbbf24" },
  { tag: t.comment, color: "var(--text)", fontStyle: "italic", opacity: 0.6 },
  { tag: t.variableName, color: "var(--text-h)" },
  { tag: t.operator, color: "var(--accent)" },
  { tag: t.bracket, color: "var(--text-h)" },
  { tag: t.propertyName, color: "var(--accent)" },
]