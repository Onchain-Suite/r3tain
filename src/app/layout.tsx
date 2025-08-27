import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { RootProviders } from "@/lib/providers";
import { seoConfig } from "@/lib/seo-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: seoConfig.titleTemplate,
  },
  description: seoConfig.defaultDescription,
  keywords: [
    "web3 marketing",
    "blockchain marketing",
    "marketing automation",
    "customer retention",
    "AI marketing",
    "crypto marketing",
    "decentralized marketing",
    "smart contracts marketing",
    "NFT marketing",
    "DeFi marketing",
  ],
  authors: [{ name: "R3tain Team" }],
  creator: "R3tain",
  publisher: "R3tain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: seoConfig.openGraph,
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    site: seoConfig.twitter.site,
    creator: seoConfig.twitter.handle,
    images: seoConfig.images,
  },
  robots: {
    ...seoConfig.robots,
    googleBot: {
      ...seoConfig.robots.googleBot,
      // Ensure "max-image-preview" is one of "none" | "standard" | "large"
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: seoConfig.verification,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-ES": "/es",
      "fr-FR": "/fr",
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
