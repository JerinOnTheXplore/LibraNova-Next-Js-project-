"use client";

import CountUp from "react-countup";
import { FaBookOpen, FaUserFriends, FaStar, FaFeatherAlt } from "react-icons/fa";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  {
    id: 1,
    icon: <FaBookOpen className="text-4xl text-teal-600" />,
    title: "Books Available",
    value: 1250,
  },
  {
    id: 2,
    icon: <FaUserFriends className="text-4xl text-teal-600" />,
    title: "Readers",
    value: 8750,
  },
  {
    id: 3,
    icon: <FaStar className="text-4xl text-teal-600" />,
    title: "Positive Reviews",
    value: 3240,
  },
  {
    id: 4,
    icon: <FaFeatherAlt className="text-4xl text-teal-600" />,
    title: "Active Authors",
    value: 150,
  },
];

const StatsSection = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section className="py-12 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-teal-600">
        Our Achievements
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 pt-12">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="bg-base-300 shadow-md rounded py-10 flex flex-col items-center border-t-2 border-teal-600 hover:shadow-lg transition"
          >
            {stat.icon}
            <h3 className="text-4xl font-bold text-base-content mt-4">
              <CountUp end={stat.value} duration={60} separator="," />
            </h3>
            <p className="text-base-content mt-2 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
