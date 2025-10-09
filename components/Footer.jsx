"use client";
import { FaArrowUp, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();
  const [showButton, setShowButton] = useState(false);

  // Scroll listener for back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative transition-all duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-700/90 to-teal-900/90"></div>
      {/* theme overlay */}
      <div
        className="absolute inset-0 transition-colors duration-500 z-0"
        style={{
          backgroundColor: darkMode
            ? "rgba(0,0,0,0.54)"
            : "rgba(255,255,255,0.01)",
        }}
      ></div>

      {/* Decorative dashed border divider */}
      <div className="relative border-t-2 border-dashed border-teal-400 dark:border-teal-600"></div>

      {/* Footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-base-content">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide text-white dark:text-teal-300">
           LibraNova
          </h2>
          <p className="text-sm text-base-content mt-1">
            © {new Date().getFullYear()} Mst. Nasrin Howlader Jerin . All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/nasrinjerin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-300 text-base-content transition-transform transform hover:scale-125"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/JerinOnTheXplore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-300 text-base-content transition-transform transform hover:scale-125"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jerinjerin101325@gmail.com&su=Hello%20Jerin&body=I%20found%20your%20project%20amazing!"
            className="hover:text-teal-300 text-base-content transition-transform transform hover:scale-125"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Floating Back-to-top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-2 right-6 z-50 bg-teal-500 hover:bg-teal-400 text-white p-1 rounded-full shadow-lg hover:shadow-teal-400/50 transition-all"
          aria-label="Back to Top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
