import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FamilySection from "@/components/sections/FamilySection";
import TestimoniesSection from "@/components/sections/TestimoniesSection";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

export const metadata: Metadata = {
  title: "Family — Peris Basweti",
  description: "View family lineage and heartfelt testimonies from children, grandchildren, and great-grandchildren.",
};

export default function FamilyPage() {
  if (!pages.family.live) {
    redirect("/guestbook");
  }

  return (
    <main>
      <FamilySection />
      <TestimoniesSection />
      <Footer />
    </main>
  );
}
