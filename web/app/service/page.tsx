import type { Metadata } from "next";
import { redirect } from "next/navigation";
import OrderOfServiceSection from "@/components/sections/OrderOfServiceSection";
import PracticalSection from "@/components/sections/PracticalSection";
import Footer from "@/components/ui/Footer";
import { pages } from "@/lib/config/pages";

export const metadata: Metadata = {
  title: "Order of Service — Peris Basweti",
  description: "Find burial ceremony flow, service details, location guidance, contacts, and practical updates.",
};

export default function ServicePage() {
  if (!pages.service.live) {
    redirect("/guestbook");
  }

  return (
    <main>
      <OrderOfServiceSection />
      <PracticalSection />
      <Footer />
    </main>
  );
}
