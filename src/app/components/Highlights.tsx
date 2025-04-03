"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaChalkboardTeacher, FaUserTie, FaHandsHelping } from "react-icons/fa";

const highlights = [
  {
    icon: <FaGraduationCap className="text-3xl text-orange-500" />,
    title: "Education",
    description: "Currently pursuing a Bachelor&apos;s degree in Computer Science at UBT, building a strong foundation in programming and software design."
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl text-orange-500" />,
    title: "Internship",
    description: "Completed internship at Digital School as an Assistant Instructor in web development."
  },
  {
    icon: <FaUserTie className="text-3xl text-orange-500" />,
    title: "Training",
    description: "1-year fullstack bootcamp at Probit Academy focused on React, Laravel, and APIs."
  },
  {
    icon: <FaHandsHelping className="text-3xl text-orange-500" />,
    title: "Volunteering",
    description: "Actively involved in tech communities, helping others grow and contribute in open-source projects."
  }
];

export default function Highlights() {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Career <span className="text-orange-500">Highlights</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
