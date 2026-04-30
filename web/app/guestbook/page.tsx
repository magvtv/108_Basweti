import type { Metadata } from "next";
import GuestbookSection from "@/components/sections/GuestbookSection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Leave a Tribute — Peris Basweti",
  description: "Share condolences, memories, prayers, and testimonies in the moderated family guestbook.",
};

export default function GuestbookPage() {
  return (
    <main>
      <GuestbookSection />
      <Footer />
    </main>
  );
}

