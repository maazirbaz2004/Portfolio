import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Maaz Irbaz | Full-Stack Developer & AI Enthusiast",
  description: "Personal portfolio website of Maaz Irbaz, a Computer Science student building scalable web applications and artificial intelligence solutions.",
  keywords: ["Maaz Irbaz", "Developer Portfolio", "Full Stack Developer", "AI Engineer", "Next.js", "TypeScript", "React", "Supabase", "Prisma"],
  authors: [{ name: "Maaz Irbaz" }],
  openGraph: {
    title: "Maaz Irbaz | Full-Stack Developer & AI Enthusiast",
    description: "Personal portfolio website of Maaz Irbaz, a Computer Science student building scalable web applications and artificial intelligence solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-portfolio-lightBg dark:bg-portfolio-darkBg text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
