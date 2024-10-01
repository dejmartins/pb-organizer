import Header from "./ui/landing/header";
import HeroSection from "./ui/landing/hero-section";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />

      <div className="px-2 md:px-3 bg-[#FFF3F5]">
        <HeroSection />
      </div>
    </main>
  );
}