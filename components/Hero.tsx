'use client';

import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { VerifiedBadge } from "./VerifiedBadge";

export const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseSrc = isDark ? "/profile/3.png" : "/profile/1.jpg";
  const hoverSrc = isDark ? "/profile/4.png" : "/profile/2.png";

  return (
    <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 via-white to-transparent py-14 dark:border-slate-800 dark:from-background-dark dark:via-background-dark">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            IT Support · Cybersecurity · Content
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
            <span className="inline-flex items-center gap-2">
              Botin, John Wilberth B.
              <VerifiedBadge className="inline-flex h-6 w-6 translate-y-[1px]" />
            </span>
          </h1>
          <p className="text-sm font-medium text-slate-700 sm:text-base dark:text-slate-200">
            Entry-Level IT Support | BSIT (Network &amp; Cybersecurity) Student | Content
            Creator
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Based in the Philippines · Available for entry-level IT support, technical
            operations, and digital content roles.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white shadow-subtle transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-xs font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-900/60"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="flex justify-start lg:justify-end">
          <div className="group relative h-40 w-40 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-subtle transition-transform duration-500 hover:-translate-y-1 sm:h-44 sm:w-44 dark:border-slate-700 dark:bg-slate-900">
            <Image
              src={baseSrc}
              alt="Profile photo of John Wilberth B. Botin"
              fill
              priority
              sizes="160px"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src={hoverSrc}
              alt="Alternate profile photo of John Wilberth B. Botin"
              fill
              sizes="160px"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

