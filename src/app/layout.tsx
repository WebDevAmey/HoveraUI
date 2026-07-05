import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/Toast";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import Preloader from "@/components/chrome/Preloader";
import CustomCursor from "@/components/chrome/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hovera UI — CSS Background Patterns",
    template: "%s | Hovera UI",
  },
  description:
    "A curated library of production-ready CSS and Tailwind background patterns. Preview live, copy the code, drop it in your project.",
  metadataBase: new URL("https://backlab.dev"),
  openGraph: {
    title: "Hovera UI — CSS Background Patterns",
    description:
      "Preview and copy beautiful CSS background patterns for your next project.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppProvider>
            <SmoothScroll />
            <Preloader />
            <CustomCursor />
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
