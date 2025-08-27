"use client";

import { motion } from "framer-motion";

import { features } from "../constants";

export function FeaturesSection() {
  return (
    <section className="from-background to-muted/20 bg-gradient-to-b py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            Everything you need to{" "}
            <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
              scale
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg"
          >
            Powerful features designed for modern businesses that want to
            leverage the future of customer engagement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="bg-card border-border hover:border-primary/20 relative h-full rounded-2xl border p-8 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-full w-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="group-hover:text-primary mb-3 text-xl font-semibold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="from-primary/5 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
