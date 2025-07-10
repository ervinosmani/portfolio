"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import devAnimation from "../animations/developer-working.json";

export default function UpdatedAboutSection() {
  return (
    <section className="bg-[#121212] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Lottie animacioni ne vend te fotos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-64 h-64 md:w-96 md:h-96"
          >
            <Lottie animationData={devAnimation} loop autoplay className="w-full h-full" />
          </motion.div>

          {/* Informacioni rreth meje */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left flex-1"
          >
            <h2 className="text-5xl font-bold mb-6">
              A Little <span className="text-orange-500">About Me</span>
            </h2>
            <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
>
  Hi, I’m Ervin — a junior fullstack developer who loves turning ideas into simple and useful web apps. I enjoy crafting clean layouts, writing readable code, and constantly learning new techniques to improve.
</motion.p>
            <motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
>
  My focus is on creating intuitive user interfaces and fast experiences that feel natural to use. Every project I work on is a step toward building better, smarter digital tools that make a difference.
</motion.p> 
          </motion.div>
        </div>

        {/* Seksioni me tekst */}
        <div className="mt-16 text-center md:text-left">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-semibold mb-4"
          >
            My Approach to Development
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            I believe that web development is more than just writing code. It&apos;s about creating an impact on users&apos; lives through seamless, high-performance web apps. I focus on building apps that provide great user experiences, while also paying attention to detail in every line of code.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
