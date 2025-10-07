"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // small device friendly
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="bg-base-100">
        <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-teal-600 font-bold text-center">
        Featured Books
      </h2>

      <div className="py-12 overflow-hidden">
        <Slider
          {...settings}
          className="relative"
          appendDots={(dots) => (
            <div className="mt-4">
              <ul className="flex justify-center gap-2">{dots}</ul>
            </div>
          )}
        >
          {books.map((book, idx) => (
            <div key={book.title + idx} className="px-2 py-12">
              <div className="bg-base-300 rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col h-[450px]">
                {/* Image */}
                <div className="overflow-hidden h-64">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Text */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 truncate text-base-content">{book.title}</h3>
                    <p className="text-base-content mb-1 truncate">By {book.author}</p>
                    <p className="text-base-content mb-2 text-sm truncate">{book.category}</p>
                  </div>
                  <div>
                    <p className="font-bold text-teal-600 mb-2">${book.price}</p>
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

export default FeaturedBooks;
