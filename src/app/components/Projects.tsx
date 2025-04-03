"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Lista e projekteve
const projects = [
  {
    title: "Job Finder",
    description: "A modern job search app built with Vue 3 and Firebase.",
    image: "/job-finder.png",
    liveLink: "https://vue-job-finder.netlify.app",
    githubLink: "https://github.com/ervinosmani/vue-job-finder",
  },
  {
    title: "Quote Generator",
    description: "A simple app that displays random motivational quotes.",
    image: "/quote.jpg",
    liveLink: "https://ervinosmani.github.io/quote-generator",
    githubLink: "https://github.com/ervinosmani/quote-generator",
  },
  {
    title: "Project 3",
    description: "A short description for the third project.",
    image: "/project2.jpg",
    liveLink: "#",
    githubLink: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0F172A] text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">My Projects</h2>
        <p className="text-lg text-gray-400">A selection of work showcasing my development skills</p>
      </div>

      {/* Grid per shfaqjen e projekteve */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-52">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              <div className="mt-auto flex gap-3">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg text-center hover:bg-blue-700 transition"
                >
                  Live
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-200 text-gray-900 text-sm font-medium py-2 rounded-lg text-center hover:bg-gray-300 transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
