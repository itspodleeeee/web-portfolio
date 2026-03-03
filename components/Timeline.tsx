import { ReactNode } from "react";

type TimelineItem = {
  title: string;
  subtitle?: string;
  meta?: string;
  period: string;
  description?: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
};

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <ol className="relative border-l border-slate-200 pl-4 text-sm dark:border-slate-700 sm:pl-6">
      {items.map((item, index) => (
        <li key={index} className="mb-8 last:mb-0">
          <div className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent shadow-sm dark:border-background-dark" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                {item.period}
              </span>
            </div>
            {item.subtitle && (
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {item.subtitle}
              </p>
            )}
            {item.meta && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.meta}
              </p>
            )}
            {item.description && (
              <div className="pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {item.description}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
};

