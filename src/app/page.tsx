import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Team />
      <Gallery />
      <Testimonials />
    </main>
  );
}
