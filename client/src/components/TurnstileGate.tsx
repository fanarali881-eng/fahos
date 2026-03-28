import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = "0x4AAAAAACxQZyFr8fJ02f5b";
const VERIFIED_KEY = "turnstile_verified";
const TURNSTILE_TOKEN_KEY = "turnstile_token";
const VERIFIED_EXPIRY = 30 * 60 * 1000; // 30 minutes

function isAlreadyVerified(): boolean {
  try {
    const stored = localStorage.getItem(VERIFIED_KEY);
    if (!stored) return false;
    const { timestamp } = JSON.parse(stored);
    if (Date.now() - timestamp < VERIFIED_EXPIRY) {
      return true;
    }
    localStorage.removeItem(VERIFIED_KEY);
    return false;
  } catch {
    return false;
  }
}

function setVerified(token?: string): void {
  localStorage.setItem(
    VERIFIED_KEY,
    JSON.stringify({ timestamp: Date.now() })
  );
  if (token) {
    localStorage.setItem(TURNSTILE_TOKEN_KEY, token);
  }
}

interface TurnstileGateProps {
  children: React.ReactNode;
}

export default function TurnstileGate({ children }: TurnstileGateProps) {
  const [verified, setVerifiedState] = useState(() => isAlreadyVerified());
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  const handleSuccess = useCallback((token: string) => {
    if (token) {
      setVerified(token);
      setVerifiedState(true);
    }
  }, []);

  const handleError = useCallback(() => {
    // If turnstile fails, let the user through (don't block real visitors)
    setVerified();
    setVerifiedState(true);
  }, []);

  useEffect(() => {
    if (verified || renderedRef.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || renderedRef.current) return;
      
      renderedRef.current = true;
      
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: handleSuccess,
          "error-callback": handleError,
          "expired-callback": handleError,
          theme: "light",
          size: "invisible",
          appearance: "interaction-only",
        });
      } catch (e) {
        console.error("Turnstile render error:", e);
        // If turnstile fails to render, let the user through
        setVerified();
        setVerifiedState(true);
      }
    };

    // Check if turnstile is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // Wait for turnstile to load
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);

      // Timeout after 5 seconds - let user through if turnstile doesn't load
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!verified && !renderedRef.current) {
          setVerified();
          setVerifiedState(true);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [verified, handleSuccess, handleError]);

  // Cleanup widget on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, []);

  // Always show children immediately - Turnstile runs invisibly in background
  return (
    <>
      {children}
      {/* Hidden Turnstile container - runs in background */}
      {!verified && (
        <div
          ref={containerRef}
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}
