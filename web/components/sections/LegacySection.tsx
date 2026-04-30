"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/motion";
import legacyData from "@/content/legacy.json";
import { useLanguage } from "@/components/ui/LanguageSwitcher";

export default function LegacySection() {
  const { lang } = useLanguage();

  const archiveStatement =
    legacyData.archiveStatement[lang as keyof typeof legacyData.archiveStatement] ??
    legacyData.archiveStatement.en;

  return (
    <section
      id="legacy"
      className="section-anchor py-20 md:py-28 bg-[var(--bg-alt)]"
      aria-labelledby="legacy-heading"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            What She Leaves Behind
          </motion.p>
          <motion.h2
            id="legacy-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Her Legacy
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
        </motion.div>

        {/* Scripture */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14 px-4 md:px-12"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[var(--accent-bronze)] mx-auto mb-4 opacity-70"
            aria-hidden="true"
          >
            <path d="M4 4h6v16H4zM14 4h6v16h-6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M10 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <blockquote className="font-serif italic text-xl md:text-2xl text-[var(--text-primary)] leading-relaxed mb-3">
            &ldquo;{legacyData.scripture.text}&rdquo;
          </blockquote>
          <cite className="text-sm text-[var(--accent-bronze)] not-italic tracking-wide">
            {legacyData.scripture.reference}
          </cite>
        </motion.div>

        {/* Sayings */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-4 mb-14"
        >
          <motion.h3 variants={fadeUp} className="font-serif italic text-[var(--text-primary)] text-lg text-center mb-2">
            Her Words
          </motion.h3>
          {legacyData.sayings.map((saying, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="border-l-2 border-[var(--accent-bronze)] pl-4 flex flex-col gap-1"
            >
              <p className="font-serif italic text-[var(--text-primary)] text-base leading-relaxed">
                &ldquo;{saying.text}&rdquo;
              </p>
              {saying.translation && (
                <p className="text-xs text-[var(--text-secondary)] italic">{saying.translation}</p>
              )}
              <span className="lang-badge self-start mt-1">{saying.language.toUpperCase()}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <motion.h3 variants={fadeUp} className="font-serif italic text-[var(--text-primary)] text-lg text-center mb-6">
            Values She Leaves Behind
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {legacyData.values.map((value, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 border border-[var(--border-subtle)] bg-[var(--bg-base)]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-[var(--accent-bronze)] flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Archive statement */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-[var(--border-subtle)] bg-[var(--bg-base)] p-6 md:p-8 text-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[var(--accent-bronze)] mx-auto mb-4 opacity-70"
            aria-hidden="true"
          >
            <path d="M2 5h16v2H2zM4 7v11h12V7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 11h4M8 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
            {archiveStatement}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
