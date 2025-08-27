"use client";

import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export function JsonLd({ data, id = "json-ld" }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schemas for common use cases
export const schemas = {
  product: (product: {
    name: string;
    description: string;
    image: string;
    brand: string;
    offers: {
      price: string;
      currency: string;
      availability: string;
    };
    aggregateRating?: {
      ratingValue: number;
      reviewCount: number;
    };
  }) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.offers.price,
      priceCurrency: product.offers.currency,
      availability: product.offers.availability,
    },
    ...(product.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
      },
    }),
  }),

  service: (service: {
    name: string;
    description: string;
    provider: string;
    areaServed: string;
    serviceType: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider,
    },
    areaServed: service.areaServed,
    serviceType: service.serviceType,
  }),

  howTo: (guide: {
    name: string;
    description: string;
    image: string;
    totalTime: string;
    steps: {
      name: string;
      text: string;
      image?: string;
    }[];
  }) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.name,
    description: guide.description,
    image: guide.image,
    totalTime: guide.totalTime,
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }),
};
