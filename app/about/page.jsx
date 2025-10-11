"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
    FaFeatherAlt,
    FaBookOpen,
    FaUser,
    FaPaperPlane,
    FaGlobeAmericas,
    FaGithub,
    FaLinkedin,
    FaFacebook,
} from "react-icons/fa";

const profileImage = "https://i.ibb.co.com/WNB6SvWV/jerin.png";
const libraImage = "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80"; 

const project1 = {
    title: "TourismFlow",
    description:
        "A modern tourism management app built with React, Node.js and MongoDB. It helps travelers discover curated itineraries, book experiences, and manage trip details with a clean UX.",
    liveLink: "https://tourism-flow.web.app", 
    githubLink: "https://github.com/JerinOnTheXplore/tourism-client", 
    image: "https://i.ibb.co.com/M59YHbmS/tour.png",
};

const project2 = {
    title: "Edumates",
    description:
        "Collaborative platform for group studies with real-time links, assignment sharing and peer review. Built with Socket/Realtime features and a simple classroom workflow.",
    liveLink: "https://online-group-study-e3eaf.web.app",
    githubLink: "https://github.com/JerinOnTheXplore/online-group-study-client", 
    image: "https://i.ibb.co.com/KzRHd0v8/online.png",
};

const social = {
    facebook: "https://www.facebook.com/share/1Ku5nmmifU/", 
    linkedin: "https://www.linkedin.com/in/nasrinjerin",
    github: "https://github.com/JerinOnTheXplore", 
    email: "jerinjerin101325@gmail.com", 
};

