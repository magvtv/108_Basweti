import HeroSection from "@/components/sections/HeroSection";
import BiographySection from "@/components/sections/BiographySection";
import TimelineSection from "@/components/sections/TimelineSection";
import FamilySection from "@/components/sections/FamilySection";
import OrderOfServiceSection from "@/components/sections/OrderOfServiceSection";
import MemoryBoard from "@/components/sections/MemoryBoard";
import TestimoniesSection from "@/components/sections/TestimoniesSection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import PracticalSection from "@/components/sections/PracticalSection";
import LegacySection from "@/components/sections/LegacySection";
import Footer from "@/components/ui/Footer";

export default function MemorialPage() {
  return (
    <main>
      <HeroSection />
      <BiographySection />
      <TimelineSection />
      <FamilySection />
      <OrderOfServiceSection />
      <MemoryBoard />
      <TestimoniesSection />
      <GuestbookSection />
      <PracticalSection />
      <LegacySection />
      <Footer />
    </main>
  );
}
