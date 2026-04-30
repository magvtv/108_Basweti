import type { Metadata } from "next";
import OrderOfServiceSection from "@/components/sections/OrderOfServiceSection";
import PracticalSection from "@/components/sections/PracticalSection";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Order of Service & Practical Details — Peris Basweti",
  description: "Find burial ceremony flow, service details, location guidance, contacts, and practical updates.",
};

export default function ServicePage() {
  return (
    <main>
      <OrderOfServiceSection />
      <PracticalSection />
      <Footer />
    </main>
  );
}

