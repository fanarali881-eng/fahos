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

function setVerified(): void {
  localStorage.setItem(
    VERIFIED_KEY,
    JSON.stringify({ timestamp: Date.now() })
  );
}

interface TurnstileGateProps {
  children: React.ReactNode;
}

export default function TurnstileGate({ children }: TurnstileGateProps) {
  const [verified, setVerifiedState] = useState(() => isAlreadyVerified());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const renderedRef = useRef(false);

  const handleSuccess = useCallback((token: string) => {
    if (token) {
      setVerified();
      setVerifiedState(true);
      setLoading(false);
    }
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (verified || renderedRef.current) return;

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || renderedRef.current) return;
      
      renderedRef.current = true;
      setLoading(false);
      
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: handleSuccess,
          "error-callback": handleError,
          "expired-callback": handleError,
          theme: "light",
          size: "normal",
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

      // Timeout after 10 seconds - let user through if turnstile doesn't load
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!verified && !renderedRef.current) {
          setVerified();
          setVerifiedState(true);
        }
      }, 10000);

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

  // If already verified, show children directly
  if (verified) {
    return <>{children}</>;
  }

  // Show Turnstile challenge
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 50%, #f0f9f0 100%)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h2
          className="text-xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          التحقق الأمني
        </h2>
        <p
          className="text-gray-500 text-sm mb-6"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          يرجى الانتظار بينما نتحقق من أنك لست روبوت
        </p>

        {loading && (
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        )}

        <div ref={containerRef} className="flex justify-center mb-4"></div>

        {error && (
          <div className="mt-4">
            <p
              className="text-red-500 text-sm mb-3"
              style={{ fontFamily: "Tajawal, sans-serif" }}
            >
              حدث خطأ في التحقق. يرجى المحاولة مرة أخرى.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
              style={{ fontFamily: "Tajawal, sans-serif" }}
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
