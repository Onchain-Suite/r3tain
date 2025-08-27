"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 250, suffix: "%", label: "Average ROI Increase" },
  { value: 10000, suffix: "+", label: "Campaigns Launched" },
  { value: 99.9, suffix: "%", label: "Platform Uptime" },
  { value: 50, suffix: "+", label: "Blockchain Networks" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = value / 100;
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return Math.min(prev + increment, value);
        });
      }, 20);
      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span>
      {Math.floor(count)}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="from-primary/5 via-background to-primary/5 bg-gradient-to-r py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Trusted by{" "}
            <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
              thousands
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join the growing community of businesses revolutionizing their
            customer engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="bg-card border-border group-hover:border-primary/20 relative rounded-2xl border p-8 transition-all duration-300">
                <div className="text-primary mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground text-sm font-medium sm:text-base">
                  {stat.label}
                </div>

                {/* Hover glow effect */}
                <div className="from-primary/10 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
