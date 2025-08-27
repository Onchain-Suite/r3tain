"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

import { BreadcrumbSchema } from "./structured-data";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", url: "https://r3tain.com" }, ...items];

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav
        aria-label="Breadcrumb"
        className={`text-muted-foreground flex items-center space-x-2 text-sm ${className}`}
      >
        <Link
          href="/"
          className="hover:text-primary flex items-center transition-colors"
          aria-label="Go to homepage"
        >
          <Home className="h-4 w-4" />
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
