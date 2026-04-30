import type { Metadata } from "next";
import BiographySection from "@/components/sections/BiographySection";
import TimelineSection from "@/components/sections/TimelineSection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Life Story & Timeline — Peris Basweti",
  description: "Explore the biography and life timeline of Peris Basweti across the seasons of her life.",
};

export default function StoryPage() {
  return (
    <main>
      <BiographySection />
      <TimelineSection />
      <Footer />
    </main>
  );
}

