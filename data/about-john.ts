import {
  CERTIFICATES,
  CHATBOT_FACTS,
  CONTACT_DETAILS,
  EDUCATION_ITEMS,
  EXPERIENCE_ITEMS,
  PROJECTS,
  RECOGNITION_ITEMS,
  SKILL_GROUPS
} from "./portfolio";

const projectHighlights = PROJECTS.map((project) => {
  const lines = [
    `${project.title} | ${project.subtitle}`,
    ...(project.myRole ? [`Role: ${project.myRole}`] : []),
    ...(project.highlights?.length
      ? ["Highlights:", ...project.highlights.map((highlight) => `● ${highlight}`)]
      : []),
    ...project.bullets.map((bullet) => `● ${bullet}`)
  ];

  if (project.linkHref) {
    lines.push(`Link: ${project.linkHref}`);
  }

  return lines.join("\n");
}).join("\n");

export const CONTEXT = `
Name: John Wilberth Botin
Location: ${CHATBOT_FACTS.location}

Target roles:
${CHATBOT_FACTS.targetRoles.map((role) => `- ${role}`).join("\n")}

Links:
- LinkedIn: ${CONTACT_DETAILS.linkedin}
- GitHub: ${CONTACT_DETAILS.github}
- Facebook: ${CONTACT_DETAILS.facebook}
- Instagram: ${CONTACT_DETAILS.instagram}
- Resume: ${CONTACT_DETAILS.resume}

Key highlights:
${PROJECTS.filter((project) => project.badge === "New").length > 0
  ? PROJECTS.filter((project) => project.badge === "New")
      .map(
        (project) =>
          `- Featured project: ${project.title}${project.linkHref ? ` (${project.linkHref})` : ""}${project.myRole ? ` | ${project.myRole}` : ""}`
      )
      .join("\n")
  : ""}
${PROJECTS.slice(0, 2)
  .map((project) => `- ${project.title}${project.linkHref ? ` (${project.linkHref})` : ""}`)
  .join("\n")}
${CHATBOT_FACTS.extraHighlights.map((highlight) => `- ${highlight}`).join("\n")}

Experience:
${EXPERIENCE_ITEMS.map(
  (item) =>
    `- ${item.title}, ${item.period}${item.bullets?.length ? `\n${item.bullets.map((bullet) => `  - ${bullet}`).join("\n")}` : ""}`
).join("\n")}

Education:
${EDUCATION_ITEMS.map(
  (item) =>
    `- ${item.title}, ${item.period}${item.subtitle ? `\n  - ${item.subtitle}` : ""}${item.meta ? `\n  - ${item.meta}` : ""}`
).join("\n")}

Skills:
${SKILL_GROUPS.map((group) => `- ${group.label}: ${group.items.join(", ")}`).join("\n")}
- Personal: ${CHATBOT_FACTS.relationshipStatus}

Recognition:
${RECOGNITION_ITEMS.map((item) => `- ${item.title}: ${item.description}`).join("\n")}

Certifications (knowledge-only, not all are displayed in public cert cards):
${CHATBOT_FACTS.certifications
  .map(
    (cert) =>
      `- ${cert.title} | ${cert.issuer} | Issued ${cert.issued} | Credential ID: ${cert.credentialId}`
  )
  .join("\n")}
${CERTIFICATES.map(
  (cert) =>
    `- Public certificate displayed on website: ${cert.title} | ${cert.issuer}${cert.verifyUrl ? ` | Verify: ${cert.verifyUrl}` : ""}`
).join("\n")}

RESUME:
Botin, John Wilberth B.
${CONTACT_DETAILS.email} | Philippines

Programming Languages: C, C++, Python, Java, JavaScript
Frameworks and Library: ReactJS, Tailwind CSS
Related Coursework: UI/UX, Data Visualization, Cybersecurity

PROJECTS & WORKS
${projectHighlights}
`.trim();

