import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { registry } from "@/registry";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HoveraUI — a small library of original components",
    template: "%s · HoveraUI",
  },
  description:
    "Thirty-one original React components, each built around one idea. Copy the source, keep the craft.",
  openGraph: { type: "website", siteName: "HoveraUI" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong colors.
const themeScript = `(function(){try{var t=localStorage.getItem("hv-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter count={registry.length} />
      </body>
    </html>
  );
}
