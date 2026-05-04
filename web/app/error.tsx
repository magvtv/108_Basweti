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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--bg-base)]">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6" aria-hidden="true">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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

        <h1 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)]">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
          An unexpected error occurred while loading this page. You can try
          again, or return to the memorial.
        </p>

        <div className="memorial-divider" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={reset}
            className="px-6 py-3 border border-[var(--accent-umber)] text-[var(--accent-umber)] text-sm tracking-wide hover:bg-[var(--accent-umber)] hover:text-[var(--bg-base)] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm tracking-wide hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
