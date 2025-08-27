"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { footerLinks, socialLinks } from "../constants";

export function Footer() {
  return (
    <footer className="from-background to-muted/20 border-border/50 relative border-t bg-gradient-to-b">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, var(--color-primary) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, var(--color-primary) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-border/50 border-b">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-center"
            >
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                Stay ahead of the{" "}
                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                  curve
                </span>
              </h3>
              <p className="text-muted-foreground mb-8">
                Get the latest updates on Web3 marketing trends, product
                releases, and exclusive insights.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border-border bg-background focus:ring-primary/20 focus:border-primary flex-1 rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none"
                />
                <Button className="px-6 py-3 font-medium">Subscribe</Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="mb-6 flex items-center space-x-2">
                <div className="relative">
                  <motion.div
                    className="from-primary to-primary/70 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="bg-primary/20 absolute inset-0 rounded-xl blur-md"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                </div>
                <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                  R3tain
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                The first blockchain-native marketing platform that
                revolutionizes customer engagement through Web3 technology and
                AI-powered automation.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-muted hover:bg-primary group flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:text-white"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(
              ([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-foreground mb-4 font-semibold">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <a
                          href={link.href}
                          className="text-muted-foreground hover:text-primary block py-1 transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border/50 border-t">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-sm"
              >
                © {new Date().getFullYear()} R3tain. All rights reserved. Built
                with ❤️ for the Web3 future.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
