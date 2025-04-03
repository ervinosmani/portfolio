"use client";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Technologies from "./components/Technologies";
import Highlights from "./components/Highlights";
import FeaturedProjects from "./components/FeaturedProjects";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import BackToTopButton from "./components/BackToTopButton";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Technologies />
      <Highlights />
      <FeaturedProjects />
      <ContactSection />
      <FooterSection />
      <BackToTopButton />
    </main>
  );
}
