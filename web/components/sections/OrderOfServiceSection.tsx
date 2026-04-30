"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import serviceData from "@/content/order-of-service.json";

type ViewMode = "ceremony" | "family";

export default function OrderOfServiceSection() {
  const [view, setView] = useState<ViewMode>("ceremony");

  return (
    <section
      id="service"
      className="section-anchor py-20 md:py-28 bg-[var(--bg-alt)]"
      aria-labelledby="service-heading"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Section heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10 no-print"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            Burial Day
          </motion.p>
          <motion.h2
            id="service-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Order of Service
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />

          {/* View toggle */}
          <motion.div
            variants={fadeUp}
            className="inline-flex border border-[var(--border-subtle)] mt-4"
            role="group"
            aria-label="Select view"
          >
            {(["ceremony", "family"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                  view === v
                    ? "bg-[var(--accent-umber)] text-[var(--bg-base)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {v === "ceremony" ? "Ceremony View" : "Family Detail View"}
              </button>
            ))}
          </motion.div>

          {/* Print button */}
          <motion.div variants={fadeUp} className="mt-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)] px-3 py-1.5"
              aria-label="Print order of service"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 4V1h8v3M1 4h12v6H3v3H1V4zm2 3h8" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
              Print
            </button>
          </motion.div>
        </motion.div>

        {/* Date and location header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-[var(--border-subtle)] bg-[var(--bg-base)] p-5 mb-8 text-center print-full-width"
        >
          <h3 className="font-serif italic text-xl text-[var(--text-primary)] mb-3">
            In Celebration of the Life of Peris Basweti
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-8 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
                <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              {serviceData.date}
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.5 3.5 6.5 3.5 6.5s3.5-4 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="6" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              {serviceData.churchName}
            </span>
            <span className="flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <path d="M1 11V4l5-3 5 3v7" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                <path d="M4 11V7h4v4" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
              {serviceData.homesteadName}
            </span>
          </div>
          {serviceData.dresscode && (
            <p className="mt-3 text-xs text-[var(--text-secondary)] italic">{serviceData.dresscode}</p>
          )}
        </motion.div>

        {/* Schedule */}
        {view === "ceremony" ? (
          <CeremonyView />
        ) : (
          <FamilyDetailView />
        )}

        {/* Hymns */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 border-t border-[var(--border-subtle)] pt-8"
        >
          <h4 className="font-serif italic text-[var(--text-primary)] text-lg mb-4">Hymns</h4>
          <div className="flex flex-col gap-2">
            {serviceData.hymns.map((hymn, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-[var(--border-subtle)] pb-2 last:border-0">
                <span className="text-[var(--text-primary)]">{hymn.title}</span>
                <span className="lang-badge">{hymn.language.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function CeremonyView() {
  return (
    <motion.div
      key="ceremony"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1"
      role="list"
      aria-label="Ceremony schedule"
    >
      {serviceData.ceremonyView.map((item, i) => (
        <div
          key={i}
          role="listitem"
          className="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-[var(--border-subtle)] last:border-0 items-start"
        >
          <span className="text-xs tracking-wide text-[var(--accent-bronze)] font-medium pt-0.5">{item.time}</span>
          <span className="text-sm text-[var(--text-primary)]">{item.item}</span>
        </div>
      ))}
    </motion.div>
  );
}

function FamilyDetailView() {
  return (
    <motion.div
      key="family"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3"
      role="list"
      aria-label="Family coordination details"
    >
      {serviceData.familyDetailView.map((item, i) => (
        <div
          key={i}
          role="listitem"
          className="border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-xs tracking-wide text-[var(--accent-bronze)] font-medium">{item.time}</span>
              <h4 className="font-serif italic text-[var(--text-primary)] text-base mt-0.5">{item.item}</h4>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.detail}</p>
        </div>
      ))}
    </motion.div>
  );
}
