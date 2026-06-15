"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const initial =

      saved ||

      document.documentElement.getAttribute("data-theme") ||

      "dark";
    const themeToSet = initial === "dark" ? "dark" : "light";
    setTheme(themeToSet);
    document.documentElement.setAttribute("data-theme", initial);
    localStorage.setItem("theme", themeToSet);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <header
      style={{
        width: "100%",
        height: "6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        borderBottom: ".1rem solid var(--border)",
        background: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div
        onClick={() => router.push("/")}
        style={{
          fontWeight: 700,
          color: "var(--text-h)",
          cursor: "pointer",
          letterSpacing: "0.05rem",
          fontSize: "2.4rem",
        }}
      >
        JSONKit
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6rem 1rem",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? (
            <Sun size={16} />
          ) : (
            <Moon size={16} />
          )}
        </button>
      </div>
    </header>
  );
}