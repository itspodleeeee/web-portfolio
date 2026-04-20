import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CONTACT_DETAILS } from "../data/portfolio";
import { SITE_URL } from "../data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "John Wilberth B. Botin | IT Support & Web Portfolio",
  description:
    "Portfolio of John Wilberth B. Botin, a BSIT (Network & Cybersecurity) student focused on IT support, web development, and client-facing digital projects.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/"
  },
  applicationName: "John Wilberth B. Botin Portfolio",
  keywords: [
    "John Wilberth Botin",
    "John Wilberth B. Botin",
    "John Botin portfolio",
    "IT support portfolio",
    "BSIT network cybersecurity",
    "web developer Philippines"
  ],
  authors: [{ name: "John Wilberth B. Botin", url: SITE_URL }],
  creator: "John Wilberth B. Botin",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png"
      }
    ],
    shortcut: ["/icon.png"]
  },
  openGraph: {
    title: "John Wilberth B. Botin | IT Support & Web Portfolio",
    description:
      "Portfolio of John Wilberth B. Botin showcasing IT support capability, web projects, and technical execution in production.",
    url: SITE_URL,
    siteName: "John Wilberth B. Botin",
    locale: "en_PH",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "John Wilberth B. Botin | IT Support & Web Portfolio",
    description:
      "Portfolio of John Wilberth B. Botin showcasing IT support capability, web projects, and technical execution in production."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  other: {
    "contact:email": CONTACT_DETAILS.email
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>{children}</ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

