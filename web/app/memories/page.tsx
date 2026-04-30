import type { Metadata } from "next";
import MemoryBoard from "@/components/sections/MemoryBoard";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Photo & Memory Archive — Peris Basweti",
  description: "Browse family photos, memory artifacts, and preserved media in a curated memorial archive.",
};

export default function MemoriesPage() {
  return (
    <main>
      <MemoryBoard />
      <Footer />
    </main>
  );
}

