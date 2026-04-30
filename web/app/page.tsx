import Link from "next/link";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/ui/Footer";

export default function MemorialPage() {
  return (
    <main>
      <HeroSection />
      <section className="py-16 md:py-20 bg-[var(--bg-alt)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif italic text-2xl md:text-4xl text-[var(--text-primary)]">
              Explore Her Story in Chapters
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
              This memorial archive is now organized into focused pages for easier reading by elders,
              family, and diaspora visitors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/service" className="border border-[var(--accent-umber)] text-[var(--accent-umber)] px-5 py-3 text-center hover:bg-[var(--accent-umber)] hover:text-[var(--bg-base)] transition-colors">
              Order of Service
            </Link>
            <Link href="/memories" className="border border-[var(--border-subtle)] text-[var(--text-secondary)] px-5 py-3 text-center hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors">
              Gallery
            </Link>
            <Link href="/guestbook" className="border border-[var(--border-subtle)] text-[var(--text-secondary)] px-5 py-3 text-center hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors">
              Leave a Tribute
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Link href="/story" className="border border-[var(--border-subtle)] text-[var(--text-secondary)] px-5 py-4 text-center hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors">
              Life Story & Timeline
            </Link>
            <Link href="/family" className="border border-[var(--border-subtle)] text-[var(--text-secondary)] px-5 py-4 text-center hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors">
              Family & Testimonies
            </Link>
            <Link href="/legacy" className="border border-[var(--border-subtle)] text-[var(--text-secondary)] px-5 py-4 text-center hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors">
              Legacy & Remembrance
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
