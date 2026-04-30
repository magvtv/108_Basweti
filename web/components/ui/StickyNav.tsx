"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Her Story", href: "#story" },
  { label: "Family", href: "#family" },
  { label: "Service", href: "#service" },
  { label: "Memories", href: "#memories" },
  { label: "Guestbook", href: "#guestbook" },
  { label: "Legacy", href: "#legacy" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled
          ? "bg-[var(--bg-base)]/95 backdrop-blur-sm border-b border-[var(--border-subtle)] shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Memorial site navigation"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        {/* Logo / name */}
        <a
          href="#home"
          className="font-serif text-[var(--text-primary)] text-lg italic opacity-80 hover:opacity-100 transition-opacity"
        >
          Peris Basweti
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-sm tracking-wide transition-colors duration-200 ${
                  active === item.href
                    ? "text-[var(--accent-umber)] border-b border-[var(--accent-bronze)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg-base)] border-t border-[var(--border-subtle)] px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-b border-[var(--border-subtle)] last:border-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
