export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "ask", label: "Ask" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" }
] as const;

export const HERO_CONTENT = {
  eyebrow: "IT Support · Cybersecurity · Content",
  name: "Botin, John Wilberth B.",
  tagline:
    "Creator | Security | AI | Dev | BSIT (Network & Cybersecurity) Student | Marketing | Tech Enthusiast",
  availability:
    "Based in the Philippines · Available for entry-level IT support, technical operations, and digital content roles."
} as const;

export const ABOUT_PARAGRAPHS = [
  "I’m an entry-level IT support professional and BSIT (Network & Cybersecurity) student focused on keeping people and systems running smoothly. I enjoy troubleshooting issues, documenting clear steps, and communicating in a way that makes technical topics easy to understand for both technical and non-technical users.",
  "Alongside my studies, I manage real-world content operations—handling high-volume posting, analytics, and optimization across multiple pages and platforms. This blend of IT, cybersecurity awareness, and content analytics experience allows me to support modern digital environments where reliability, safety, and clear communication all matter."
] as const;

export type TimelineEntry = {
  title: string;
  period: string;
  subtitle?: string;
  meta?: string;
  bullets?: readonly string[];
};

export const EXPERIENCE_ITEMS: readonly TimelineEntry[] = [
  {
    title: "Freelance Web & Systems Developer — Self-Employed | Remote",
    period: "2025 – Present",
    bullets: [
      "Build and maintain client websites and small web-based systems from requirements through launch—layout, responsive UI, forms and contact flows, performance-minded frontends, and handoffs clients can actually operate.",
      "Handle the practical engineering around shipping: hosting and deployments, basic technical SEO, analytics-friendly structure, accessibility-minded patterns, and troubleshooting when something breaks in production.",
      "Some engagements are covered by NDAs or confidentiality terms; those projects are omitted here out of respect for client agreements."
    ]
  },
  {
    title: "Content Creator — Meta (Self-Employed) | Remote",
    period: "2022 – Present",
    bullets: [
      "Created viral content including “Xavier Filipino Version,” featured on GMA (I Juander).",
      "Managed and scheduled up to 70 posts/day via Meta Business Suite across multiple pages.",
      "Used insights/analytics to optimize reach, engagement, and growth."
    ]
  },
  {
    title: "Social Media Manager — Freelance",
    period: "Sep 2022 – Present",
    bullets: [
      "Curated platform-appropriate content for Facebook, TikTok, YouTube.",
      "Ensured compliance with platform policies and consistent brand presence."
    ]
  },
  {
    title: "Photo / Video Editor & Branding Specialist — Freelance",
    period: "Feb 2022 – Jan 2024",
    bullets: [
      "Designed logos/branding for small businesses and personal brands.",
      "Built client base through organic outreach; delivered high-quality visuals."
    ]
  }
];

export const EDUCATION_ITEMS: readonly TimelineEntry[] = [
  {
    title: "Mapúa Malayan Digital College (Mapúa Malayan Colleges Laguna)",
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
];

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    label: "Programming Languages",
    items: ["C", "C++", "Python", "Java", "JavaScript"]
  },
  { label: "Web Technologies", items: ["HTML", "CSS"] },
  {
    label: "Frameworks & Library",
    items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    label: "SEO, integrations & delivery",
    items: [
      "Technical SEO & canonical URLs",
      "JSON-LD (FAQPage, LodgingBusiness)",
      "Open Graph & Twitter cards",
      "Sitemap.xml & robots.txt",
      "AI inquiry chatbot & resilient APIs",
      "Multi-currency UX (PHP / USD)",
      "WhatsApp & email inquiry flows",
      "Production fixes (redirects, indexing, sitemaps)"
    ]
  },
  {
    label: "Cybersecurity Knowledge",
    items: [
      "Phishing Awareness",
      "Social Engineering Basics",
      "Online Privacy",
      "Digital Safety"
    ]
  },
  {
    label: "Tools & Platforms",
    items: [
      "GitHub",
      "Vercel",
      "Meta Business Suite",
      "Canva",
      "Documentation & common IT tools"
    ]
  }
];

export type ProjectEntry = {
  title: string;
  subtitle: string;
  badge?: string;
  summary?: string;
  caseStudy?: string;
  myRole?: string;
  highlights?: readonly string[];
  resumeBullets?: readonly string[];
  tags?: readonly string[];
  bullets: readonly string[];
  linkHref?: string;
  linkLabel?: string;
};

