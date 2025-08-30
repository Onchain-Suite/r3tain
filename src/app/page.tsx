import { type Metadata } from "next";

import { pageMetadata } from "@/lib/seo-config";

import { HomePage } from "@/home/page";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  alternates: {
    canonical: pageMetadata.home.canonical,
  },
  openGraph: {
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    url: pageMetadata.home.canonical,
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "R3tain - Web3 Marketing Automation Platform",
      },
    ],
  },
  twitter: {
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: ["/images/og-home.jpg"],
  },
};

export default function Home() {
  return <HomePage />;
}
