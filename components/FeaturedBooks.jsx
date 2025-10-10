"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import toast, { Toaster } from "react-hot-toast";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // Load books
  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Load favourites from localStorage
  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFav);
  }, []);

  // handle favourite toggle
  const handleFavourite = (book) => {
    let updatedFav;
    if (favourites.some((b) => b.title === book.title)) {
      // already in favourites, remove
      updatedFav = favourites.filter((b) => b.title !== book.title);
      toast.success(`Removed "${book.title}" from favourites!`);
    } else {
      updatedFav = [...favourites, book];
      toast.success(`Added "${book.title}" to favourites!`);
    }
    setFavourites(updatedFav);
    localStorage.setItem("favourites", JSON.stringify(updatedFav));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-base-100">
      <Toaster position="top-right" />
      <section className="py-16 md:py-20  max-w-7xl mx-auto">
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
              <div key={book.title + idx} className="px-2 py-12 relative">
                <div className="bg-base-300 rounded shadow-lg overflow-hidden cursor-pointer flex flex-col h-[450px] relative">
                  {/* Favourite Heart Icon */}
                  <button
                    onClick={() => handleFavourite(book)}
                    className={`absolute top-2 right-2 z-10 p-2 rounded transition-colors ${
                      favourites.some((b) => b.title === book.title)
                        ? "bg-teal-600 text-white"
                        : "bg-white text-teal-600"
                    }`}
                    aria-label="Add to favourites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        favourites.some((b) => b.title === book.title)
                          ? "currentColor"
                          : "none"
                      }
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

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
                      <h3 className="font-semibold text-lg mb-1 truncate text-base-content">
                        {book.title}
                      </h3>
                      <p className="text-base-content mb-1 truncate">
                        By {book.author}
                      </p>
                      <p className="text-base-content mb-2 text-sm truncate">
                        {book.category}
                      </p>
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
