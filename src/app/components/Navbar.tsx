"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#121212] text-white py-6 px-8 shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="text-3xl font-bold text-orange-500">
          Ervin Osmani
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          className="text-3xl md:hidden block focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-lg md:block transition-all duration-300 ease-in-out`}
        >
          <Link
            href="#about"
            className="hover:text-orange-500 transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="#projects"
            className="hover:text-orange-500 transition-all duration-200"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="hover:text-orange-500 transition-all duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
