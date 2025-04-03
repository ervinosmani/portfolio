"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import About from "./components/About";
import SkillsTabs from "./components/SkillsTabs";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Seksioni Hero i ridizajnuar me gradient + animim */}
      <main className="relative bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-6 py-20 min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 overflow-hidden">
        {/* Gradient i sfondit ne sfond */}
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-tr from-blue-800 via-purple-700 to-indigo-900 opacity-10 pointer-events-none" />

        {/* Teksti */}
        <motion.div
          className="z-10 text-center md:text-left max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Hello, I&apos;m <span className="text-blue-400">Ervin Osmani</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            A Software Developer passionate about crafting performant, scalable and elegant web apps using cutting-edge technologies.
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-lg font-medium"
            >
              View Projects
            </a>
            <a
              href="/Ervin Osmani CV(en).pdf"
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-white hover:text-black transition shadow font-medium"
              download
            >
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Fotoja ose ilustrimi */}
        <motion.div
          className="z-10 w-60 h-60 relative rounded-full overflow-hidden shadow-xl border-4 border-blue-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Image
            src="/eo.jpg"
            alt="Ervin Osmani"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </main>

      <About />
      <SkillsTabs />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
