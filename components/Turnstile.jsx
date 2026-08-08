"use client";

import { useEffect, useRef, useState } from "react";

import { TURNSTILE_SITE_KEY } from "@/lib/config";

export { TURNSTILE_SITE_KEY };

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise = null;

/** Load the Turnstile script once, no matter how many widgets are on the page. */
function loadTurnstile() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.turnstile) return Promise.resolve(window.turnstile);

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve(window.turnstile);
      s.onerror = () => reject(new Error("Turnstile failed to load"));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

/**
 * Renders an invisible-until-needed Turnstile widget and hands the resulting
 * token to `onToken`.
 *
 * Tokens are single-use and expire after roughly five minutes, so the widget
 * resets itself on expiry and after each submit. The token proves nothing on
 * its own: it is verified server-side inside the n8n workflow, next to the
 * action it protects.
 */
export default function Turnstile({ onToken, className = "" }) {
  const ref = useRef(null);
  const widgetId = useRef(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);

  onTokenRef.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !ref.current) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !ref.current) return;
        widgetId.current = turnstile.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: "interaction-only",
          callback: (token) => onTokenRef.current?.(token),
          "expired-callback": () => onTokenRef.current?.(""),
          "error-callback": () => {
            onTokenRef.current?.("");
            setFailed(true);
          },
        });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
      }
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <div className={className}>
      <div ref={ref} />
      {failed && (
        <p className="text-sm text-accent">
          The human-verification check could not load. Please disable any content blocker and
          reload, or email us directly.
        </p>
      )}
    </div>
  );
}

/** Reset a widget so the next submit gets a fresh token. */
export function resetTurnstile() {
  if (typeof window !== "undefined" && window.turnstile) {
    try {
      window.turnstile.reset();
    } catch {
      /* nothing rendered */
    }
  }
}
