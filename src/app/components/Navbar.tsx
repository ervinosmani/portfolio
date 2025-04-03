"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] text-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#"
          onClick={() => setActiveLink("#")}
          className="text-xl md:text-2xl font-bold tracking-wide"
        >
          Portfolio
        </a>
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-sm md:text-base font-medium">
          <li>
            <a
              href="#"
              onClick={() => setActiveLink("#")}
              className={`hover:text-blue-400 transition-colors ${
                activeLink === "#" ? "text-blue-400 font-bold" : ""
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={() => setActiveLink("about")}
              className={`hover:text-blue-400 transition-colors ${
                activeLink === "about" ? "text-blue-400 font-bold" : ""
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={() => setActiveLink("projects")}
              className={`hover:text-blue-400 transition-colors ${
                activeLink === "projects" ? "text-blue-400 font-bold" : ""
              }`}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#journey"
              onClick={() => setActiveLink("journey")}
              className={`hover:text-blue-400 transition-colors ${
                activeLink === "journey" ? "text-blue-400 font-bold" : ""
              }`}
            >
              Journey
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => setActiveLink("contact")}
              className={`hover:text-blue-400 transition-colors ${
                activeLink === "contact" ? "text-blue-400 font-bold" : ""
              }`}
            >
              Contact
            </a>
          </li>
        </ul>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-xl focus:outline-none">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F172A]">
          <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
            <li>
              <a
                href="#"
                onClick={() => {
                  setActiveLink("#");
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === "#" ? "text-blue-400 font-bold" : ""
                }`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={() => {
                  setActiveLink("about");
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === "about" ? "text-blue-400 font-bold" : ""
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={() => {
                  setActiveLink("projects");
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === "projects" ? "text-blue-400 font-bold" : ""
                }`}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#journey"
                onClick={() => {
                  setActiveLink("journey");
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === "journey" ? "text-blue-400 font-bold" : ""
                }`}
              >
                Journey
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => {
                  setActiveLink("contact");
                  setMenuOpen(false);
                }}
                className={`hover:text-blue-400 transition-colors ${
                  activeLink === "contact" ? "text-blue-400 font-bold" : ""
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
