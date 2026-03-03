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
  icons: {
    icon: "https://camo.githubusercontent.com/e8d7a0f9b14ae56c0d95fe8db0e653db814a82d747c2cbdf65444d01dac10230/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3132382f333937352f333937353039302e706e67"
  },
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

