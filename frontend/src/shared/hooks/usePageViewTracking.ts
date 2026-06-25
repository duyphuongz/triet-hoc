import { useEffect } from "react";
import { getAnonymousClientId } from "../utils/anonymousClientId";
import { httpClient } from "../api/httpClient";

const TRACKING_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const LAST_TRACKED_KEY = "triet_last_page_visit";

export function usePageViewTracking() {
  useEffect(() => {
    const trackVisit = async () => {
      const now = Date.now();
      const lastTracked = localStorage.getItem(LAST_TRACKED_KEY);

      // Check if we already tracked a visit recently
      if (lastTracked && now - parseInt(lastTracked, 10) < TRACKING_INTERVAL_MS) {
        return;
      }

      try {
        const clientId = getAnonymousClientId();
        await httpClient.post("/tracking/visit", {
          anonymousClientId: clientId,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          platform: (navigator as any).userAgentData?.platform || navigator.platform || null,
          pageUrl: window.location.href,
        });

        // Record the time we successfully tracked
        localStorage.setItem(LAST_TRACKED_KEY, now.toString());
      } catch (error) {
        console.error("Failed to track page visit", error);
      }
    };

    // Track on mount
    void trackVisit();
  }, []);
}
