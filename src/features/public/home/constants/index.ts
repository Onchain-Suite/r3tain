import {
  BarChart3,
  Github,
  Globe,
  Linkedin,
  Mail,
  Shield,
  Twitter,
  Users,
  Zap,
} from "lucide-react";

export const features = [
  {
    icon: Mail,
    title: "Smart Email Campaigns",
    description:
      "AI-powered email sequences that adapt to user behavior and maximize engagement rates.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Real-time insights with predictive analytics to optimize your marketing performance.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Unified customer profiles with blockchain-verified identity and engagement history.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Automation Engine",
    description:
      "Create complex workflows that trigger based on on-chain and off-chain events.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Web3 Security",
    description:
      "Enterprise-grade security with blockchain-based data integrity and privacy.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Multi-Chain Support",
    description:
      "Connect with customers across Ethereum, Polygon, Solana, and other major chains.",
    gradient: "from-teal-500 to-blue-500",
  },
];

export const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "#api" },
    { name: "Integrations", href: "#integrations" },
    { name: "Changelog", href: "#changelog" },
  ],
  Company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
    { name: "Partners", href: "#partners" },
  ],
  Resources: [
    { name: "Documentation", href: "#docs" },
    { name: "Help Center", href: "#help" },
    { name: "Community", href: "#community" },
    { name: "Tutorials", href: "#tutorials" },
    { name: "Webinars", href: "#webinars" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "GDPR", href: "#gdpr" },
    { name: "Security", href: "#security" },
  ],
};

export const socialLinks = [
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "GitHub", icon: Github, href: "#github" },
  { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
  { name: "Email", icon: Mail, href: "#email" },
];
