export default function Footer() {
  return (
    <footer className="py-10 border-t border-border-subtle bg-bg-base no-print">
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center gap-3 text-center">
        <p className="font-serif italic text-text-primary text-lg">Peris Basweti</p>
        <p className="text-xs tracking-widest text-accent-bronze">1931 &mdash; 2026</p>
        <div className="memorial-divider" aria-hidden="true" />
        <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
          This memorial site is maintained by the Magutu family as a living archive of her life and legacy.
          It will remain accessible for family remembrance and future generations.
        </p>
        <p className="text-xs text-text-secondary opacity-50 mt-2">
          &copy; {new Date().getFullYear()} Magutu Family
        </p>
      </div>
    </footer>
  );
}
