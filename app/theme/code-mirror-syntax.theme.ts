import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
export const jsonKitHighlight = HighlightStyle.define([
  {
    tag: t.string,
    color: "var(--accent)",
  },
  {
    tag: t.number,
    color: "#f59e0b",
  },
  {
    tag: t.bool,
    color: "#10b981",
  },
  {
    tag: t.null,
    color: "#ef4444",
  },
  {
    tag: t.propertyName,
    color: "var(--text-h)",
    fontWeight: "500",
  },
]);