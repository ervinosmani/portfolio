"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const featured = [
  {
    title: "Vue Job Finder",
    description: "Job search web app built with Vue 3, Firebase, and Tailwind CSS.",
    image: "/job-finder.png",
    tech: ["Vue 3", "Firebase", "Tailwind CSS"],
    live: "https://vue-job-finder.netlify.app",
    github: "https://github.com/ervinosmani/vue-job-finder"
  },
  {
    title: "Quote Generator",
    description: "App that fetches and displays random motivational quotes.",
    image: "/quote.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://ervinosmani.github.io/quote-generator",
    github: "https://github.com/ervinosmani/quote-generator"
  },
  {
    title: "Next.js Portfolio",
    description: "Modern portfolio built with Next.js, showcasing skills and projects.",
    image: "/img2.jpg",
    tech: ["Next.js", "Tailwind CSS"],
    live: "#",
    github: "#"
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="bg-[#0F0F0F] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
        Project <span className="text-orange-500">Showcase</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1E1E1E] border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition"
            >
              <div className="relative h-52">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {proj.tech.map((tech, i) => (
                    <span key={i} className="bg-gray-800 px-3 py-1 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    Live
                  </a>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}