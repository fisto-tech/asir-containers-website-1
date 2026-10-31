import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/outfit";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/ui/Preloader";
import { BackToTop } from "@/components/ui/BackToTop";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Plastic Containers & Industrial Packaging Manufacturer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "plastic paint pail manufacturer",
    "plastic containers",
    "industrial packaging",
    "fertilizer square pail",
    "plastic pail container",
    "food grade plastic containers",
    "lubricant pail",
    "ASIR Containers",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Plastic Containers & Industrial Packaging`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [{ url: "/images/hero/hero-01.jpg", width: 1376, height: 768, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Plastic Containers & Industrial Packaging`,
    description: site.description,
    images: ["/images/hero/hero-01.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/images/asir-containers-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/images/asir-containers-logo.svg"],
    apple: [
      { url: "/images/asir-containers-logo.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Flags that JavaScript is available before first paint, so scroll-reveal
          elements can start hidden. Without JS every element stays visible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body className="bg-white text-ink antialiased">
        <Preloader />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
