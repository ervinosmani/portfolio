"use client";

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="bg-[#121212] text-white py-10 border-t border-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-gray-300 mb-6">
          I'm currently open to new opportunities — whether it's a full-time role, internship, or freelance collaboration.  
          Feel free to reach out!
        </p>

        <div className="flex justify-center gap-8 text-2xl mb-6">
          <a
            href="https://www.linkedin.com/in/ervin-osmani-5880941bb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
            className="text-gray-400 hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ervinosmani"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub"
            className="text-gray-400 hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:ervinosmani3@gmail.com"
            aria-label="Send me an email"
            title="Email"
            className="text-gray-400 hover:text-orange-500 transition-all duration-300 transform hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="text-sm text-gray-400 mb-1">
          Built with passion and caffeine ☕ — thank you for visiting!
        </p>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Ervin Osmani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
