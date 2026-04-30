"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/motion";
import familyData from "@/content/family.json";

interface FamilyMember {
  id: string;
  fullName: string;
  relationshipLabel: string;
  house?: string | null;
  parentId?: string;
  photoUrl?: string | null;
  sortOrder: number;
}

function MemberCard({ member }: { member: FamilyMember }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className="img-memorial w-16 h-16 rounded-full overflow-hidden bg-[var(--surface-1)] border border-[var(--border-subtle)]">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.fullName}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--surface-2)]" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">{member.fullName}</p>
        <p className="text-xs text-[var(--text-secondary)]">{member.relationshipLabel}</p>
        {member.house && (
          <p className="text-xs text-[var(--accent-bronze)] mt-0.5 italic">{member.house}</p>
        )}
      </div>
    </motion.div>
  );
}

function BranchGroup({
  title,
  members,
  subtitle,
}: {
  title: string;
  members: FamilyMember[];
  subtitle?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="flex flex-col gap-6"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--border-subtle)]" aria-hidden="true" />
        <div className="text-center">
          <h3 className="font-serif text-lg md:text-xl italic text-[var(--text-primary)]">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--text-secondary)] mt-0.5">{subtitle}</p>}
        </div>
        <div className="h-px flex-1 bg-[var(--border-subtle)]" aria-hidden="true" />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </motion.div>
  );
}

export default function FamilySection() {
  const { clanStatement, homestead, children, grandchildren, greatGrandchildren } = familyData;

  return (
    <section
      id="family"
      className="section-anchor py-20 md:py-28"
      aria-labelledby="family-heading"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Section heading */}
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
            Family & Lineage
          </motion.p>
          <motion.h2
            id="family-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-[var(--text-primary)] italic"
          >
            She Is Survived By
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
        </motion.div>

        {/* Clan & homestead acknowledgment */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-[var(--bg-alt)] border border-[var(--border-subtle)] p-6 md:p-8 mb-14 max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--accent-bronze)]">
              <path d="M8 2L14 6V14H2V6L8 2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M5 14V9H11V14" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            <span className="text-xs tracking-widest uppercase text-[var(--accent-bronze)]">{homestead}</span>
          </div>
          <p className="font-serif italic text-[var(--text-primary)] text-base md:text-lg leading-relaxed mb-3">
            {clanStatement.en}
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {clanStatement.sw}
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
            {clanStatement.guz}
          </p>
        </motion.div>

        {/* Family branches */}
        <div className="flex flex-col gap-14">
          <BranchGroup
            title="Children"
            members={children as FamilyMember[]}
            subtitle="Abana baye"
          />
          <BranchGroup
            title="Grandchildren"
            members={grandchildren as FamilyMember[]}
            subtitle="Abachokoro baye"
          />
          <BranchGroup
            title="Great-grandchildren"
            members={greatGrandchildren as FamilyMember[]}
            subtitle="Abachokoro b'abachokoro baye"
          />
        </div>

        {/* Continue CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#service"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent-bronze)] hover:text-[var(--accent-umber)] transition-colors"
          >
            View order of service
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
