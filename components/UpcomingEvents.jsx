"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const events = [
  {
    id: 1,
    title: "Exploring Modern Literature",
    description:
      "Join us for an interactive discussion on how modern authors are shaping contemporary storytelling with bold ideas and diverse voices.",
    date: "October 18, 2025",
    time: "4:00 PM - 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Tech Trends in Publishing",
    description:
      "Discover how AI, eBooks, and self-publishing platforms are transforming the publishing industry — and what authors need to know.",
    date: "October 25, 2025",
    time: "5:30 PM - 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80",
  },
];

const UpcomingEvents = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="bg-base-100">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-center text-teal-600 mb-10">
            Upcoming Events
          </h2>
          <p className="text-center text-base-content max-w-2xl mx-auto mb-16">
            Stay tuned for exciting book-related events, author meetups, and
            insightful sessions to broaden your literary horizons.
          </p>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left Side: Decorative Book Image */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="w-full lg:w-1/2"
            >
              <Image
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                alt="Books Event"
                width={800}
                height={600}
                className="rounded shadow-lg object-cover mx-auto"
                priority
              />
            </div>

            {/* Right Side: Events List */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  data-aos="fade-up"
                  data-aos-delay={150 + index * 150}
                  className="bg-base-300 rounded shadow-md border-t-2 border-teal-600 overflow-hidden transition hover:shadow-lg"
                >
                  {/* Top bar with date & time */}
                  <div className="flex justify-between items-center bg-teal-50 px-5 py-2 text-teal-700 text-sm font-medium">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>

                  {/* Event Card Content */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full sm:w-36 h-36 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-base-content">
                        {event.title}
                      </h3>
                      <p className="text-base-content text-sm mt-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingEvents;
