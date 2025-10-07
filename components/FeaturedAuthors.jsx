"use client";

import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//Custom Arrows (Centered on Image)
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-teal-700/90 hover:bg-teal-600 text-white p-3 rounded-full z-20 shadow-lg backdrop-blur-sm transition"
  >
    <FaArrowRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-teal-700/90 hover:bg-teal-600 text-white p-3 rounded-full z-20 shadow-lg backdrop-blur-sm transition"
  >
    <FaArrowLeft size={18} />
  </button>
);

const FeaturedAuthors = () => {
  //Hooks
  const [authors, setAuthors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("fictional");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef(null);

  //Fetch authors.json
  useEffect(() => {
    fetch("/data/authors.json")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredAuthors = authors.filter(
    (a) => a.category === selectedCategory
  );

  //Reset index on category change
  useEffect(() => {
    setSelectedIndex(0);
    sliderRef.current?.slickGoTo(0);
  }, [selectedCategory]);

  if (authors.length === 0) return null;

  const categories = [
    "fictional",
    "nonfictional",
    "novel",
    "technology",
    "science",
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
    beforeChange: (_, next) => setSelectedIndex(next),
  };

  return (
    <div className="bg-base-100">
        <section className="py-16">
      <h2 className="text-3xl font-bold text-base-content text-center mb-8">
        Featured Author of the Month
      </h2>

      <div className="flex flex-col lg:flex-row py-16">
        {/* Left Side: Categories */}
        <div className="w-full lg:w-2/5 bg-teal-600  p-6 py-12 flex flex-col gap-6 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-4 rounded text-white font-medium transition ${
                selectedCategory === cat
                  ? "bg-teal-700 scale-105"
                  : "bg-teal-600 hover:bg-teal-500 scale-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Middle: Image Slider */}
        <div className="w-full lg:w-1/5 relative ">
          <Slider ref={sliderRef} {...sliderSettings}>
            {filteredAuthors.map((author, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={author.id}
                  className="flex justify-center cursor-pointer relative"
                >
                  <img
                    src={author.image}
                    alt={author.name}
                    className={`w-60 h-80 flex-2 mx-auto lg:w-80 lg:h-100 object-cover border-4 shadow-lg transition-transform duration-500 ${
                      isActive
                        ? "border-white scale-110"
                        : "border-transparent scale-90 opacity-80"
                    }`}
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        {/* Right Side: Author Info */}
        <div className="w-full lg:w-2/5 bg-base-300  shadow-lg p-6 flex flex-col gap-3 transition-all duration-500">
          {filteredAuthors[selectedIndex] && (
            <>
              <h3 className="text-2xl font-bold text-base-content">
                {filteredAuthors[selectedIndex].name}
              </h3>
              <p className="text-teal-600 font-medium ">
                {filteredAuthors[selectedIndex].position}
              </p>
              <div className="border-t-4 border-teal-600 w-16 my-2"></div>
              <p className="text-base-content">
                {filteredAuthors[selectedIndex].description}
              </p>
              <div className="mt-2 text-base-content space-y-1">
                <p>
                  <strong>Books:</strong>{" "}
                  {filteredAuthors[selectedIndex].bookcount}
                </p>
                <p>
                  <strong>Born:</strong> {filteredAuthors[selectedIndex].born}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {filteredAuthors[selectedIndex].category}
                </p>
                <p>
                  <strong>Language:</strong>{" "}
                  {filteredAuthors[selectedIndex].language}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
    </div>
  );
};

export default FeaturedAuthors;