export default function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize AOS
        AOS.init({ duration: 1000, once: false });

        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-100">
                <div className="relative w-24 h-24 animate-spin">
                    <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
                    <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
                    <div className="absolute inset-8 w-8 h-8 bg-teal-600 rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-base-100 text-base-content py-24">
            {/* HERO */}
            <header className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-8" data-aos="fade-up">
                <div className="md:w-1/2">
                    <motion.h1
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-semibold text-teal-700"
                    >
                        About LibraNova
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mt-4 text-lg text-base-content max-w-xl"
                    >
                        Where stories meet creativity and technology. Libra Nova is a
                        reader-focused platform built to share thoughtful content with a
                        clean, modern reading experience.
                    </motion.p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-teal-700/10 text-teal-700 hover:bg-teal-700/20 px-4 py-2 rounded-lg border border-teal-100"
                        >
                            <FaLinkedin /> Connect on LinkedIn
                        </a>

                        <a
                            href={social.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
                        >
                            <FaGithub /> View Code
                        </a>
                    </div>
                </div>

                <motion.figure
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12, duration: 0.6 }}
                    className="md:w-1/2 flex justify-center"
                >
                    <img
                        src={libraImage}
                        alt="Libra Nova — reading and creative workspace"
                        className="rounded shadow-2xl w-full max-w-xl object-cover"
                    />
                </motion.figure>
            </header>

            {/* STORY + MISSION */}
            <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
                <div data-aos="fade-right">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-3">Our Story</h2>
                    <p className="text-base-content leading-relaxed mb-4">
                        Libra Nova began as a simple idea: to create a calm, welcoming space
                        where readers and thinkers could find meaningful articles without
                        the noise. Built from scratch by a single developer, it evolved into
                        a full-featured reading platform with category filters, search,
                        commenting, and a smooth, mobile-first UI.
                    </p>

                    <p className="text-base-content leading-relaxed">
                        The platform focuses on clarity and performance — the goal is to
                        let the content shine while providing modern features that readers
                        expect: responsive layouts, quick search, and organized categories.
                    </p>
                </div>

                <div className="space-y-4" data-aos="fade-left">
                    <div className="p-6 rounded-xl bg-base-200 shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
                                <FaFeatherAlt size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-teal-700">Mission</h3>
                                <p className="text-base-content mt-1">
                                    To make thoughtful content accessible and enjoyable for every
                                    reader — combining design, speed and clarity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-base-200 shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-lg text-teal-600">
                                <FaBookOpen size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-teal-700">Vision</h3>
                                <p className="text-base-content mt-1">
                                    To become a trusted home for writers and readers — a place to
                                    discover ideas and share quality writing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT THE CREATOR */}
            <section className="max-w-5xl mx-auto px-6 py-12">
                <div className="p-8 flex flex-col mx-auto  md:flex-row items-center gap-6" data-aos="fade-up">
                    <img
                        src={profileImage}
                        alt="Jerin — Creator"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-teal-600 shadow"
                    />
                    <div className="flex-1 px-2">
                        <h3 className="text-2xl font-bold text-teal-700">Behind the Code — Jerin</h3>
                        <p className="mt-2 text-base-content">
                            Hi, I’m <strong>Jerin</strong>, a frontend-focused web developer who loves
                            blending clean UI with practical features. I built Libra Nova to
                            showcase readable layouts, modern tooling (Next.js, React), and
                            developer-friendly architecture.
                        </p>

                        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-base-content">
                            <li>• Strong focus on accessibility & responsive design</li>
                            <li>• Tech stack: Next.js, React, TailwindCSS, Node, MongoDB</li>
                            <li>• Features built: Search, category filters, pagination</li>
                            <li>• Passion: readable UI, performance, and elegant code</li>
                        </ul>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 border border-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50"
                            >
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a
                                href={social.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-base-300 text-base-content px-4 py-2 rounded-lg hover:opacity-95"
                            >
                                <FaGithub /> GitHub
                            </a>
                            <a
                                href={social.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 border border-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-50"
                            >
                                <FaFacebook /> Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h3 className="text-2xl font-semibold text-teal-700 mb-6">Featured Projects</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Project 1 */}
                    <article className="bg-base-300 rounded shadow overflow-hidden" data-aos="fade-up">
                        <img src={project1.image} alt={project1.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h4 className="text-lg text-base-content font-bold">{project1.title}</h4>
                            <p className="mt-2 text-base-content">{project1.description}</p>
                            <div className="mt-4 flex gap-3">
                                <a
                                    href={project1.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded bg-teal-600 text-white inline-flex items-center gap-2"
                                >
                                    <FaGlobeAmericas /> Live
                                </a>
                                <a
                                    href={project1.githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded border border-gray-300 inline-flex items-center gap-2"
                                >
                                    <FaGithub /> Code
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* Project 2 */}
                    <article className="bg-base-300 rounded shadow overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                        <img src={project2.image} alt={project2.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h4 className="text-lg text-base-content font-bold">{project2.title}</h4>
                            <p className="mt-2 text-base-content">{project2.description}</p>
                            <div className="mt-4 flex gap-3">
                                <a
                                    href={project2.liveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded bg-teal-600 text-white inline-flex items-center gap-2"
                                >
                                    <FaGlobeAmericas /> Live
                                </a>
                                <a
                                    href={project2.githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2 rounded border border-gray-300 inline-flex items-center gap-2"
                                >
                                    <FaGithub /> Code
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* CONTACT / CTA */}
            <section className="py-14 px-6 mt-8 bg-base-200 text-base-content" data-aos="fade-up">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl text-base-content font-bold">Let’s build something meaningful</h3>
                        <p className="mt-2 text-base-content max-w-xl">
                            If you’re hiring, collaborating, or want to discuss an idea — I’d love to connect.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <a
                         href="https://mail.google.com/mail/?view=cm&fs=1&to=jerinjerin101325@gmail.com&su=Hello%20Jerin&body=I%20found%20your%20project%20amazing!"
                         target="_blank"
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 bg-base-300 text-teal-700 px-5 py-3 rounded font-semibold shadow hover:bg-teal-100 transition-colors"
                        >
                          <FaPaperPlane /> Contact Me
                        </a>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0">
                            <a href={social.facebook} target="_blank" rel="noreferrer" className="text-base-content hover:opacity-100">
                                <FaFacebook size={20} />
                            </a>
                            <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-base-content hover:opacity-100">
                                <FaLinkedin size={20} />
                            </a>
                            <a href={social.github} target="_blank" rel="noreferrer" className="text-base-content hover:opacity-100">
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
