"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const tribute = {
  en: "A woman of faith, homestead, and enduring love. Beloved mother, grandmother, great-grandmother, and keeper of family memory.",
  sw: "Mwanamke wa imani, nyumba, na upendo wa milele. Mama mpendwa, bibi, na kiongozi wa kumbukumbu ya familia.",
  guz: "Omonto w'obokori, enyomba, na rato ritigarukire. Omoito omwamu, omosubati omwamu, na ontoborereri wa engoro ya enyomba.",
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-anchor"
      aria-label="Memorial hero"
    >
      {/* Background wash */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(to bottom, var(--bg-alt) 0%, var(--bg-base) 70%)" }}
        aria-hidden="true"
      />

      {/* Subtle parchment grain overlay */}
      <div className="absolute inset-0 z-0 img-grain opacity-40" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col items-center text-center gap-8">

        {/* Language switcher */}
        <div className="absolute top-20 right-4 md:right-8">
          <LanguageSwitcher />
        </div>

        {/* Portrait */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="img-memorial rounded-full overflow-hidden w-40 h-40 md:w-56 md:h-56 border-2 border-border-subtle shadow-lg"
        >
          <Image
            src="/images/portrait-1.jpg"
            alt="Portrait of Peris Basweti"
            width={224}
            height={224}
            priority
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Name */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-3"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-text-secondary"
          >
            In Loving Memory
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-4xl md:text-6xl text-text-primary italic leading-tight"
          >
            Peris Basweti
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm tracking-widest text-accent-bronze font-light"
          >
            1931 &mdash; 2026
          </motion.p>

          <div className="memorial-divider" aria-hidden="true" />

          {/* Trilingual tribute */}
          <TributeText />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-2"
        >
          <Link
            href="/service"
            className="px-5 py-2.5 text-sm tracking-wide border border-accent-umber text-accent-umber hover:bg-accent-umber hover:text-bg-base transition-colors duration-200"
          >
            Order of Service
          </Link>
          <Link
            href="/memories"
            className="px-5 py-2.5 text-sm tracking-wide border border-border-subtle text-text-secondary hover:border-accent-bronze hover:text-text-primary transition-colors duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/guestbook"
            className="px-5 py-2.5 text-sm tracking-wide border border-border-subtle text-text-secondary hover:border-accent-bronze hover:text-text-primary transition-colors duration-200"
          >
            Leave a Tribute
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TributeText() {
  return (
    <div className="max-w-xl">
      <p className="font-serif text-base md:text-lg text-text-primary italic leading-relaxed">
        {tribute.en}
      </p>
      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
        {tribute.sw}
      </p>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
        {tribute.guz}
      </p>
    </div>
  );
}
