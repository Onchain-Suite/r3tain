"use client";

import { useEffect } from "react";

// Define PerformanceLayoutShift interface if not available in TypeScript DOM types
interface PerformanceLayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            const lcp = entry.startTime;
            console.log("LCP:", lcp);

            // Send to analytics
            if (window.gtag) {
              window.gtag("event", "web_vitals", {
                name: "LCP",
                value: Math.round(lcp),
                event_category: "Performance",
              });
            }
          }
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "first-input") {
            const fid =
              (entry as PerformanceEventTiming).processingStart -
              entry.startTime;
            console.log("FID:", fid);

            if (window.gtag) {
              window.gtag("event", "web_vitals", {
                name: "FID",
                value: Math.round(fid),
                event_category: "Performance",
              });
            }
          }
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === "layout-shift" &&
            !(entry as PerformanceLayoutShift).hadRecentInput
          ) {
            clsValue += (entry as PerformanceLayoutShift).value;
          }
        }
      });

      clsObserver.observe({ type: "layout-shift", buffered: true });

      // Send CLS on page unload
      const sendCLS = () => {
        console.log("CLS:", clsValue);
        if (window.gtag) {
          window.gtag("event", "web_vitals", {
            name: "CLS",
            value: Math.round(clsValue * 1000),
            event_category: "Performance",
          });
        }
      };

      window.addEventListener("beforeunload", sendCLS);

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        window.removeEventListener("beforeunload", sendCLS);
      };
    }
  }, []);

  return null;
}
