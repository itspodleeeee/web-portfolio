'use client';

import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
    >
      <span className="sr-only">Toggle theme</span>
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        {/* Sun / moon icon, no external deps */}
        <span
          className={`absolute h-4 w-4 rounded-full border border-slate-400 bg-yellow-300/90 transition-transform duration-300 ${
            isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <span
          className={`absolute h-4 w-4 rounded-full border border-slate-500 bg-slate-900 transition-transform duration-300 ${
            isDark
              ? "scale-100 opacity-100 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]"
              : "scale-0 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

