"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SkillsTabs() {
  // Menaxhon tab-in aktiv (skills, education, certifications)
  const [activeTab, setActiveTab] = useState("skills");

  const tabs = ["skills", "education", "certifications"];

  // Permbajtja e secilit tab
  const tabContent: { [key: string]: React.ReactNode } = {
    skills: (
      <ul className="list-disc space-y-2 ml-6 text-gray-300">
        <li>HTML, CSS, JavaScript, TypeScript</li>
        <li>ReactJS, NextJS, Vue.js</li>
        <li>Bootstrap, Tailwind CSS</li>
        <li>Node.js, Express, PHP, Laravel</li>
        <li>MySQL, Firebase</li>
        <li>Git, GitHub, Agile methodologies</li>
      </ul>
    ),
    education: (
      <ul className="list-disc space-y-2 ml-6 text-gray-300">
        <li>
          University for Business and Technology (UBT), Kosovo – BSc Computer
          Science (Currently)
        </li>
      </ul>
    ),
    certifications: (
      <ul className="list-disc space-y-2 ml-6 text-gray-300">
        <li>Frontend Web Development Certification (FreeCodeCamp)</li>
        <li>JavaScript Algorithms and Data Structures Certification</li>
      </ul>
    ),
  };

  return (
    <section id="journey" className="bg-[#0F172A] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Titulli i seksionit */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          My <span className="text-blue-500">Journey</span>
        </motion.h2>

        {/* Butonat e Tabs me flex-wrap për t&apos;u përshtatur në ekranet e vogla */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition border-b-2 uppercase font-medium
              ${
                activeTab === tab
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Permbajtja sipas tab-it aktiv me animacion */}
        <motion.div
          className="bg-[#1E293B] rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={activeTab}
        >
          {tabContent[activeTab]}
        </motion.div>
      </div>
    </section>
  );
}
