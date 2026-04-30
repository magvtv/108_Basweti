"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import testimoniesData from "@/content/testimonies.json";

interface Testimony {
  id: string;
  name: string;
  relationship: string;
  language: "en" | "sw" | "guz";
  message: string;
  originalLanguage?: string | null;
  originalMessage?: string | null;
  photoUrl?: string | null;
}

const langFull: Record<string, string> = {
  en: "English",
  sw: "Kiswahili",
  guz: "Ekegusii",
};

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  const [showOriginal, setShowOriginal] = useState(false);

  const displayMessage = showOriginal && testimony.originalMessage ? testimony.originalMessage : testimony.message;
  const displayLang = showOriginal && testimony.originalLanguage ? testimony.originalLanguage : testimony.language;

  return (
    <motion.div
      variants={fadeUp}
      className="border border-[var(--border-subtle)] bg-[var(--bg-base)] p-5 flex flex-col gap-3"
    >
      {/* Speaker info */}
      <div className="flex items-center gap-3">
        <div className="img-memorial w-10 h-10 rounded-full overflow-hidden bg-[var(--surface-1)] flex-shrink-0 border border-[var(--border-subtle)]">
          {testimony.photoUrl ? (
            <Image
              src={testimony.photoUrl}
              alt={testimony.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--surface-2)]" aria-hidden="true">
                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1" />
                <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">{testimony.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">{testimony.relationship}</p>
        </div>
        <span className="ml-auto lang-badge">{langFull[displayLang] ?? displayLang}</span>
      </div>

      {/* Message */}
      <blockquote className="font-serif italic text-[var(--text-primary)] text-[0.95rem] leading-relaxed border-l-2 border-[var(--accent-bronze)] pl-3">
        {displayMessage}
      </blockquote>

      {/* Original language toggle */}
      {testimony.originalMessage && testimony.originalLanguage && testimony.originalLanguage !== testimony.language && (
        <button
          onClick={() => setShowOriginal((prev) => !prev)}
          className="self-start text-xs text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors underline underline-offset-2"
        >
          {showOriginal ? "Read translated version" : `Read in ${langFull[testimony.originalLanguage] ?? testimony.originalLanguage}`}
        </button>
      )}
    </motion.div>
  );
}

function BranchGroup({
  title,
  subtitle,
  testimonies,
}: {
  title: string;
  subtitle: string;
  testimonies: Testimony[];
}) {
  if (testimonies.length === 0) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col gap-5"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border-subtle)]" aria-hidden="true" />
        <div className="text-center">
          <h3 className="font-serif text-lg italic text-[var(--text-primary)]">{title}</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
        </div>
        <div className="h-px flex-1 bg-[var(--border-subtle)]" aria-hidden="true" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonies.map((t) => (
          <TestimonyCard key={t.id} testimony={t} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TestimoniesSection() {
  return (
    <section
      id="testimonies"
      className="section-anchor py-20 md:py-28 bg-[var(--bg-alt)]"
      aria-labelledby="testimonies-heading"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

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
            In Their Words
          </motion.p>
          <motion.h2
            id="testimonies-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Family Testimonies
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Words from those who knew her best — children, grandchildren, and great-grandchildren she loved and shaped.
          </motion.p>
        </motion.div>

        {/* Grouped testimonies */}
        <div className="flex flex-col gap-14">
          <BranchGroup
            title="From Her Children"
            subtitle="Abana baye"
            testimonies={testimoniesData.children as Testimony[]}
          />
          <BranchGroup
            title="From Her Grandchildren"
            subtitle="Abachokoro baye"
            testimonies={testimoniesData.grandchildren as Testimony[]}
          />
          <BranchGroup
            title="From Her Great-grandchildren"
            subtitle="Abachokoro b'abachokoro baye"
            testimonies={testimoniesData.greatGrandchildren as Testimony[]}
          />
        </div>

        {/* Guestbook CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors"
          >
            Leave your own tribute
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