export const PROJECTS: readonly ProjectEntry[] = [
  {
    title: "Tigil Kalat PH: Educational Website",
    subtitle: "Web Project",
    summary:
      "An environmental awareness website designed to turn course objectives into a clear, accessible, and visually engaging public learning experience.",
    linkHref: "https://tigil-kalat-ph.vercel.app/",
    linkLabel: "Visit site",
    bullets: [
      "Designed and developed an environmental awareness website focused on responsible waste management and digital education.",
      "Built a user-friendly public site with clear messaging and visual storytelling.",
      "Exceeded rubric and selected as an Exemplary Learner Output (ELO) nominee.",
      "Considered for faculty/institutional use as learning material."
    ]
  },
  {
    title: "Xavier Filipino Version — Viral Digital Content",
    subtitle: "Digital Content Project",
    summary:
      "A culturally resonant parody content project built around timing, humor, and audience insight, which later earned national TV exposure.",
    linkHref: "https://vt.tiktok.com/ZSmCpu5SX/",
    linkLabel: "Media link",
    bullets: [
      "Conceptualized, scripted, and produced parody content that resonated with Filipino audiences.",
      "Drove organic engagement through trend analysis, humor, and timing.",
      "Resulted in a national TV feature on GMA’s I Juander."
    ]
  },
  {
    title: "Facebook Affiliate Advertising Campaigns",
    subtitle: "Digital Marketing & Content Project",
    summary:
      "Performance-oriented ad creative work focused on tailoring messaging and visuals to different audiences and conversion goals.",
    bullets: [
      "Created promotional content/ad creatives for epoxy flooring solutions and a solar-powered portable power station.",
      "Adapted messaging and visuals to audience segments to support engagement and conversion goals."
    ]
  },
  {
    title: "Digital Safety & Cyber Awareness Content",
    subtitle: "Cyber Awareness Project",
    summary:
      "Educational content designed to make online privacy, phishing, and safe digital behavior easier to understand for everyday users.",
    bullets: [
      "Curated cyber awareness content covering online privacy, phishing, and responsible technology use.",
      "Simplified cyber risks into student-friendly scenarios to support safe online practices."
    ]
  },
  {
    title: "Villa Ikarus",
    subtitle: "Luxury hospitality / resort website",
    badge: "New",
    summary:
      "Villa Ikarus is a production-ready luxury resort marketing and inquiry website I built end to end for a private coastal villa in Tinambac, Camarines Sur. It combines polished visual storytelling, conversion-focused inquiry flows, PHP/USD multi-currency pricing, AI-assisted guest questions, and technical SEO improvements to drive discoverability and bookings.",
    caseStudy:
      "Villa Ikarus is a production resort website I built from scratch as the sole developer to present the brand, showcase accommodations and dining, support guest inquiries, and improve search visibility. I implemented a smooth, mobile-responsive experience featuring a hero video landing page, resort package browsing with pricing, dining menu pages, gallery + post-wall media, reviews, FAQ, and a complete contact section—backed by dedicated pages for Packages, Dining, Gallery, Post Wall, FAQ, Privacy, and Cookies. On the product side, I built a conversion-ready inquiry experience with an AI-powered assistant that answers about packages, dining, amenities, booking, and policies, connected to a currency/pricing context so answers stay consistent with the selected PHP or USD view; I also added WhatsApp contact options and an email inquiry flow. On the engineering side, I delivered technical SEO work (structured metadata, Open Graph + Twitter cards, canonical handling, robots.txt + sitemap.xml, JSON-LD for LodgingBusiness and FAQPage) and production debugging fixes for real issues like sitemap reliability, indexing inconsistencies, favicon/search appearance, and redirect loop behavior—plus resilience in the chat API through safe fallbacks and user-safe responses when generation fails. I also included performance and UX details such as scroll restoration handling, autoplay-safe hero video behavior, modal/lightbox interactions with escape-key support, and graceful geo/country-based currency detection with fallback behavior.",
    myRole:
      "Sole developer. I independently designed, built, refined, debugged, and shipped the full Villa Ikarus experience end to end—UX, frontend implementation, AI inquiry behavior, currency/pricing system, SEO execution, integrations (WhatsApp/email), production debugging, and deployment.",
    highlights: [
      "Independent end-to-end build: from App Router architecture and frontend components to SEO, integrations, and deployment.",
      "Product-minded resort UX: package browsing, dining menu pages, gallery + post-wall media, reviews, and a conversion-ready inquiry/contact flow.",
      "AI inquiry assistant: a floating chatbot that answers guest questions about packages, dining, amenities, booking, and policies.",
      "Currency-aware guest experience: PHP/USD currency toggle backed by a centralized pricing/currency system; chatbot answers stay consistent with the selected currency.",
      "Conversion integrations: WhatsApp contact options and an email inquiry flow connected to the guest journey.",
      "Technical SEO delivered: structured metadata, Open Graph/Twitter cards, canonical URL handling, robots.txt + sitemap.xml, and JSON-LD for `LodgingBusiness` + `FAQPage`.",
      "Production debugging and stability fixes: sitemap reliability improvements, indexing inconsistency resolution, favicon/search appearance fixes, and redirect loop debugging.",
      "Performance + UX polish: scroll restoration handling, autoplay-safe hero video behavior, smooth mobile responsiveness, and media-rich gallery interactions (carousels/lightboxes/modals).",
      "Accessibility-minded interactions: escape-key support for modals/lightboxes and predictable close behaviors."
    ],
    resumeBullets: [
      "Built and shipped Villa Ikarus as the sole developer using Next.js (App Router), React, TypeScript, Tailwind CSS, and Vercel—delivering a production resort website with inquiry flows, AI chatbot guest questions, multi-currency pricing, and mobile-first UX polish.",
      "Implemented technical SEO end to end: metadata, Open Graph + Twitter cards, canonical URL handling, robots.txt + sitemap.xml, and JSON-LD structured data for `LodgingBusiness` and `FAQPage`.",
      "Resolved production issues affecting discoverability and stability (sitemap reliability, indexing inconsistencies, favicon/search appearance, and redirect loop behavior) and added resilience in the chat API with safe fallbacks when AI generation fails."
    ],
    tags: [
      "Next.js",
      "React",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Technical SEO",
      "Open Graph",
      "Canonical URLs",
      "Structured Data",
      "JSON-LD",
      "AI Chatbot",
      "Multi-currency (PHP/USD)",
      "WhatsApp",
      "Full-stack/Integration",
      "Accessibility"
    ],
    linkHref: "https://villaikarus.com",
    linkLabel: "Live Site",
    bullets: [
      "Built a production resort marketing + inquiry website end to end using Next.js, React, TypeScript, Tailwind CSS, and Vercel, using App Router architecture.",
      "Created a conversion-focused landing experience with a hero video, About section, package showcase with pricing, dining section, gallery + post wall media, reviews, and a complete contact section.",
      "Implemented dedicated content pages: Packages, Dining, Gallery, Post Wall, FAQ, Privacy, and Cookies to support both navigation and search visibility.",
      "Added two resort offerings—`Private Pair Package` and `The Gathering Package`—with a pricing system and currency toggle for PHP and USD.",
      "Built a dining menu experience with structured categories, item pricing, and visual/PDF-style menu support so guests can browse confidently.",
      "Delivered a media-rich gallery experience with carousels, lightboxes, modal previews, and smooth interaction patterns designed for mobile.",
      "Integrated an AI chatbot inquiry assistant connected to pricing/currency context so answers for packages, dining, amenities, booking, and policies remain consistent with the selected currency.",
      "Connected guest inquiries through WhatsApp contact options and an email inquiry flow; included cookie consent controls and privacy storage gating.",
      "Executed technical SEO end to end: structured metadata, Open Graph + Twitter cards, canonical URL handling, robots.txt + sitemap.xml, and JSON-LD schema (`LodgingBusiness`, `FAQPage`).",
      "Solved production issues and stability problems: sitemap reliability failures, indexing inconsistencies, favicon/search appearance, and redirect loop debugging; improved chat API resilience with safe fallbacks when AI generation fails."
    ]
  }
];

