import type { Metadata } from "next";
import { redirect } from "next/navigation";
import MemoryBoard from "@/components/sections/MemoryBoard";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

export const metadata: Metadata = {
  title: "Gallery — Peris Basweti",
  description: "Browse family photos, memory artifacts, and preserved media in a curated memorial archive.",
};

export default function MemoriesPage() {
  if (!pages.memories.live) {
    redirect("/guestbook");
  }

  return (
    <main>
      <MemoryBoard />
      <Footer />
    </main>
  );
}
