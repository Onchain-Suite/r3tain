"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeModeToggle } from "@/components/common";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/config/routes";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
  { name: "Company", href: "#company" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 border-border/50 border-b shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex cursor-pointer items-center space-x-2"
          >
            <div className="relative">
              <motion.div
                className="from-primary to-primary/70 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <motion.div
                className="bg-primary/20 absolute inset-0 rounded-lg blur-md"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
              R3tain
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-foreground/80 hover:text-primary group relative font-medium transition-colors"
              >
                {item.name}
                <motion.div
                  className="bg-primary absolute right-0 -bottom-1 left-0 h-0.5 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden items-center space-x-4 lg:flex"
            >
              <Button variant="ghost" className="font-medium" asChild>
                <Link href={authRoutes.login}>Sign In</Link>
              </Button>
              <Button asChild className="group font-medium">
                <Link href={authRoutes.register}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <ThemeModeToggle />

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-muted rounded-lg p-2 transition-colors lg:hidden"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-background/95 border-border/50 border-t backdrop-blur-xl lg:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 hover:text-primary hover:bg-primary/5 block rounded-lg px-4 py-3 font-medium transition-all"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="border-border/50 mt-6 flex flex-col space-y-3 border-t pt-6"
              >
                <Button
                  asChild
                  variant="ghost"
                  className="justify-center font-medium"
                >
                  <Link href={authRoutes.login}>Sign In</Link>
                </Button>
                <Button asChild className="group justify-center font-medium">
                  <Link href={authRoutes.register}>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
