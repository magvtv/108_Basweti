"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import TimelineRail from "@/components/ui/TimelineRail";
import timelineRaw from "@/content/timeline.json";

type TimelineLanguage = "en" | "sw" | "guz";
const timelineData = timelineRaw as (Omit<(typeof timelineRaw)[0], "language"> & { language: TimelineLanguage })[];

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="section-anchor py-20 md:py-28 bg-[var(--bg-alt)]"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-14 md:mb-18"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            Life in Seasons
          </motion.p>
          <motion.h2
            id="timeline-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Her Journey Through Time
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Each season brought new depth to who she was — as a woman, a mother, a keeper of faith, and a guardian of her people.
          </motion.p>
        </motion.div>

        {/* Timeline component */}
        <TimelineRail entries={timelineData} />

      </div>
    </section>
  );
}
