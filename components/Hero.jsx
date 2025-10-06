"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const images = [
  "https://i.ibb.co.com/d0z0Zhhq/book3.jpg",
  "https://i.ibb.co.com/chLc5RG6/book.jpg",
  "https://i.ibb.co.com/BVGVf63d/book1.jpg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { darkMode } = useTheme();
  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[75vh] overflow-hidden rounded-2xl shadow-xl">
      <AnimatePresence>
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          alt="Library Banner"
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay color changes with theme */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
        }}
      ></div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-teal-600 drop-shadow-lg mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover & Rent Your Favorite Books Anytime 📚
        </motion.h1>
        <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
          Browse through thousands of titles across all genres — read, review, and enjoy!
        </p>

        <Link href="/books">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition-colors"
          >
            Browse Books
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
