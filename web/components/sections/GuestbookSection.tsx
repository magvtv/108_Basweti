"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function GuestbookSection() {
  return (
    <section
      id="guestbook"
      className="section-anchor py-20 md:py-28"
      aria-labelledby="guestbook-heading"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-3"
          >
            Diaspora & Family
          </motion.p>
          <motion.h2
            id="guestbook-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Leave a Tribute
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm mx-auto">
            Whether near or far, your words are a gift to this family. All messages are reviewed by the family before appearing here.
          </motion.p>
        </motion.div>

        {/* Moderation note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-[var(--border-subtle)] bg-[var(--bg-alt)] p-4 mb-8 text-center"
        >
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            We invite written messages, condolences, memories, and prayers in any language.
            Messages are reviewed by the family before being published. Please write with the
            respect and warmth this family deserves.
          </p>
        </motion.div>

        {/* Guestbook form — Phase 2 placeholder */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-[var(--border-subtle)] bg-[var(--bg-base)] p-6 md:p-8"
        >
          <div className="flex flex-col gap-5">

            {/* Tribute type */}
            <div>
              <label className="block text-xs tracking-wide uppercase text-[var(--text-secondary)] mb-2">
                Type of message
              </label>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Message type">
                {["Condolence", "Memory", "Prayer", "Testimony"].map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1.5 text-xs border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-bronze)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="guestbook-name" className="block text-xs tracking-wide uppercase text-[var(--text-secondary)] mb-1.5">
                  Your name
                </label>
                <input
                  id="guestbook-name"
                  type="text"
                  className="w-full border border-[var(--border-subtle)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-bronze)]"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="guestbook-relationship" className="block text-xs tracking-wide uppercase text-[var(--text-secondary)] mb-1.5">
                  Relationship
                </label>
                <select
                  id="guestbook-relationship"
                  className="w-full border border-[var(--border-subtle)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-bronze)]"
                  defaultValue=""
                >
                  <option value="" disabled>Select relationship</option>
                  <option value="child">Child</option>
                  <option value="grandchild">Grandchild</option>
                  <option value="great-grandchild">Great-grandchild</option>
                  <option value="relative">Relative</option>
                  <option value="friend">Friend</option>
                  <option value="church">Church</option>
                  <option value="community">Community</option>
                </select>
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="guestbook-country" className="block text-xs tracking-wide uppercase text-[var(--text-secondary)] mb-1.5">
                Country
              </label>
              <input
                id="guestbook-country"
                type="text"
                className="w-full border border-[var(--border-subtle)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-bronze)]"
                placeholder="e.g. Kenya, United Kingdom, USA"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="guestbook-message" className="block text-xs tracking-wide uppercase text-[var(--text-secondary)] mb-1.5">
                Your message
              </label>
              <textarea
                id="guestbook-message"
                rows={5}
                className="w-full border border-[var(--border-subtle)] bg-[var(--bg-alt)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-bronze)] resize-none"
                placeholder="Write your condolence, memory, prayer, or testimony here. You may write in English, Kiswahili, or Ekegusii."
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2">
              <input
                id="guestbook-consent"
                type="checkbox"
                className="mt-0.5 accent-[var(--accent-umber)]"
              />
              <label htmlFor="guestbook-consent" className="text-xs text-[var(--text-secondary)] leading-relaxed">
                I consent to this message being reviewed by the family and published on this memorial page.
              </label>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full py-3 text-sm tracking-wide border border-[var(--accent-umber)] text-[var(--accent-umber)] hover:bg-[var(--accent-umber)] hover:text-[var(--bg-base)] transition-colors duration-200"
            >
              Submit Tribute
            </button>

            <p className="text-xs text-center text-[var(--text-secondary)] opacity-70">
              Guestbook submissions will be active once moderation is configured. All entries are reviewed before publishing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
