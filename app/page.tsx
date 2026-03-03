'use client';

import { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { ActiveSectionProvider, Section } from "../components/Section";
import { Timeline } from "../components/Timeline";
import { ProjectCard } from "../components/ProjectCard";
import { ChatWidget } from "../components/ChatWidget";
import { FloatingChat } from "../components/FloatingChat";

export default function Page() {
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [contactStatus, setContactStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactFormRef.current || isSending) return;

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
    <ActiveSectionProvider>
      <div className="min-h-screen bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-50">
        <Navbar />
        <main>
          <Hero />

          <Section id="about" title="About">
            <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                I&apos;m an entry-level IT support professional and BSIT (Network &amp;
                Cybersecurity) student focused on keeping people and systems running
                smoothly. I enjoy troubleshooting issues, documenting clear steps, and
                communicating in a way that makes technical topics easy to understand for
                both technical and non-technical users.
              </p>
              <p>
                Alongside my studies, I manage real-world content operations—handling
                high-volume posting, analytics, and optimization across multiple pages and
                platforms. This blend of IT, cybersecurity awareness, and content
                analytics experience allows me to support modern digital environments
                where reliability, safety, and clear communication all matter.
              </p>
            </div>
          </Section>

          <Section id="experience" title="Experience">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,1fr)]">
              <Timeline
                items={[
                  {
                    title: "Content Creator — Meta (Self-Employed) | Remote",
                    period: "2022 – Present",
                    description: (
                      <ul className="space-y-1.5">
                        <li>
                          Created viral content including “Xavier Filipino Version,”
                          featured on GMA (I Juander).
                        </li>
                        <li>
                          Managed and scheduled up to 70 posts/day via Meta Business Suite
                          across multiple pages.
                        </li>
                        <li>
                          Used insights/analytics to optimize reach, engagement, and
                          growth.
                        </li>
                      </ul>
                    )
                  },
                  {
                    title: "Social Media Manager — Freelance",
                    period: "Sep 2022 – Present",
                    description: (
                      <ul className="space-y-1.5">
                        <li>
                          Curated platform-appropriate content for Facebook, TikTok,
                          YouTube.
                        </li>
                        <li>
                          Ensured compliance with platform policies and consistent brand
                          presence.
                        </li>
                      </ul>
                    )
                  },
                  {
                    title: "Photo / Video Editor & Branding Specialist — Freelance",
                    period: "Feb 2022 – Jan 2024",
                    description: (
                      <ul className="space-y-1.5">
                        <li>
                          Designed logos/branding for small businesses and personal
                          brands.
                        </li>
                        <li>
                          Built client base through organic outreach; delivered
                          high-quality visuals.
                        </li>
                      </ul>
                    )
                  }
                ]}
              />

              <div className="space-y-6 rounded-2xl border border-slate-100 bg-white/70 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Education
                </h3>
                <Timeline
                  items={[
                    {
                      title:
                        "Mapúa Malayan Digital College (Mapúa Malayan Colleges Laguna)",
                      subtitle:
                        "Bachelor of Science in Information Technology, Specialization in Network & Cybersecurity",
                      period: "2025 – Present"
                    },
                    {
                      title: "Camarines Sur Polytechnic Colleges (CSPC)",
                      subtitle: "Bachelor of Science in Computer Science",
                      period: "2024 – 2025",
                      meta: "Completed 2 semesters"
                    },
                    {
                      title: "Naga College Foundation, Inc.",
                      subtitle: "Bachelor of Science in Computer Science",
                      period: "2023 – 2024",
                      meta: "Achievement: Dean’s Lister (1st Semester)"
                    }
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SkillGroup
                label="Programming Languages"
                items={["C", "C++", "Python", "Java", "JavaScript"]}
              />
              <SkillGroup label="Web Technologies" items={["HTML", "CSS"]} />
              <SkillGroup
                label="Frameworks & Library"
                items={["ReactJS", "Tailwind CSS"]}
              />
              <SkillGroup
                label="Cybersecurity Knowledge"
                items={[
                  "Phishing Awareness",
                  "Social Engineering Basics",
                  "Online Privacy",
                  "Digital Safety"
                ]}
              />
              <SkillGroup
                label="Tools & Platforms"
                items={[
                  "GitHub",
                  "Meta Business Suite",
                  "Canva",
                  "Documentation & common IT tools"
                ]}
              />
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="grid gap-5 md:grid-cols-2">
              <ProjectCard
                title="Tigil Kalat PH: Educational Website"
                subtitle="Web Project"
                linkHref="https://tigil-kalat-ph.vercel.app/"
                linkLabel="Visit site"
                bullets={[
                  "Designed and developed an environmental awareness website focused on responsible waste management and digital education.",
                  "Built a user-friendly public site with clear messaging and visual storytelling.",
                  "Exceeded rubric and selected as an Exemplary Learner Output (ELO) nominee.",
                  "Considered for faculty/institutional use as learning material."
                ]}
              />
              <ProjectCard
                title="Xavier Filipino Version — Viral Digital Content"
                subtitle="Digital Content Project"
                linkHref="https://vt.tiktok.com/ZSmCpu5SX/"
                linkLabel="Media link"
                bullets={[
                  "Conceptualized, scripted, and produced parody content that resonated with Filipino audiences.",
                  "Drove organic engagement through trend analysis, humor, and timing.",
                  "Resulted in a national TV feature on GMA’s I Juander."
                ]}
              />
              <ProjectCard
                title="Facebook Affiliate Advertising Campaigns"
                subtitle="Digital Marketing & Content Project"
                bullets={[
                  "Created promotional content/ad creatives for epoxy flooring solutions and a solar-powered portable power station.",
                  "Adapted messaging and visuals to audience segments to support engagement and conversion goals."
                ]}
              />
              <ProjectCard
                title="Digital Safety & Cyber Awareness Content"
                subtitle="Cyber Awareness Project"
                bullets={[
                  "Curated cyber awareness content covering online privacy, phishing, and responsible technology use.",
                  "Simplified cyber risks into student-friendly scenarios to support safe online practices."
                ]}
              />
            </div>
          </Section>

          <Section id="ask" title="Ask about me">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div className="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <p>
                  Use this chatbot to quickly learn about my projects, ELO nomination,
                  IT support experience, and the GMA feature—based only on information in
                  this portfolio.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  For anything not covered here (like availability or personal details),
                  please reach out directly at{" "}
                  <a
                    href="mailto:contactjohnbotin@gmail.com"
                    className="underline underline-offset-4"
                  >
                    contactjohnbotin@gmail.com
                  </a>
                  .
                </p>
              </div>
              <ChatWidget />
            </div>
          </Section>

          <Section id="recognition" title="Recognition">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-subtle dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  MMDC ELO Nominee
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  MMDC Exemplary Learner Output (ELO) Nominee
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Selected for the MMDC Exemplary Learner Output (ELO) award, with
                  consent requested for MMDC to use outputs for their institutional
                  purposes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-subtle dark:border-slate-800 dark:bg-slate-900/70">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  National TV Feature
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Featured on GMA (I Juander)
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  National TV feature on GMA&apos;s I Juander program as a result of the
                  viral “Xavier Filipino Version” digital content project.
                </p>
              </div>
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
                      href="tel:+639511469521"
                      className="text-sm text-slate-800 underline-offset-4 hover:underline dark:text-slate-100"
                    >
                      +63 951 146 9521
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Email
                    </p>
                    <a
                      href="mailto:contactjohnbotin@gmail.com"
                      className="text-sm text-slate-800 underline-offset-4 hover:underline dark:text-slate-100"
                    >
                      contactjohnbotin@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-1 text-xs">
                  <a
                    href="https://www.linkedin.com/in/johnwilberthbotin"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-900"
                  >
                    LinkedIn <span aria-hidden>↗</span>
                  </a>
                  <a
                    href="https://github.com/itspodleeeee"
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
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    Thanks for reaching out—your message has been sent.
                  </p>
                )}
                {contactStatus === "error" && (
                  <p className="text-[11px] text-red-500 dark:text-red-400">
                    Something went wrong while sending. Please try again.
                  </p>
                )}
              </form>
            </div>
          </Section>
        </main>
        <FloatingChat />
      </div>
    </ActiveSectionProvider>
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

