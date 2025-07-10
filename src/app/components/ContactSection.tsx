"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="bg-[#121212] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Get in <span className="text-orange-500">Touch</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          Driven by curiosity and code, I’ve already built full-stack projects and clean user interfaces using modern tools — and I’m just getting started. I’m currently seeking a role or internship where I can grow fast, take ownership, and contribute meaningfully to a real-world team. If you’re looking for a junior developer with strong fundamentals, real experience, and the hunger to learn — I’d love to hear from you.
      </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:ervinosmani3@gmail.com"
            aria-label="Send me an email"
            title="Send me an email"
            className="bg-orange-500 hover:bg-orange-600 
                       text-white px-6 py-3 rounded-lg font-semibold 
                       transition duration-300"
          >
            Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/ervin-osmani-5880941bb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with me on LinkedIn"
            title="Connect on LinkedIn"
            className="border border-gray-500 hover:bg-white hover:text-black 
                       text-white px-6 py-3 rounded-lg font-semibold 
                       transition duration-300"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
