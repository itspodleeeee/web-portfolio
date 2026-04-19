'use client';

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { ChatProvider } from "../components/ChatProvider";
import { ActiveSectionProvider, Section } from "../components/Section";
import { Timeline } from "../components/Timeline";
import { ProjectCard } from "../components/ProjectCard";
import { ChatWidget } from "../components/ChatWidget";
import { FloatingChat } from "../components/FloatingChat";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_DETAILS,
  EDUCATION_ITEMS,
  EXPERIENCE_ITEMS,
  PROJECTS,
  RECOGNITION_ITEMS,
  SKILL_GROUPS
} from "../data/portfolio";

export default function Page() {
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactFormRef.current || isSending) return;

    const formData = new FormData(contactFormRef.current);
    const name = String(formData.get("from_name") ?? "").trim();
    const email = String(formData.get("reply_to") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setContactStatus("error");
      return;
    }

    setIsSending(true);
    setContactStatus("idle");

    try {
      await emailjs.sendForm(
        "service_t3qpo1i",       
        "template_34vs6dw",      
        contactFormRef.current,
        {
          publicKey: "3ip6gzgOZmnHVrNnM"  
        }
      );
      setContactStatus("success");
      contactFormRef.current.reset();
    } catch (err: any) {
      // Temporary: log full EmailJS error details to browser console for debugging
      // (remove this once configuration is verified)
      // eslint-disable-next-line no-console
      console.error("EmailJS error:", err?.text || err);
      setContactStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ChatProvider>
      <ActiveSectionProvider>
        <div className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-50">
          <Navbar />
          <main>
            <Hero />

          <Section id="about" title="About">
            <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>

          <Section id="experience" title="Experience">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
              <Timeline
                items={EXPERIENCE_ITEMS.map((item) => ({
                  title: item.title,
                  period: item.period,
                  description: item.bullets ? (
                    <ul className="space-y-1.5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : undefined
                }))}
              />

              <div className="space-y-6 rounded-2xl border border-slate-100 bg-white/70 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Education
                </h3>
                <Timeline items={[...EDUCATION_ITEMS]} />
              </div>
            </div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_GROUPS.map((group) => (
                <SkillGroup key={group.label} label={group.label} items={[...group.items]} />
              ))}
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <p className="mb-6 max-w-3xl text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Work bound by NDAs or other confidentiality agreements is not shown here so I
              stay aligned with those commitments. This section only includes projects I am
              allowed to present publicly.
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  subtitle={project.subtitle}
                  badge={project.badge}
                  summary={project.summary}
                  caseStudy={project.caseStudy}
                  tags={project.tags ? [...project.tags] : undefined}
                  linkHref={project.linkHref}
                  linkLabel={project.linkLabel}
                  bullets={[...project.bullets]}
                />
              ))}
            </div>
          </Section>

            <Section id="ask" title="Ask about me">
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <p>
                    Use this chatbot to quickly learn about my projects, including the new{" "}
                    <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                      Villa Ikarus
                    </span>{" "}
                    hospitality website, plus my ELO nomination, IT support experience,
                    and the GMA feature.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    The chat history is shared between this section and the floating chat,
                    so you can continue the same conversation from either one.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    For anything not covered here (like availability or personal details),
                    please reach out directly at{" "}
                    <a
                      href={CONTACT_DETAILS.emailHref}
                      className="underline underline-offset-4"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                    .
                  </p>
                </div>
                <ChatWidget />
              </div>
            </Section>

          <Section id="recognition" title="Recognition">
            <div className="grid gap-5 md:grid-cols-2">
              {RECOGNITION_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-subtle dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                <p>
                  For opportunities in entry-level IT support, network and cybersecurity
                  internships, or digital content roles, feel free to reach out directly.
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Phone
                    </p>
                    <a
                      href={CONTACT_DETAILS.phoneHref}
                      className="text-sm text-slate-800 underline-offset-4 hover:underline dark:text-slate-100"
                    >
                      {CONTACT_DETAILS.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Email
                    </p>
                    <a
                      href={CONTACT_DETAILS.emailHref}
                      className="text-sm text-slate-800 underline-offset-4 hover:underline dark:text-slate-100"
                    >
                      {CONTACT_DETAILS.email}
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-1 text-xs">
                  <a
                    href={CONTACT_DETAILS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                  >
                    LinkedIn <span aria-hidden>↗</span>
                  </a>
                  <a
                    href={CONTACT_DETAILS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                  >
                    GitHub <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>

              <form
                ref={contactFormRef}
                className="space-y-3 rounded-2xl border border-slate-100 bg-white/80 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                onSubmit={handleContactSubmit}
              >
                <input type="hidden" name="subject" value="Portfolio contact" />
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="from_name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="reply_to"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    minLength={10}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none ring-accent/20 transition focus:border-accent focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Write a short message or introduction."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-subtle transition hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  {isSending ? "Sending..." : "Send"}
                </button>
                {contactStatus === "success" && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400" aria-live="polite">
                    Thanks for reaching out—your message has been sent.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-[11px] text-red-500 dark:text-red-400" aria-live="polite">
                    Please complete all fields with a short message, or try sending again.
                  </p>
                )}
              </form>
            </div>
          </Section>
          </main>
          <FloatingChat />
        </div>
      </ActiveSectionProvider>
    </ChatProvider>
  );
}

type SkillGroupProps = {
  label: string;
  items: string[];
};

const SkillGroup = ({ label, items }: SkillGroupProps) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

