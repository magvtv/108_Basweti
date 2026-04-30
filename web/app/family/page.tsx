import type { Metadata } from "next";
import FamilySection from "@/components/sections/FamilySection";
import TestimoniesSection from "@/components/sections/TestimoniesSection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Family Lineage & Testimonies — Peris Basweti",
  description: "View family lineage and heartfelt testimonies from children, grandchildren, and great-grandchildren.",
};

export default function FamilyPage() {
  return (
    <main>
      <FamilySection />
      <TestimoniesSection />
      <Footer />
    </main>
  );
}

