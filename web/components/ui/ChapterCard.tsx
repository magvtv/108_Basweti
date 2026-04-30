"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";

interface ChapterCardProps {
  id: string;
  titleEn?: string;
  titleGuz?: string;
  titleSw?: string;
  language: "en" | "sw" | "guz";
  content: string;
  imageUrl: string;
  imageAlt: string;
  imageSide?: "left" | "right";
  isLast?: boolean;
}

const langLabel: Record<string, string> = {
  en: "English",
  sw: "Kiswahili",
  guz: "Ekegusii",
};

export default function ChapterCard({
  id,
  titleEn,
  titleGuz,
  titleSw,
  language,
  content,
  imageUrl,
  imageAlt,
  imageSide = "right",
  isLast = false,
}: ChapterCardProps) {
  const displayTitle = titleGuz ?? titleSw ?? titleEn ?? "";
  const subTitle = titleGuz || titleSw ? titleEn : undefined;

  const imageVariants = imageSide === "left" ? slideInLeft : slideInRight;
  const textVariants = imageSide === "left" ? slideInRight : slideInLeft;

  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div id={id} className="scroll-mt-20">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
          imageSide === "left" ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image side */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={`img-memorial relative aspect-[4/5] overflow-hidden ${
            imageSide === "left" ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Text side */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={`flex flex-col gap-4 ${imageSide === "left" ? "md:order-2" : "md:order-1"}`}
        >
          {/* Language badge */}
          <span className="lang-badge self-start">{langLabel[language]}</span>

          {/* Title */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-primary)] italic leading-tight">
              {displayTitle}
            </h3>
            {subTitle && (
              <p className="mt-1 text-sm text-[var(--text-secondary)] tracking-wide">{subTitle}</p>
            )}
          </div>

          {/* Paragraphs */}
          <div className="flex flex-col gap-3">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[var(--text-secondary)] leading-relaxed text-base md:text-[0.975rem]"
              >
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider between chapters */}
      {!isLast && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 my-12 md:my-16"
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[var(--accent-bronze)] opacity-70">
            <circle cx="9" cy="9" r="3" fill="currentColor" />
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <div className="flex-1 h-px bg-[var(--border-subtle)]" />
        </motion.div>
      )}
    </div>
  );
}
