"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Technologies from "./components/Technologies";
import Highlights from "./components/Highlights";
import FeaturedProjects from "./components/FeaturedProjects";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FooterSection from "./components/FooterSection";
import BackToTopButton from "./components/BackToTopButton";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      <Technologies />
      <Highlights />

      {/* Projects Section */}
      <section id="projects"> 
        <FeaturedProjects />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      <FooterSection />
      <BackToTopButton />
    </main>
  );
}
