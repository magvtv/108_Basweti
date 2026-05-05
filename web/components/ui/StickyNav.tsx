"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages } from "@/lib/config/pages";

const navItems = [
  pages.story,
  pages.family,
  pages.service,
  pages.memories,
  pages.guestbook,
  pages.legacy,
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled
          ? "bg-bg-base/95 backdrop-blur-sm border-b border-border-subtle shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Memorial site navigation"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-text-primary text-lg italic opacity-80 hover:opacity-100 transition-opacity"
        >
          Peris Basweti
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.live ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`inline-block pb-1 text-sm tracking-wide border-b-2 border-transparent transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-accent-umber border-accent-bronze"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={item.href}>
                <span
                  className="text-sm tracking-wide text-text-secondary opacity-30 cursor-default select-none"
                  aria-label={`${item.label} — coming soon`}
                >
                  {item.label}
                </span>
              </li>
            )
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
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
        <div className="md:hidden bg-bg-base border-t border-border-subtle px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-3">
            {navItems.map((item) =>
              item.live ? (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center py-2 text-base text-text-secondary hover:text-text-primary border-b border-border-subtle last:border-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.href}>
                  <span className="block py-2 text-base text-text-secondary opacity-30 border-b border-border-subtle last:border-0 select-none">
                    {item.label}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
