"use client";

import { useEffect, useState } from "react";

export default function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false);
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline || dismissed) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--accent-umber)] text-[var(--bg-base)] px-4 py-3 flex items-center justify-center gap-3 text-sm no-print"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2 2L14 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 12.5C8 12.5 3.5 8.5 1.5 6.5C3.21 4.79 5.48 3.75 8 3.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 6.5C13.28 5.28 11.73 4.38 10 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10.83 9.83C9.92 9.3 8.98 9 8 9C7.27 9 6.58 9.17 5.96 9.47"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="13" r="1" fill="currentColor" />
      </svg>

      <span className="text-center leading-relaxed">
        You&apos;re currently offline. Some content may be unavailable until your
        connection is restored.
      </span>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss offline notice"
        className="shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 2L12 12M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
