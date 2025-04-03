"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="bg-[#121212] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Get in <span className="text-orange-500">Touch</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-300 mb-10"
        >
          Feel free to reach out for collaboration, inquiries, or just a chat about technology. Let’s build something great together!
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6"
        >
          <a
            href="mailto:ervinosmani3@gmail.com"
            className="text-white bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/ervin-osmani-5880941bb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white border border-gray-500 hover:bg-white hover:text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}