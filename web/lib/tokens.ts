export const colors = {
  bgBase: "#F4EFE6",
  bgAlt: "#EAE1D2",
  surface1: "#CFC2AF",
  surface2: "#B7B0A6",
  textPrimary: "#2F2924",
  textSecondary: "#5A5148",
  accentOlive: "#6E7158",
  accentUmber: "#5B4636",
  accentBronze: "#8A6F52",
  borderSubtle: "#D9CCBA",
} as const;

export const fonts = {
  serif: "var(--font-playfair)",
  sans: "var(--font-lato)",
} as const;

export const spacing = {
  sectionY: "py-20 md:py-28",
  containerX: "px-4 md:px-8 max-w-5xl mx-auto",
} as const;

export const motion = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  stagger: {
    visible: { transition: { staggerChildren: 0.12 } },
  },
} as const;
