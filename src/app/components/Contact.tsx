"use client";

import { motion } from "framer-motion";

export default function Contact() {
  // Ky seksion shfaq informacion bazuar ne CV
  return (
    <section id="contact" className="bg-[#0F172A] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Titulli i seksionit */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact Me
        </motion.h2>

        {/* Pershkrim i shkurter (Professional Objective) */}
        <p className="text-gray-300 mb-8 text-center max-w-3xl mx-auto">
          I am a passionate and motivated programmer seeking to build a career in web development or software engineering. With strong skills in modern web development technologies and a great desire to learn and contribute, I aim to deliver creative and valuable solutions for challenging projects.
        </p>

        {/* Informacioni i kontaktit bazuar ne CV */}
        <div className="bg-[#1E293B] p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              Email:{" "}
              <a
                href="mailto:ervinosmani@gmail.com"
                className="text-blue-500 hover:underline"
              >
                ervinosmani@gmail.com
              </a>
            </li>
            <li>Phone: +38349155546</li>
            <li>Location: Lipjan, Kosovo</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
