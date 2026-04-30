"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import MasonryGrid from "@/components/ui/MasonryGrid";
import Lightbox, { type LightboxItem } from "@/components/ui/Lightbox";

type Tab = "photos" | "artifacts" | "videos";

const tabConfig: { id: Tab; label: string; sublabel: string }[] = [
  { id: "photos", label: "Family Photos", sublabel: "Picha za familia" },
  { id: "artifacts", label: "Memory Artifacts", sublabel: "Vitu vya kumbukumbu" },
  { id: "videos", label: "Videos & Voices", sublabel: "Video na sauti" },
];

const galleryItems: Record<Tab, LightboxItem[]> = {
  photos: [
    {
      id: "p1",
      assetType: "photo",
      url: "/images/gallery/photo-1.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-1-thumb.webp",
      caption: "[ Add caption — year, place, occasion ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
      relatedTimelineId: "roots",
    },
    {
      id: "p2",
      assetType: "photo",
      url: "/images/gallery/photo-2.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-2-thumb.webp",
      caption: "[ Family photo at the homestead ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p3",
      assetType: "photo",
      url: "/images/gallery/photo-3.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-3-thumb.webp",
      caption: "[ Family gathering ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
      relatedTimelineId: "motherhood",
    },
    {
      id: "p4",
      assetType: "photo",
      url: "/images/gallery/photo-4.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-4-thumb.webp",
      caption: "[ Church gathering photo ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
      relatedTimelineId: "faith",
    },
    {
      id: "p5",
      assetType: "photo",
      url: "/images/gallery/photo-5.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-5-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p6",
      assetType: "photo",
      url: "/images/gallery/photo-6.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-6-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p7",
      assetType: "photo",
      url: "/images/gallery/photo-7.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-7-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p8",
      assetType: "photo",
      url: "/images/gallery/photo-8.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-8-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p9",
      assetType: "photo",
      url: "/images/gallery/photo-9.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-9-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p10",
      assetType: "photo",
      url: "/images/gallery/photo-10.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-10-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
    {
      id: "p11",
      assetType: "photo",
      url: "/images/gallery/photo-11.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-11-thumb.webp",
      caption: "[ Add caption ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
  ],
  artifacts: [
    {
      id: "a1",
      assetType: "document",
      url: "/images/gallery/photo-1.jpg",
      thumbnailUrl: "/images/gallery/thumbs/photo-1-thumb.webp",
      caption: "[ Scanned letter or handwritten note — add description ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
  ],
  videos: [
    {
      id: "v1",
      assetType: "audio",
      url: "/audio/placeholder.mp3",
      thumbnailUrl: "/images/gallery/thumbs/photo-2-thumb.webp",
      caption: "[ Voice note or audio testimony — add description ]",
      contributorName: "[ Family member ]",
      contributorRelationship: "[ Relationship ]",
      originalDate: "[ Year ]",
    },
  ],
};

export default function MemoryBoard() {
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [lightboxItem, setLightboxItem] = useState<LightboxItem | null>(null);

  const currentItems = galleryItems[activeTab];
  const currentIndex = lightboxItem ? currentItems.findIndex((i) => i.id === lightboxItem.id) : -1;

  const openLightbox = (item: LightboxItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);
  const goPrev = () => currentIndex > 0 && setLightboxItem(currentItems[currentIndex - 1]);
  const goNext = () => currentIndex < currentItems.length - 1 && setLightboxItem(currentItems[currentIndex + 1]);

  return (
    <section
      id="memories"
      className="section-anchor py-20 md:py-28"
      aria-labelledby="memories-heading"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Section heading */}
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
            Memory Archive
          </motion.p>
          <motion.h2
            id="memories-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            Memories We Carry
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Photos, letters, and voices shared by family — a preserved archive of a life fully lived.
          </motion.p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex border-b border-[var(--border-subtle)] mb-8"
          role="tablist"
          aria-label="Memory categories"
        >
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-start px-4 py-3 border-b-2 transition-all duration-200 text-left ${
                activeTab === tab.id
                  ? "border-[var(--accent-umber)] text-[var(--text-primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)]"
              }`}
            >
              <span className="text-sm font-medium">{tab.label}</span>
              <span className="text-xs text-[var(--text-secondary)] hidden md:block">{tab.sublabel}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab panels */}
        {tabConfig.map((tab) => (
          <div
            key={tab.id}
            id={`tab-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
          >
            {activeTab === tab.id && (
              <MasonryGrid items={currentItems} onItemClick={openLightbox} />
            )}
          </div>
        ))}

        {/* Contribute CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors"
          >
            Share a memory or tribute
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < currentItems.length - 1}
      />
    </section>
  );
}
