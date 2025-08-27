"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authRoutes } from "@/config/routes";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="from-primary/10 via-background to-primary/5 absolute inset-0 bg-gradient-to-br" />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, var(--color-primary) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-primary/10 border-primary/20 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span>Ready to get started?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Start your{" "}
            <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
              Web3 marketing
            </span>
            <br />
            journey today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg"
          >
            Join thousands of businesses already using R3tain to revolutionize
            their customer engagement and drive unprecedented growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group px-8 py-6 text-lg font-semibold"
            >
              <Link href={authRoutes.register}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-muted-foreground mt-6 text-sm"
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </div>
      </div>
    </section>
  );
}
