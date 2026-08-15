import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* --------------------------------------------------------------------------
   FONTS
   Three families, loaded via next/font — self-hosted at build time, so there
   is no external request and no layout shift.

   Archivo        — display. Grotesk with tight apertures; reads technical
                    rather than friendly. Used for all headings and numerals.
   Inter          — body. Neutral and highly legible at small sizes.
   JetBrains Mono — technical labels, section numbers, eyebrows.

   Each exposes a CSS variable consumed by the @theme block in globals.css.
   -------------------------------------------------------------------------- */

const display = Archivo({
  variable: "--font-sans-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-technical",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/* --------------------------------------------------------------------------
   METADATA
   Root defaults. Individual pages override title and description.
   NOTE: no company claims here — only what the brief confirms.
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default:
      "Alpha Automation & Controls — Industrial Automation & Control Solutions",
    template: "%s — Alpha Automation & Controls",
  },
  description:
    "Alpha Automation & Controls designs and builds industrial control panels and automation systems in Coimbatore, Tamil Nadu.",
  applicationName: "Alpha Automation & Controls",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Alpha Automation & Controls",
    title: "Alpha Automation & Controls",
    description:
      "Industrial control panels and automation systems. Coimbatore, Tamil Nadu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* --------------------------------------------------------------------------
   ROOT LAYOUT
   -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Keyboard users land here first and can jump past the navigation.
            Hidden until focused — styled by .skip-link in globals.css. */}
        <a href="#main" className="skip-link eyebrow">
          Skip to content
        </a>

        {/* Navigation slots in above this in Phase 3. */}

        <main id="main">{children}</main>

        {/* Footer slots in below this in Phase 3. */}
      </body>
    </html>
  );
}