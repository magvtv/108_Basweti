import type { Metadata } from "next";
import { redirect } from "next/navigation";
import BiographySection from "@/components/sections/BiographySection";
import TimelineSection from "@/components/sections/TimelineSection";
import ComingSoon from "@/components/ui/ComingSoon";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

export const metadata: Metadata = {
  title: "Her Story — Peris Basweti",
  description: "Explore the biography and life timeline of Peris Basweti across the seasons of her life.",
};

export default function StoryPage() {
  if (!pages.story.live) {
    redirect("/guestbook");
  }

  return (
    <main>
      <BiographySection />
      <TimelineSection />
      <Footer />
    </main>
  );
}
