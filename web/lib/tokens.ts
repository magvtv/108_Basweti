export const colors = {
  bgBase: "#F5F0F5",
  bgAlt: "#E8E0E8",
  surface1: "#D0C4D4",
  surface2: "#B8ADB8",
  textPrimary: "#2A1F2E",
  textSecondary: "#4A3D50",
  accentOlive: "#6B4B7A",
  accentUmber: "#533B5F",
  accentBronze: "#7A5C87",
  borderSubtle: "#D4C7D9",
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
