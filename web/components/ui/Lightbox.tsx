"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface LightboxItem {
  id: string;
  assetType: "photo" | "video" | "audio" | "document";
  url: string;
  thumbnailUrl?: string;
  title?: string;
  caption?: string;
  contributorName?: string;
  contributorRelationship?: string;
  originalDate?: string;
  relatedTimelineId?: string;
  width?: number;
  height?: number;
}

interface LightboxProps {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({ item, onClose, onPrev, onNext, hasPrev, hasNext }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--text-primary)]/90"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 max-w-3xl w-full mx-4 bg-[var(--bg-base)] border border-[var(--border-subtle)] shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close viewer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {/* Media area */}
            <div className="relative bg-[var(--bg-alt)]">
              {item.assetType === "photo" && (
                <div className="relative w-full aspect-[4/3] img-memorial">
                  <Image
                    src={item.url}
                    alt={item.caption ?? item.title ?? "Memorial photo"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                  />
                </div>
              )}
              {item.assetType === "audio" && (
                <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M18 16v16l14-8-14-8z" fill="currentColor" opacity="0.7" />
                  </svg>
                  <audio controls className="w-full max-w-sm" src={item.url}>
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}
              {item.assetType === "video" && (
                <div className="relative w-full aspect-video">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster={item.thumbnailUrl}
                    preload="metadata"
                  >
                    <source src={item.url} />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              {item.assetType === "document" && (
                <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[var(--accent-bronze)]" aria-hidden="true">
                    <path d="M8 4h16l8 8v24H8V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M24 4v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--accent-umber)] underline underline-offset-2"
                  >
                    Open document
                  </a>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="px-5 py-4 flex flex-col gap-2 border-t border-[var(--border-subtle)]">
              {item.caption && (
                <p className="font-serif italic text-[var(--text-primary)] text-base leading-snug">{item.caption}</p>
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                {item.contributorName && (
                  <span>
                    Shared by{" "}
                    <span className="text-[var(--text-primary)]">{item.contributorName}</span>
                    {item.contributorRelationship && ` · ${item.contributorRelationship}`}
                  </span>
                )}
                {item.originalDate && <span>{item.originalDate}</span>}
                {item.relatedTimelineId && (
                  <a
                    href={`#${item.relatedTimelineId}`}
                    className="text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                  >
                    Related chapter
                  </a>
                )}
              </div>
            </div>

            {/* Prev / Next navigation */}
            {(hasPrev || hasNext) && (
              <div className="flex items-center justify-between px-5 pb-4 no-print">
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors flex items-center gap-1"
                  aria-label="Previous item"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors flex items-center gap-1"
                  aria-label="Next item"
                >
                  Next
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
