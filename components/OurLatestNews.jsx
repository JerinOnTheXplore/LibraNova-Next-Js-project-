"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaUser, FaArrowRight } from "react-icons/fa";

const OurLatestNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
    
    // Load saved page from localStorage
    const savedPage = localStorage.getItem("latestNewsPage");
    if (savedPage) setCurrentPage(parseInt(savedPage));
  }, []);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("latestNewsPage", page); // Save page to localStorage
  };

  return (
    <div className="bg-base-100">
     <section className="py-16 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-teal-600">Our Latest News</h2>
        <p className="text-base-content mt-2">
          Stay updated with our latest insights, events, and literary discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-12">
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-base-300 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={blog.images[0]}
              alt={blog.title}
              className="rounded-lg h-48 object-cover mb-4"
            />
            <div className="flex justify-between text-sm text-base-content mb-2">
              <span>{blog.date}</span>
              <span className="flex items-center gap-1 text-base-content">
                <FaUser />by {blog.admin}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-base-content">{blog.title}</h3>
            <Link
              href={`/blogs/${blog.id}`}
              className="text-teal-600 flex items-center gap-2 mt-auto hover:underline"
            >
              Read More <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === i + 1
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
    </div>
  );
};

export default OurLatestNews;
