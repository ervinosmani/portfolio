"use client";

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaLaravel, FaPhp, FaVuejs, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiFirebase, SiNextdotjs } from "react-icons/si";

const techStack = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Vue.js", icon: <FaVuejs className="text-green-500" /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-300" /> },
  { name: "Laravel", icon: <FaLaravel className="text-red-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "MySQL", icon: <SiMysql className="text-yellow-500" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-400" /> },
];

export default function Technologies() {
  return (
    <section className="bg-[#121212] py-20 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech <span className="text-orange-500">Stack</span>
        </motion.h2>

        {/* Paragraf informues */}
        <motion.p
          className="text-gray-400 text-center text-base md:text-lg mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          These are the technologies and tools I regularly use to build modern, scalable, and responsive web applications.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-[#1E1E1E] rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:scale-105 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <p className="text-sm text-gray-300 font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
