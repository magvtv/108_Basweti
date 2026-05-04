"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-bg-base">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="var(--accent-bronze)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M24 14v13"
              stroke="var(--accent-bronze)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="24" cy="33" r="1.5" fill="var(--accent-bronze)" />
          </svg>
        </div>

        <h1 className="font-serif text-2xl md:text-3xl text-text-primary">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-text-secondary text-sm md:text-base leading-relaxed">
          An unexpected error occurred while loading this page. You can try
          again, or return to the memorial.
        </p>

        <div className="memorial-divider" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={reset}
            className="px-6 py-3 border border-accent-umber text-accent-umber text-sm tracking-wide hover:bg-accent-umber hover:text-bg-base transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border-subtle text-text-secondary text-sm tracking-wide hover:border-accent-bronze hover:text-text-primary transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
