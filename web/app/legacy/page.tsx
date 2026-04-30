import type { Metadata } from "next";
import LegacySection from "@/components/sections/LegacySection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Legacy & Remembrance — Peris Basweti",
  description: "Read scripture, sayings, values, and the ongoing remembrance statement of her legacy.",
};

export default function LegacyPage() {
  return (
    <main>
      <LegacySection />
      <Footer />
    </main>
  );
}

