"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import ChapterCard from "@/components/ui/ChapterCard";
import chapters from "@/content/biography.json";

export default function BiographySection() {
  return (
    <section
      id="story"
      className="section-anchor py-20 md:py-28"
      aria-labelledby="biography-heading"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            Her Story
          </motion.p>
          <motion.h2
            id="biography-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            A Life Well Lived
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Maisha yake yalielezwa kwa imani, kazi, na upendo.
            <span className="block mt-1 text-[var(--text-secondary)] opacity-70 text-sm italic">
              Her life was told through faith, work, and love.
            </span>
          </motion.p>
        </motion.div>

        {/* Chapter cards */}
        <div className="flex flex-col gap-0">
          {chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              {...chapter}
              language={chapter.language as "en" | "sw" | "guz"}
              imageSide={chapter.imageSide as "left" | "right"}
              isLast={index === chapters.length - 1}
            />
          ))}
        </div>

        {/* Continue to timeline CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#timeline"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors"
          >
            See her life in seasons
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
