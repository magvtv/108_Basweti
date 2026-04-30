"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import serviceData from "@/content/order-of-service.json";

export default function PracticalSection() {
  return (
    <section
      id="practical"
      className="section-anchor py-20 md:py-28"
      aria-labelledby="practical-heading"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            Coordination
          </motion.p>
          <motion.h2
            id="practical-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-4xl text-[var(--text-primary)] italic"
          >
            Practical Information
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Livestream */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-[var(--border-subtle)] bg-[var(--bg-alt)] p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6.5 6.5l5 2.5-5 2.5V6.5z" fill="currentColor" opacity="0.7" />
              </svg>
              <h3 className="font-serif italic text-[var(--text-primary)] text-lg">Livestream</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              For family and friends unable to travel, a livestream link will be shared here before the service begins.
            </p>
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)] italic text-center">
              Livestream link will be posted here
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="border border-[var(--border-subtle)] bg-[var(--bg-alt)] p-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <path d="M3 4h12v10H3zM3 4l6 6 6-6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <h3 className="font-serif italic text-[var(--text-primary)] text-lg">Contacts</h3>
            </div>
            <div className="flex flex-col gap-3">
              {serviceData.contacts.map((contact, i) => (
                <div key={i} className="flex flex-col gap-0.5 border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
                  <span className="text-xs text-[var(--accent-bronze)] tracking-wide">{contact.role}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{contact.name}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{contact.phone}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map / Locations */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="border border-[var(--border-subtle)] bg-[var(--bg-alt)] p-6 flex flex-col gap-4 md:col-span-2"
          >
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                <path d="M9 2C6.79 2 5 3.79 5 6c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="9" cy="6" r="1.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              <h3 className="font-serif italic text-[var(--text-primary)] text-lg">Locations</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[var(--accent-bronze)] tracking-wide uppercase">Church</span>
                <p className="text-sm text-[var(--text-primary)]">{serviceData.churchName}</p>
                <p className="text-xs text-[var(--text-secondary)]">{serviceData.date}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[var(--accent-bronze)] tracking-wide uppercase">Homestead</span>
                <p className="text-sm text-[var(--text-primary)]">{serviceData.homesteadName}</p>
                <p className="text-xs text-[var(--text-secondary)]">Burial and family gathering</p>
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="w-full h-48 bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center text-center">
              <div className="flex flex-col items-center gap-2 text-[var(--text-secondary)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M9 3v14M15 7v14" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-xs">Map will be embedded here with directions</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Back to top */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to top
          </a>
        </motion.div>

      </div>
    </section>
  );
}
