import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter_Tight } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "hackathon",
    "Art of Living",
    "volunteer tech",
    "36 hour hackathon",
    "nonprofit hackathon",
  ],
  authors: [{ name: siteConfig.org }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${interTight.variable}`}>
      <head>
        {/* Scroll reveals are JS-driven; without JS they would never resolve. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-cream"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Event schema stays accurate while dates are unset: no startDate is
          // emitted until the window is announced.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: siteConfig.name,
              description: siteConfig.description,
              eventStatus: "https://schema.org/EventScheduled",
              organizer: { "@type": "Organization", name: siteConfig.org, url: siteConfig.url },
              isAccessibleForFree: true,
              ...(siteConfig.window.status === "set"
                ? {
                    startDate: siteConfig.window.value.startsAt,
                    endDate: siteConfig.window.value.endsAt,
                  }
                : {}),
            }),
          }}
        />
      </body>
    </html>
  );
}
