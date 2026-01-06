import React, { useState, useEffect } from "react";
import "../styling/themeswitcher.css";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="theme-switcher"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      type="button"
    >
      <span id="theme-toggle">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
      <span>
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}