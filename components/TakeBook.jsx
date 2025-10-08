"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBookOpen } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function TakeBook() {
  const { darkMode } = useTheme();

  // initialize aOS for animation
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section className="relative bg-teal-600 text-white py-20 px-6 overflow-hidden">
      {/* theme overlay */}
      <div
        className="absolute inset-0 transition-colors duration-500 z-0"
        style={{
          backgroundColor: darkMode
            ? "rgba(0,0,0,0.45)"
            : "rgba(255,255,255,0.08)",
        }}
      ></div>

      {/* main content */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* left side */}
        <div
          data-aos="fade-right"
          className="md:w-1/2 space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl text-base-content font-extrabold leading-tight">
            Let’s Take Your Book to the <br /> Next Chapter{" "}
            <FaBookOpen className="inline ml-1" />
          </h2>

          <p className="text-base-content text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Ready to share your ideas with the world? Join{" "}
            <b>LibraNova</b> and start building your own creative collection —
            where your words find their perfect readers. Inspire. Publish.
            Connect.
          </p>

          <Link
            href="/register"
            className="inline-block bg-white text-teal-700 font-semibold px-8 py-3 rounded shadow-md hover:bg-teal-50 transition duration-300"
          >
            Create an Account
          </Link>
        </div>

        {/* right side */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/NdccT74K/takebook.webp"
            alt="Books illustration"
            className="w-full max-w-sm md:max-w-md object-contain rounded-sm drop-shadow-2xl"
          />
        </div>
      </div>

      {/* decorative line */}
      <div className="relative z-10 w-24 h-1 bg-base-200 mx-auto mt-16 rounded-full"></div>

      {/* footer quote */}
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="relative z-10 text-center text-base-content mt-6 text-lg italic"
      >
        “Every great journey starts with a single page. Let’s write yours.”
      </p>
    </section>
  );
}
