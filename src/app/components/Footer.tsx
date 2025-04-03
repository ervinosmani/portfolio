"use client";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white text-center py-8 border-t border-gray-700">
      <p className="text-sm mb-4">© {new Date().getFullYear()} Ervin Osmani. All rights reserved.</p>
      <div className="flex justify-center gap-6 text-xl">
        <a
          href="https://www.linkedin.com/in/ervin-osmani-5880941bb"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/ervinosmani"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:ervinosmani3@gmail.com"
          className="hover:text-red-400 transition"
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
