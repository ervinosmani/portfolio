"use client";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="bg-[#121212] text-white py-10 mt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-400 mb-4">
          © {new Date().getFullYear()} Ervin Osmani. All rights reserved.
        </p>
        <div className="flex justify-center gap-8 text-2xl">
          <a
            href="https://www.linkedin.com/in/ervin-osmani-5880941bb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ervinosmani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:ervinosmani3@gmail.com"
            className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
