'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  subtitle: string;
  bullets: string[];
  linkLabel?: string;
  linkHref?: string;
};

export const ProjectCard = ({
  title,
  subtitle,
  bullets,
  linkHref,
  linkLabel
}: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      layout
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-4 text-sm shadow-sm ring-1 ring-transparent transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-subtle dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
        <span
          className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[10px] text-slate-500 transition group-hover:border-slate-300 group-hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:group-hover:border-slate-500 dark:group-hover:text-slate-100 ${
            open ? "rotate-90" : ""
          }`}
          aria-hidden
        >
          ▸
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[6px] h-[3px] w-[3px] rounded-full bg-slate-400 dark:bg-slate-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {linkHref && linkLabel && (
              <div className="mt-3">
                <a
                  href={linkHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                >
                  {linkLabel}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

