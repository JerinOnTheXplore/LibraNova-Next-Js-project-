"use client";
import { FaArrowUp, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-100 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left: Copyright */}
        <p className="text-sm sm:text-base">
          &copy; {new Date().getFullYear()} Mst. Nasrin Howlader Jerin. All rights reserved.
        </p>

        {/* Center: */}
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/nasrinjerin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/JerinOnTheXplore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jerinjerin101325@gmail.com&su=Hello%20Jerin&body=I%20found%20your%20project%20amazing!"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope size={20} />
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md transition-all"
        >
          <FaArrowUp />
          Top
        </button>
      </div>
    </footer>
  );
}
