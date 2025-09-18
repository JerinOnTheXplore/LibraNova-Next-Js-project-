"use client";

import Link from "next/link";
import { FaBookOpen, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-r from-teal-600 to-teal-500 overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col justify-center h-full">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
        >
          Welcome to LibraNova
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-lg md:text-xl text-white/90 max-w-xl drop-shadow-md"
        >
          Explore, borrow, and read your favorite books digitally. Join our
          library and start your reading journey today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Link
            href="/books"
            className="flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-white/90 transition-all"
          >
            <FaBookOpen /> Browse Books
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
          >
            <FaUserPlus /> Register
          </Link>
        </motion.div>
      </div>

      {/* Floating Book Images on Right - Stair Layout */}
      <div className="absolute right-18 md:right-36 top-120 md:top-1/6 flex md:flex-col items-end gap-8 z-0">
        <FloatingImage src="/images/book3.png" size={180} delay={0} />
        <FloatingImage src="/images/book2.png" size={200}  delay={0.3} />
        <FloatingImage src="/images/book1.png" size={220} delay={0.6} />
      </div>

      {/* Optional Bottom Decorative Wave */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
        <path
          fill="#ffffff10"
          fillOpacity="0.3"
          d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,138.7C672,117,768,75,864,69.3C960,64,1056,96,1152,112C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

/* ---------- FloatingImage Component ---------- */
function FloatingImage({ src, size = 120, delay = 0 }) {
  return (
    <motion.img
      src={src}
      alt="Decorative Book"
      className="rounded-lg shadow-xl"
      style={{ width: size, height: size, objectFit: "cover" }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        delay: delay,
      }}
    />
  );
}
