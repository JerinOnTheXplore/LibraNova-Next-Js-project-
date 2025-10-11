"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

// custom arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-white bg-teal-700 p-2 rounded-full hover:bg-teal-600 transition absolute -right-5 top-1/2 transform -translate-y-1/2 z-10"
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-white bg-teal-700 p-2 rounded-full hover:bg-teal-600 transition absolute -left-5 top-1/2 transform -translate-y-1/2 z-10"
  >
    <FaArrowLeft />
  </button>
);

const TopCategories = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));

    // initialize AOS
    AOS.init({ duration: 1000, once: false });
  }, []);

  if (books.length === 0) return null;

  const selectedBook = books[selectedIndex];

  // Slick Settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setSelectedIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, centerMode: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, centerMode: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3, centerMode: true },
      },
    ],
  };

  return (
    <div className="bg-base-100 overflow-x-hidden">
      <section className="mx-auto">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl text-teal-600 font-bold text-center "
        >
          Explore by Category
        </h2>
        <div className="flex flex-col lg:flex-row py-16 ">
          {/* Left Side: Slider */}
          <div
            data-aos="fade-right"
            className="bg-teal-600 relative flex flex-col items-center py-16 lg:py-36 px-12 w-full lg:w-1/2"
          >
            <div className="w-full relative">
              <Slider {...sliderSettings}>
                {books.map((book, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={book.id || idx}
                      className={`cursor-pointer transition-transform duration-500 ${
                        isSelected ? "scale-120 py-8" : "scale-90 opacity-80"
                      }`}
                      onClick={() => setSelectedIndex(idx)}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className={`mx-auto rounded border-4 ${
                          isSelected ? "border-stone-50" : "border-transparent"
                        } shadow-md w-[140px] h-[180px] object-cover`}
                      />
                      <p className="text-center text-base-content mt-2 font-medium text-base">
                        {book.category}
                      </p>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>

          {/* Right Side: Selected Book Info */}
          {selectedBook && (
            <div
              data-aos="fade-left"
              className="flex-1 bg-base-300 p-8 shadow-lg flex flex-col lg:justify-evenly"
            >
              <h3 className="text-2xl text-teal-600 font-bold">
                {selectedBook.category} Category
              </h3>
              <div className="border-t-1 border-dashed border-teal-600 mt-2"></div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl text-base-content font-normal">
                    <span className="font-semibold">Title:</span>
                    <br />
                    {selectedBook.title}
                  </h4>
                  <span className="text-base-content font-medium">Page: 120</span>
                </div>
                <h5 className="text-base-content font-semibold">
                  Author:
                  <br />
                  <span className="font-normal">{selectedBook.author}</span>
                </h5>
                <p className="text-base-content mt-2">
                  {selectedBook.description || "No description available for this category."}
                </p>
                <div className="flex text-yellow-500 mt-2 font-bold space-x-1">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>

              <Link
                href={`/books/${selectedBook._id}`}
                className="mt-4 inline-block bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 transition w-fit"
              >
                See The Book
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopCategories;
