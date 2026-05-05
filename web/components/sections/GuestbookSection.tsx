"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  clearGuestbookDraft,
  DRAFT_VERSION,
  readGuestbookDraft,
  TRIBUTE_TYPES,
  writeGuestbookDraft,
} from "@/lib/guestbookDraft";
import { fadeUp, staggerContainer } from "@/lib/motion";
import type { TributeType } from "@/lib/supabase";

const RELATIONSHIPS = [
  { value: "child", label: "Child" },
  { value: "grandchild", label: "Grandchild" },
  { value: "great-grandchild", label: "Great Grandchild" },
  { value: "relative", label: "Relative" },
  { value: "friend", label: "Friend" },
  { value: "church", label: "Church" },
  { value: "community", label: "Community" },
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function GuestbookSection() {
  const [selectedType, setSelectedType] = useState<TributeType | null>(null);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [draftHydrated, setDraftHydrated] = useState(false);
  const restoreRan = useRef(false);

  useEffect(() => {
    if (restoreRan.current) return;
    restoreRan.current = true;
    const draft = readGuestbookDraft();
    if (draft) {
      setSelectedType(draft.selectedType);
      setName(draft.name);
      setRelationship(draft.relationship);
      setCountry(draft.country);
      setMessage(draft.message);
      setConsent(draft.consent);
    }
    setDraftHydrated(true);
  }, []);

  useEffect(() => {
    if (!draftHydrated || submitState === "success") return;
    writeGuestbookDraft({
      v: DRAFT_VERSION,
      selectedType,
      name,
      relationship,
      country,
      message,
      consent,
    });
  }, [draftHydrated, submitState, selectedType, name, relationship, country, message, consent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedType) {
      setErrorMessage("Please select a message type.");
      setSubmitState("error");
      return;
    }
    if (!consent) {
      setErrorMessage("Please give consent before submitting.");
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/tributes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, relationship, country, type: selectedType, message, consent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setSubmitState("error");
        return;
      }

      clearGuestbookDraft();
      setSubmitState("success");
    } catch {
      setErrorMessage("Network error — please check your connection and try again.");
      setSubmitState("error");
    }
  }

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
            className="text-xs tracking-[0.2em] uppercase text-text-secondary mb-3"
          >
            Diaspora & Family
          </motion.p>
          <motion.h2
            id="guestbook-heading"
            variants={fadeUp}
            className="font-serif text-3xl md:text-5xl text-text-primary italic"
          >
            Leave a Tribute
          </motion.h2>
          <motion.div variants={fadeUp} className="memorial-divider" aria-hidden="true" />
          <motion.p variants={fadeUp} className="text-text-secondary text-sm leading-relaxed max-w-sm mx-auto">
            Whether near or far, your words are a gift to this family. All messages are reviewed by the family before appearing here.
          </motion.p>
        </motion.div>

        {/* Moderation note */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border border-border-subtle bg-bg-alt p-4 mb-8 text-center"
        >
          <p className="text-xs text-text-secondary leading-relaxed">
            We invite written messages, condolences, memories, and prayers in any language.
            Messages are reviewed by the family before being published. Please write with the
            respect and warmth this family deserves.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitState === "success" ? (
            /* Success state */
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-border-subtle bg-bg-base p-8 md:p-12 text-center"
            >
              <div className="w-10 h-10 mx-auto mb-5 rounded-full border border-accent-bronze flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                  className="text-accent-bronze"
                >
                  <path
                    d="M3 9l4.5 4.5L15 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl italic text-text-primary mb-3">
                Thank you for your tribute
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                Your message has been received. The family will review it and publish it here once moderated.
              </p>
              <button
                onClick={() => {
                  setSubmitState("idle");
                  setSelectedType(null);
                  setName("");
                  setRelationship("");
                  setCountry("");
                  setMessage("");
                  setConsent(false);
                }}
                className="mt-6 text-xs tracking-wide underline underline-offset-4 text-text-secondary hover:text-text-primary transition-colors"
              >
                Submit another message
              </button>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              key="form"
              data-testid="guestbook-form"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="border border-border-subtle bg-bg-base p-6 md:p-8"
              noValidate
            >
              <div className="flex flex-col gap-5">

                {/* Tribute type */}
                <fieldset>
                  <legend className="block text-xs tracking-wide uppercase text-text-secondary mb-2">
                    Type of message <span className="text-accent-umber" aria-hidden="true">*</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {TRIBUTE_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={selectedType === type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 text-xs border transition-colors ${
                          selectedType === type
                            ? "border-accent-bronze bg-accent-bronze text-bg-base"
                            : "border-border-subtle text-text-secondary hover:border-accent-bronze hover:text-text-primary"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Name + Relationship */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guestbook-name"
                      className="block text-xs tracking-wide uppercase text-text-secondary mb-1.5"
                    >
                      Your name <span className="text-accent-umber" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="guestbook-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-border-subtle bg-bg-alt px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary placeholder:opacity-60 focus:outline-none focus:border-accent-bronze"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guestbook-relationship"
                      className="block text-xs tracking-wide uppercase text-text-secondary mb-1.5"
                    >
                      Relationship
                    </label>
                    <select
                      id="guestbook-relationship"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full border border-border-subtle bg-bg-alt px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-bronze"
                    >
                      <option value="">Select relationship</option>
                      {RELATIONSHIPS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="guestbook-country"
                    className="block text-xs tracking-wide uppercase text-text-secondary mb-1.5"
                  >
                    Country
                  </label>
                  <input
                    id="guestbook-country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border border-border-subtle bg-bg-alt px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary placeholder:opacity-60 focus:outline-none focus:border-accent-bronze"
                    placeholder="e.g. Kenya, United Kingdom, USA"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="guestbook-message"
                    className="block text-xs tracking-wide uppercase text-text-secondary mb-1.5"
                  >
                    Your message <span className="text-accent-umber" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="guestbook-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-border-subtle bg-bg-alt px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary placeholder:opacity-60 focus:outline-none focus:border-accent-bronze resize-none"
                    placeholder="Write your condolence, memory, prayer, or testimony here. You may write in English, Kiswahili, or Ekegusii."
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2">
                  <input
                    id="guestbook-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-accent-umber"
                    required
                  />
                  <label
                    htmlFor="guestbook-consent"
                    className="text-xs text-text-secondary leading-relaxed"
                  >
                    I consent to this message being reviewed by the family and published on this memorial page.
                  </label>
                </div>

                {/* Error banner */}
                <AnimatePresence>
                  {submitState === "error" && errorMessage && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="alert"
                      className="text-xs text-accent-umber border border-accent-umber px-3 py-2"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="w-full py-3 text-sm tracking-wide border border-accent-umber text-accent-umber hover:bg-accent-umber hover:text-bg-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitState === "loading" ? "Sending…" : "Submit Tribute"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
