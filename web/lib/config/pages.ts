/**
 * Single source of truth for what is live vs coming soon.
 *
 * To unlock a page for visitors:
 *   change  live: false  →  live: true
 *
 * That is the only change needed — nav, guards, and the page itself
 * all react to this flag automatically.
 */
export const pages = {
  home: {
    live: true,
    href: "/",
    label: "Home",
  },
  guestbook: {
    live: true,
    href: "/guestbook",
    label: "Guestbook",
  },
  story: {
    live: false,
    href: "/story",
    label: "Her Story",
  },
  family: {
    live: false,
    href: "/family",
    label: "Family",
  },
  service: {
    live: false,
    href: "/service",
    label: "Order of Service",
  },
  memories: {
    live: false,
    href: "/memories",
    label: "Gallery",
  },
  legacy: {
    live: false,
    href: "/legacy",
    label: "Legacy",
  },
} as const;

export type PageKey = keyof typeof pages;
