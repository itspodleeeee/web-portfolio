'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

type ActiveSectionContextValue = {
  activeId: string;
  setActiveId: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue | undefined>(
  undefined
);

export const ActiveSectionProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [activeId, setActiveId] = useState<string>("about");

  return (
    <ActiveSectionContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const ctx = useContext(ActiveSectionContext);
  if (!ctx) {
    throw new Error("useActiveSection must be used within ActiveSectionProvider");
  }
  return ctx;
};

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export const Section = ({ id, title, children }: SectionProps) => {
  const { setActiveId } = useActiveSection();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        });
      },
      {
        rootMargin: "-48% 0px -48% 0px",
        threshold: 0.2
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, setActiveId]);

  return (
    <section
      id={id}
      ref={ref}
      aria-label={title}
      className="scroll-mt-24 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-slate-300 dark:bg-slate-700" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};

