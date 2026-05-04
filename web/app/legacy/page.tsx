import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LegacySection from "@/components/sections/LegacySection";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

export const metadata: Metadata = {
  title: "Legacy — Peris Basweti",
  description: "Read scripture, sayings, values, and the ongoing remembrance statement of her legacy.",
};

export default function LegacyPage() {
  if (!pages.legacy.live) {
    redirect("/guestbook");
  }

  return (
    <main>
      <LegacySection />
      <Footer />
    </main>
  );
}