export type RecognitionEntry = {
  eyebrow: string;
  title: string;
  description: string;
};

export const RECOGNITION_ITEMS: readonly RecognitionEntry[] = [
  {
    eyebrow: "MMDC ELO Nominee",
    title: "MMDC Exemplary Learner Output (ELO) Nominee",
    description:
      "Selected for the MMDC Exemplary Learner Output (ELO) award, with consent requested for MMDC to use outputs for their institutional purposes."
  },
  {
    eyebrow: "National TV Feature",
    title: "Featured on GMA (I Juander)",
    description:
      "National TV feature on GMA's I Juander program as a result of the viral “Xavier Filipino Version” digital content project."
  }
];

export const CONTACT_DETAILS = {
  phone: "+63 951 146 9521",
  phoneHref: "tel:+639511469521",
  email: "contactjohnbotin@gmail.com",
  emailHref: "mailto:contactjohnbotin@gmail.com",
  linkedin: "https://www.linkedin.com/in/johnwilberthbotin",
  github: "https://github.com/itspodleeeee",
  facebook: "https://www.facebook.com/jw.botin",
  instagram: "https://www.instagram.com/jhnwlbt.fr",
  resume:
    "https://drive.google.com/file/d/1zxIOrKkUOmmeHwXWmWOoQsAKvxsEoMya/view?usp=sharing"
} as const;

export const CHATBOT_FACTS = {
  location: "Philippines",
  targetRoles: ["Entry-level IT Support", "Network & Cybersecurity student"],
  relationshipStatus: "In a committed relationship with Micah and happily in a relationship with her.",
  extraHighlights: [
    "Created a Facebook page that amassed 100k followers in 6 months with content focused on humor, motivation, and relatable themes.",
    "Developed a content strategy that increased engagement by 150% within 3 months, utilizing analytics to optimize posting times and content types.",
    "Recognized for exceptional creativity and consistency in content creation, leading to a 200% growth in audience reach over a year.",
    "Currently pursuing BS in Information Technology with a focus on networking and cybersecurity at Mapúa Malayan Digital College under Mapúa Malayan Colleges Laguna, with an expected graduation date of 2028.",
    "Operating system knowledge includes Windows, Linux, and macOS, with experience in troubleshooting and providing IT support across these platforms.",
    "Strong communication skills, both written and verbal, with experience in managing social media accounts and engaging with online communities.",
    "Committed to continuous learning and staying updated with the latest trends and technologies in IT support and cybersecurity.",
    "Passionate about using technology to solve problems and improve digital safety for individuals and organizations.",
    "Open for job opportunities in technology, IT support, and cybersecurity roles, and eager to contribute skills and knowledge to a dynamic team."
  ]
} as const;
