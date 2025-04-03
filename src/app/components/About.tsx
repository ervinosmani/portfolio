"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-[#0F172A] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Teksti */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            I'm a Software Developer with a strong foundation in both front-end
            and back-end technologies. I specialize in building responsive,
            interactive, and high-performance web applications using modern
            stacks like ReactJS, NextJS, and TypeScript.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            My backend experience includes Node.js, Express, Firebase, and
            relational databases. I'm also confident in managing cloud services
            and deploying apps using tools like Vercel and Netlify.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I'm constantly learning and evolving to stay ahead in the tech
            industry, with a passion for clean code, accessibility, and user
            experience.
          </p>
        </motion.div>

        {/* Ilustrimi ose foto */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/img2.jpg"
            alt="About Illustration"
            width={400}
            height={400}
            className="w-full max-w-sm"
          />
        </motion.div>
      </div>
    </section>
  );
}
