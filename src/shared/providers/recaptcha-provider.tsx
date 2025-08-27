"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ReCaptchaContextType {
  executeReCaptcha: (action: string) => Promise<string | null>;
  isLoaded: boolean;
}

const ReCaptchaContext = createContext<ReCaptchaContextType | null>(null);

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [grecaptcha, setGrecaptcha] = useState<
    Window["grecaptcha"]["enterprise"] | null
  >(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      return;
    }

    // Load reCAPTCHA Enterprise script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha?.enterprise) {
        window.grecaptcha.enterprise.ready(() => {
          setGrecaptcha(window.grecaptcha.enterprise);
          setIsLoaded(true);
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [siteKey]);

  const executeReCaptcha = async (action: string): Promise<string | null> => {
    if (!grecaptcha || !siteKey) {
      console.warn("reCAPTCHA Enterprise not loaded or site key missing");
      return null;
    }

    try {
      const token = await grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      console.error("reCAPTCHA Enterprise execution failed:", error);
      return null;
    }
  };

  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <ReCaptchaContext.Provider value={{ executeReCaptcha, isLoaded }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}

export function useReCaptcha() {
  const context = useContext(ReCaptchaContext);
  if (!context) {
    throw new Error("useReCaptcha must be used within a ReCaptchaProvider");
  }
  return context;
}

// Extend window type for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}
