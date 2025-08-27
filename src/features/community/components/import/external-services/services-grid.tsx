"use client";

import type { ExternalService } from "@/community/types";

import { ServiceCard } from "./service-card";

interface ServicesGridProps {
  services: ExternalService[];
  onServiceConnect: (serviceId: string) => void;
}

export function ServicesGrid({
  services,
  onServiceConnect,
}: ServicesGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          onConnect={onServiceConnect}
          delay={0.5 + index * 0.1}
        />
      ))}
    </section>
  );
}
