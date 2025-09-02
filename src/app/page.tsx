import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Statistics } from "@/components/Statistics";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Statistics />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
