import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "John Wilberth B. Botin | Portfolio",
  description:
    "Entry-level IT support and cybersecurity-focused BSIT student with real-world content operations and analytics experience.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "John Wilberth B. Botin | Portfolio",
    description:
      "Entry-level IT support and cybersecurity-focused BSIT student with real-world content operations and analytics experience.",
    url: "https://example.com",
    siteName: "John Wilberth B. Botin",
    locale: "en_PH",
    type: "website"
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
      </body>
    </html>
  );
}

