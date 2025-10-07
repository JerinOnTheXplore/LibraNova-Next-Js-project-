"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReadersFeedback = () => {
  const [readers, setReaders] = useState([]);

  useEffect(() => {
    fetch("/data/readers.json")
      .then((res) => res.json())
      .then((data) => setReaders(data))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="bg-base-100 text-base-content">
        <section className="py-12 px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-teal-600">
        What Our Readers Say
      </h2>

      <div className="overflow-hidden pt-12">
        <Slider
        {...settings}
        className="relative text-shadow-base-content"
        appendDots={(dots) => (
          <div className="mt-4">
            <ul className="flex justify-center gap-2 text-base-content">{dots}</ul>
          </div>
        )}
      >
        {readers.map((reader) => (
          <div key={reader.id} className="p-2">
            <div className="bg-base-300 border-t-2 border-teal-600 rounded shadow-lg p-6 flex flex-col justify-between h-[380px]">
              
              {/* Feedback */}
              <p className="text-base-content italic leading-relaxed mb-6 line-clamp-5">
                “{reader.feedback}”
              </p>

              {/* Reader Info */}
              <div className="flex items-center gap-4 mt-auto overflow-hidden">
                <img
                  src={reader.image}
                  alt={reader.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-teal-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-base-content">{reader.name}</h3>
                  <p className=" text-sm mb-1 text-base-content">{reader.profession}</p>
                  <div className="flex text-yellow-500">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </section>
    </div>
  );
};

export default ReadersFeedback;
