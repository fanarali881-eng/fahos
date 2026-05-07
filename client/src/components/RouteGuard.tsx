import { useEffect, useState } from "react";
import { useLocation } from "wouter";

/**
 * RouteGuard - Centralized protection against direct page access.
 * 
 * RULE: Every visitor MUST start from the home page ("/").
 * If a visitor tries to open any other page directly (deep link),
 * they will be silently redirected to the home page.
 * 
 * This works by setting a sessionStorage flag when the home page loads.
 * All other pages check for this flag. If missing = direct access = redirect to home.
 * 
 * This applies to ALL domains (current and future) since it's built into the app.
 */

// Pages that are allowed without the guard (only home page)
const ALLOWED_DIRECT_ACCESS_PATHS = ["/", "/404"];

export function useRouteGuard() {
  const [location, setLocation] = useLocation();
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // If we're on an allowed page, mark that user started properly
    if (ALLOWED_DIRECT_ACCESS_PATHS.includes(location)) {
      sessionStorage.setItem('legitimate_entry', 'true');
      setIsBlocked(false);
      return;
    }

    // For any other page, check if user came through the proper flow
    const hasLegitimateEntry = sessionStorage.getItem('legitimate_entry');
    if (!hasLegitimateEntry) {
      // Direct access detected! Redirect to home silently
      console.log(`[ROUTE-GUARD] Direct access blocked: ${location} - redirecting to home`);
      setIsBlocked(true);
      setLocation("/");
    }
  }, [location, setLocation]);

  return isBlocked;
}

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const isBlocked = useRouteGuard();

  // While redirecting, show nothing (silent redirect)
  if (isBlocked) {
    return null;
  }

  return <>{children}</>;
}
