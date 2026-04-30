"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, cardExpand } from "@/lib/motion";

interface TimelineEntry {
  id: string;
  year: string;
  labelGuz?: string;
  labelSw?: string;
  labelEn: string;
  language: "en" | "sw" | "guz";
  paragraph: string;
  imageUrl: string;
  imageAlt: string;
}

const langLabel: Record<string, string> = {
  en: "EN",
  sw: "SW",
  guz: "GUZ",
};

export default function TimelineRail({ entries }: { entries: TimelineEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(entries[0]?.id ?? null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Desktop: vertical rail */}
      <div className="hidden md:flex gap-10" aria-label="Life timeline">
        {/* Rail column */}
        <div className="relative flex flex-col items-center pt-2" aria-hidden="true">
          <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[var(--border-subtle)]" />
          {entries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => toggle(entry.id)}
              className={`relative z-10 w-3 h-3 rounded-full border-2 transition-all duration-200 mt-0 mb-[4.5rem] ${
                openId === entry.id
                  ? "border-[var(--accent-umber)] bg-[var(--accent-umber)]"
                  : "border-[var(--accent-bronze)] bg-[var(--bg-base)] hover:bg-[var(--accent-bronze)]"
              }`}
              aria-label={`${entry.labelEn}, ${entry.year}`}
            />
          ))}
        </div>

        {/* Cards column */}
        <div className="flex-1 flex flex-col gap-4">
          {entries.map((entry, i) => (
            <DesktopCard
              key={entry.id}
              entry={entry}
              isOpen={openId === entry.id}
              onToggle={() => toggle(entry.id)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex md:hidden flex-col gap-4">
        {entries.map((entry, i) => (
          <MobileCard
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
            index={i}
          />
        ))}
      </div>
    </>
  );
}

function DesktopCard({
  entry,
  isOpen,
  onToggle,
  index,
}: {
  entry: TimelineEntry;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const label = entry.labelGuz ?? entry.labelSw ?? entry.labelEn;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      className={`border transition-colors duration-200 ${
        isOpen ? "border-[var(--accent-bronze)]" : "border-[var(--border-subtle)]"
      } bg-[var(--bg-base)]`}
    >
      {/* Card header / toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-widest text-[var(--accent-bronze)]">{entry.year}</span>
          <span className="lang-badge">{langLabel[entry.language]}</span>
          <h4 className="font-serif text-lg italic text-[var(--text-primary)] group-hover:text-[var(--accent-umber)] transition-colors">
            {label}
          </h4>
          {label !== entry.labelEn && (
            <span className="text-xs text-[var(--text-secondary)] hidden lg:inline">{entry.labelEn}</span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`text-[var(--text-secondary)] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={cardExpand}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="grid grid-cols-5 gap-6 px-5 pb-6">
              <div className="col-span-3 flex flex-col gap-3">
                {entry.paragraph.split("\n\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>
              <div className="col-span-2 img-memorial relative aspect-[4/3] overflow-hidden">
                <Image
                  src={entry.imageUrl}
                  alt={entry.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MobileCard({
  entry,
  isOpen,
  onToggle,
  index,
}: {
  entry: TimelineEntry;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const label = entry.labelGuz ?? entry.labelSw ?? entry.labelEn;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`border transition-colors duration-200 ${
        isOpen ? "border-[var(--accent-bronze)]" : "border-[var(--border-subtle)]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between px-4 py-4 text-left gap-3"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-widest text-[var(--accent-bronze)]">{entry.year}</span>
            <span className="lang-badge">{langLabel[entry.language]}</span>
          </div>
          <h4 className="font-serif text-lg italic text-[var(--text-primary)] leading-tight">{label}</h4>
          {label !== entry.labelEn && (
            <span className="text-xs text-[var(--text-secondary)]">{entry.labelEn}</span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`text-[var(--text-secondary)] transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={cardExpand}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 flex flex-col gap-4">
              <div className="img-memorial relative aspect-video overflow-hidden">
                <Image
                  src={entry.imageUrl}
                  alt={entry.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {entry.paragraph.split("\n\n").filter(Boolean).map((p, i) => (
                <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
