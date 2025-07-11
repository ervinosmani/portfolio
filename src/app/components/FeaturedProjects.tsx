"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const featured = [
  {
    title: "Portfolio",
    description: "Personal portfolio website built with Next.js and Tailwind CSS to showcase skills and projects.",
    image: "/portfolio.png",
    tech: ["Next.js", "Tailwind CSS"],
    live: "https://ervinosmani.vercel.app/",
    github: "https://github.com/ervinosmani/portfolio",
  },
  {
    title: "Vue Job Finder",
    description: "Job search platform built with Vue 3 and Firebase for real-time job listings and Tailwind CSS for styling.",
    image: "/job-finder.png",
    tech: ["Vue 3", "Firebase", "Tailwind CSS"],
    live: "https://vue-job-finder.netlify.app",
    github: "https://github.com/ervinosmani/vue-job-finder",
  },
  {
    title: "Blogging Platform",
    description:
      "A feature-rich blogging platform built with Laravel and Vue 3. Includes user authentication, post categories, and a markdown editor.",
    image: "/blogproject1.png",
    tech: ["Laravel", "Vue 3", "MySQL", "Tailwind CSS"],
    live: "", // offline
    github: "https://github.com/ervinosmani/blogging-platform",
    previewImages: [
      "/blogproject2.png",
      "/blogproject3.png",
      "/blogproject4.png",
      "/blogproject5.png",
      "/blogproject6.png",
      "/blogproject7.png",
      "/blogproject8.png",
      "/blogproject9.png",
    ],
  },
];

export default function FeaturedProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<string[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openModal = (images: string[]) => {
    setCurrentPreview(images);
    setCarouselIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goPrev = () => {
    if (carouselIndex > 0) setCarouselIndex((i) => i - 1);
  };

  const goNext = () => {
    if (carouselIndex < currentPreview.length - 1) setCarouselIndex((i) => i + 1);
  };

  return (
    <section id="projects" className="bg-[#0F0F0F] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Projects <span className="text-orange-500">Showcase</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1E1E1E] border border-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-orange-500/20 transition h-full flex flex-col"
            >
              <div className="relative aspect-[4/3]">
                <Image src={proj.image} alt={proj.title} fill className="object-cover" />
              </div>
              <div className="p-5 flex flex-col gap-4 h-full">
                <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {proj.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 px-3 py-1 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm font-medium flex-wrap mt-auto">
                  {proj.live ? (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:underline"
                    >
                      Live Demo
                    </a>
                  ) : proj.previewImages ? (
                    <button
                      onClick={() => openModal(proj.previewImages!)}
                      className="text-orange-500 hover:underline cursor-pointer relative group"
                    >
                      Offline Preview
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to see screenshots
                      </span>
                  </button>
                  ) : null}
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] p-6 rounded-xl relative w-full max-w-2xl">
            <h2 className="text-white text-center text-xl font-bold mb-4">
              Offline Preview
            </h2>

            <div className="relative w-full h-72 sm:h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={currentPreview[carouselIndex]}
                    alt={`Preview ${carouselIndex + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={goPrev}
                disabled={carouselIndex === 0}
                className="text-white disabled:opacity-30 px-3 py-1 border border-gray-700 rounded"
              >
                ← Prev
              </button>
              <span className="text-sm text-gray-400">
                {carouselIndex + 1} / {currentPreview.length}
              </span>
              <button
                onClick={goNext}
                disabled={carouselIndex === currentPreview.length - 1}
                className="text-white disabled:opacity-30 px-3 py-1 border border-gray-700 rounded"
              >
                Next →
              </button>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-white text-xl hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
