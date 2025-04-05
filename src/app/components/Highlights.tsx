"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserTie,
  FaHandsHelping,
  FaBriefcase,
} from "react-icons/fa";

const highlights = [
  {
    icon: <FaGraduationCap className="text-3xl text-orange-500" />,
    title: "Education",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science at UBT, building a strong foundation in programming and software design.",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl text-orange-500" />,
    title: "Assistant Instructor",
    description: "Completed a practical role at Digital School, assisting in teaching front-end and web development to students.",
  },    
  {
    icon: <FaUserTie className="text-3xl text-orange-500" />,
    title: "Certification",
    description:
      "Successfully completed a 1-year fullstack program at Probit Academy and received a professional certification in React, Laravel, and API development.",
  },
  {
    icon: <FaBriefcase className="text-3xl text-orange-500" />,
    title: "Starlabs Internship",
    description:
      "Completed a 3-month web development internship at Starlabs, working on real-world applications with modern technologies.",
  },
  {
    icon: <FaHandsHelping className="text-3xl text-orange-500" />,
    title: "Volunteering",
    description:
      "Actively involved in tech communities, helping others grow and contribute in open-source projects.",
  },
];

export default function Highlights() {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">
          Career <span className="text-orange-500">Highlights</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
