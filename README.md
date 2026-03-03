## Portfolio – John Wilberth B. Botin

A modern, single-page portfolio site highlighting John Wilberth Botin’s IT support, network & cybersecurity studies, and digital content work.  
The site is built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, and includes a light/dark theme, polished sections for experience and projects, and an AI-powered “Ask about John” assistant.

### Tech stack

- **Framework**: Next.js 14 (App Router) with React 18 and TypeScript  
- **Styling**: Tailwind CSS, custom theme tokens, responsive layout  
- **Animations**: Framer Motion for subtle card and project interactions  
- **Images**: `next/image` for the profile avatar (light/dark variants, hover swap)  
- **AI assistant**: Gemini via the official `@google/genai` SDK, exposed through a server-side API route

### Key features

- **Hero** with name, role, location, theme-aware profile avatar, and primary CTAs  
- **Sticky navigation** with smooth scrolling and active section highlighting  
- **About** section focused on entry-level IT support readiness and cybersecurity awareness  
- **Experience & Education** timelines for work history and academic journey  
- **Skills** grouped by languages, web, frameworks, cybersecurity knowledge, and tools  
- **Projects** presented as expandable cards (e.g., Tigil Kalat PH, Xavier Filipino Version, campaigns, cyber awareness content)  
- **Recognition** for ELO nomination and GMA feature  
- **Ask about me** section and floating chat launcher that answer concise questions about John based on curated context  
- **Contact** area with phone, email, and social links, plus a simple demo contact form

### Running the project

```bash
npm install
npm run dev
```

Then open the local development URL shown in the terminal (typically `http://localhost:3000` or a nearby port if 3000 is busy).

### Customization guide

- **Content** – All text for sections such as Hero, About, Skills, Experience, Education, Projects, Recognition, Contact, and Ask about me is maintained in the main application code. Update those strings to reflect new roles, skills, or projects as needed.  
- **Styling & theme** – Tailwind’s configuration extends colors, fonts, and shadows to create a minimal, premium aesthetic. Global styles and layout classes can be tuned to adjust spacing, typography scale, or color palette.  
- **Profile images** – The hero avatar supports separate images for light/dark base and hover states. Replace the existing profile assets in the public images folder with your own, keeping the same filenames to preserve behavior.  
- **AI assistant behavior** – The chatbot is restricted to a curated context describing John’s background, experience, skills, and key projects. To adjust responses, edit this context or refine the system-style instructions used when constructing the prompt.

### AI assistant overview

- The assistant is implemented as a small chat UI, with a dedicated “Ask about me” section and a floating chat button anchored to the bottom-right of the viewport.  
- It provides short, factual answers drawn only from the curated context (projects, roles, skills, recognitions, and links).  
- If a visitor asks something outside that scope, the assistant responds with a gentle prompt to contact John directly.  
- Responses are intentionally concise (1–6 sentences) and tuned with conservative generation settings to avoid speculation.

### UX and accessibility notes

- Smooth scrolling respects system **reduced motion** preferences.  
- Color choices and typography aim for strong contrast in both light and dark themes.  
- Landmarks and headings are structured for screen readers, and interactive elements use clear focus and hover states.  
- The chatbot UI is designed to be unobtrusive but discoverable, with a small introductory hint and compact layout on smaller screens.

