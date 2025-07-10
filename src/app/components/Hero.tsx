"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 md:pt-24 min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-gray-900 text-white flex flex-col md:flex-row items-center justify-center px-6 relative overflow-hidden">
      {/* Background Animation Circle */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] rounded-full bg-orange-600 opacity-20 blur-[100px] z-0" />

      {/* Text Section */}
      <div className="text-center md:text-left z-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
        >
          Hi, I&apos;m <span className="text-orange-500">Ervin</span> — I design and build modern web applications.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          An aspiring fullstack developer passionate about learning and building user-friendly web experiences through clean design and thoughtful code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="#projects"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 text-white rounded-lg font-semibold shadow transition-all transform hover:scale-105"
          >
            My Projects
          </Link>
          <a
            href="/Ervin_Osmani_CV_EN.pdf"
            download
            className="border border-gray-500 hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105"
          >
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 md:mt-0 md:ml-16 w-64 h-64 md:w-96 md:h-96 relative z-10 rounded-xl overflow-hidden shadow-xl border-2"
      >
        <Image
          src="/eo.png"
          alt="Portrait of Ervin Osmani, fullstack web developer"
          fill
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
