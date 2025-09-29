export const seoConfig = {
  defaultTitle: "R3tain - Web3 Marketing Automation Platform",
  titleTemplate: "%s | R3tain",
  defaultDescription:
    "The first blockchain-native marketing platform that combines AI-powered automation, advanced analytics, and Web3 integration to maximize customer lifetime value.",
  siteUrl: "https://r3tain.com",
  siteName: "R3tain",
  images: [
    {
      url: "/images/og-default.jpg",
      width: 1200,
      height: 630,
      alt: "R3tain - Web3 Marketing Automation Platform",
    },
  ],
  locale: "en_US",
  type: "website",
  twitter: {
    handle: "@r3tain",
    site: "@r3tain",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://r3tain.com",
    siteName: "R3tain",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "R3tain - Web3 Marketing Automation Platform",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    bing: "your-bing-verification-code",
  },
};

export const pageMetadata = {
  home: {
    title: "Web3 Marketing Automation Platform",
    description:
      "Revolutionize your customer engagement with R3tain's blockchain-native marketing platform. AI-powered automation, advanced analytics, and Web3 integration for maximum ROI.",
    keywords: [
      "web3 marketing",
      "blockchain marketing",
      "marketing automation",
      "customer retention",
      "AI marketing",
      "crypto marketing",
    ],
    canonical: "/",
  },
  features: {
    title: "Features - Advanced Marketing Tools",
    description:
      "Discover R3tain's powerful features: smart email campaigns, blockchain analytics, multi-chain support, and enterprise security for modern marketing teams.",
    keywords: [
      "marketing features",
      "email automation",
      "blockchain analytics",
      "multi-chain marketing",
      "web3 tools",
    ],
    canonical: "/features",
  },
  pricing: {
    title: "Pricing - Flexible Plans for Every Business",
    description:
      "Choose the perfect R3tain plan for your business. From startups to enterprises, find transparent pricing for our Web3 marketing automation platform.",
    keywords: [
      "marketing pricing",
      "web3 pricing",
      "marketing automation cost",
      "blockchain marketing plans",
    ],
    canonical: "/pricing",
  },
  auth: {
    signin: {
      title: "Sign In - Access Your Marketing Dashboard",
      description:
        "Sign in to your R3tain account to access powerful Web3 marketing tools, campaign analytics, and customer engagement features.",
      keywords: ["sign in", "login", "marketing dashboard", "web3 login"],
      canonical: "/auth/signin",
    },
    signup: {
      title: "Sign Up - Start Your Web3 Marketing Journey",
      description:
        "Create your R3tain account and start revolutionizing your marketing with blockchain-native tools. Free trial available.",
      keywords: [
        "sign up",
        "register",
        "create account",
        "free trial",
        "web3 marketing",
      ],
      canonical: "/auth/signup",
    },
  },
  blog: {
    title: "Blog - Web3 Marketing Insights & Strategies",
    description:
      "Stay ahead with the latest Web3 marketing trends, blockchain strategies, and customer retention insights from R3tain's expert team.",
    keywords: [
      "web3 blog",
      "marketing insights",
      "blockchain strategies",
      "customer retention",
      "marketing trends",
    ],
    canonical: "/blog",
  },
  docs: {
    title: "Documentation - R3tain Developer Resources",
    description:
      "Complete documentation for R3tain's API, SDKs, and integration guides. Build powerful Web3 marketing solutions with our developer tools.",
    keywords: [
      "api documentation",
      "developer docs",
      "web3 api",
      "marketing api",
      "integration guide",
    ],
    canonical: "/docs",
  },
};
