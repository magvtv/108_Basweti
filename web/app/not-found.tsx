import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Page Not Found — Peris Basweti Memorial",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-bg-base">
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <p
            className="font-serif italic text-accent-bronze leading-none"
            style={{ fontSize: "6rem" }}
            aria-hidden="true"
          >
            404
          </p>

          <h1 className="mt-4 font-serif text-2xl md:text-3xl text-text-primary">
            Page Not Found
          </h1>

          <p className="mt-3 text-text-secondary text-sm md:text-base leading-relaxed">
            This page doesn&apos;t exist or may have been moved. The memory you are
            looking for lives on in the pages below.
          </p>

          <div className="memorial-divider" aria-hidden="true" />

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
            role="group"
            aria-label="Recovery links"
          >
            <Link
              href="/"
              className="px-6 py-3 border border-accent-umber text-accent-umber text-sm tracking-wide hover:bg-accent-umber hover:text-bg-base transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/guestbook"
              className="px-6 py-3 border border-border-subtle text-text-secondary text-sm tracking-wide hover:border-accent-bronze hover:text-text-primary transition-colors"
            >
              Leave a Tribute
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
