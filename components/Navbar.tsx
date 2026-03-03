'use client';

import { useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./Section";
import { VerifiedBadge } from "./VerifiedBadge";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" }
];

const scrollToSection = (id: string) => {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  el.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
  });
};

export const Navbar = () => {
  const { activeId } = useActiveSection();

  const handleClick = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-tight text-slate-800 dark:text-slate-100">
            John Wilberth B. Botin
            <VerifiedBadge className="inline-flex h-4 w-4" />
          </span>
        </div>

        <div className="hidden items-center gap-6 text-xs font-medium text-slate-500 sm:flex">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleClick(section.id)}
                className={`relative inline-flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-slate-900 dark:text-slate-50"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                <span>{section.label}</span>
                {isActive && (
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

