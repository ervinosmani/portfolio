"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const sections = ["about", "projects", "contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const observersRef = useRef<IntersectionObserver[]>([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.35, // më i ndjeshëm tani për seksione më të ulëta
    };
  
    const newObservers: IntersectionObserver[] = [];
  
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        }, options);
  
        observer.observe(section);
        newObservers.push(observer);
      }
    });
  
    observersRef.current = newObservers;
  
    return () => {
      observersRef.current.forEach((observer) => observer.disconnect());
    };
  }, []);  

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f] text-white shadow-sm h-16">
    <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <span className="text-orange-500 text-3xl font-bold">&lt;/&gt;</span>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
        {navLinks.map((link) => (
            <a
            key={link.href}
            href={link.href}
            className={`transition-colors text-lg font-medium ${
                activeSection === link.href.substring(1)
                ? "text-orange-500"
                : "text-white hover:text-orange-500"
            }`}
            >
            {link.label}
            </a>
        ))}
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        </div>
    </div>

    {/* Mobile Menu */}
    {/* Mobile Menu */}
{isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="md:hidden bg-[#121212] px-6 pb-4 pt-4"
  >
    <nav className="flex flex-col space-y-4">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={closeMenu}
          className={`transition-colors text-lg font-medium ${
            activeSection === link.href.substring(1)
              ? "text-orange-500"
              : "text-white hover:text-orange-500"
          }`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  </motion.div>
)}
    </header>
  );
}
