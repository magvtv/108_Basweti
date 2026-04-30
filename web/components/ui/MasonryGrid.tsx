"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import type { LightboxItem } from "@/components/ui/Lightbox";

interface MasonryGridProps {
  items: LightboxItem[];
  onItemClick: (item: LightboxItem) => void;
}

function AssetIcon({ type }: { type: LightboxItem["assetType"] }) {
  if (type === "video") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white" aria-label="Video">
        <circle cx="9" cy="9" r="8" fill="currentColor" fillOpacity="0.5" />
        <path d="M7 6.5L12.5 9L7 11.5V6.5z" fill="currentColor" />
      </svg>
    );
  }
  if (type === "audio") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white" aria-label="Audio">
        <circle cx="9" cy="9" r="8" fill="currentColor" fillOpacity="0.5" />
        <path d="M6 7v4M9 5v8M12 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "document") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white" aria-label="Document">
        <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 2v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

export default function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--text-secondary)] text-sm italic">
        No items in this collection yet. Family contributions will appear here.
      </div>
    );
  }

  return (
    <div
      className="columns-2 md:columns-3 gap-3 md:gap-4"
      role="list"
      aria-label="Memory gallery"
    >
      {items.map((item, index) => (
        <motion.button
          key={item.id}
          role="listitem"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: (index % 9) * 0.04 }}
          onClick={() => onItemClick(item)}
          className="group relative w-full break-inside-avoid mb-3 md:mb-4 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bronze)]"
          aria-label={item.caption ?? item.title ?? "Memory item"}
        >
          {/* Thumbnail */}
          <div className="img-memorial relative overflow-hidden bg-[var(--surface-1)]">
            {item.assetType === "photo" || item.assetType === "video" ? (
              <Image
                src={item.thumbnailUrl ?? item.url}
                alt={item.caption ?? item.title ?? "Memory"}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center bg-[var(--bg-alt)]">
                <AssetIcon type={item.assetType} />
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[var(--text-primary)]/0 group-hover:bg-[var(--text-primary)]/20 transition-all duration-300 flex items-center justify-center">
              <AssetIcon type={item.assetType} />
            </div>
          </div>

          {/* Caption below image */}
          {item.caption && (
            <p className="text-xs text-[var(--text-secondary)] pt-1.5 pb-0.5 text-left leading-snug line-clamp-2 px-0.5">
              {item.caption}
            </p>
          )}
        </motion.button>
      ))}
    </div>
  );
}
