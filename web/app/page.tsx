import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

const chapterLinks = [
  pages.service,
  pages.memories,
  pages.story,
  pages.family,
  pages.legacy,
];

export default function MemorialPage() {
  return (
    <main>
      <HeroSection />

      <section className="py-16 md:py-20 bg-bg-alt">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          {/* Primary CTA — always live */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-4">
              Open Now
            </p>
            <Link
              href="/guestbook"
              className="inline-block px-8 py-3 text-sm tracking-wide border border-accent-umber text-accent-umber hover:bg-accent-umber hover:text-bg-base transition-colors duration-200"
            >
              Leave a Tribute in the Guestbook
            </Link>
          </div>

          {/* Chapter grid */}
          <div className="text-center mb-8">
            <h2 className="font-serif italic text-2xl md:text-3xl text-text-primary">
              More chapters coming soon
            </h2>
            <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              We are building the full memorial archive. Each section will unlock as it is ready.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {chapterLinks.map((page) =>
              page.live ? (
                <Link
                  key={page.href}
                  href={page.href}
                  className="border border-border-subtle text-text-secondary px-5 py-4 text-center text-sm hover:border-accent-bronze hover:text-text-primary transition-colors"
                >
                  {page.label}
                </Link>
              ) : (
                <div
                  key={page.href}
                  className="border border-border-subtle px-5 py-4 text-center text-sm opacity-40 select-none"
                  aria-label={`${page.label} — coming soon`}
                >
                  <span className="block text-text-secondary">{page.label}</span>
                  <span className="block text-[10px] tracking-widest uppercase text-text-secondary mt-0.5">
                    Soon
                  </span>
                </div>
              )
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
