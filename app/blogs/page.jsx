"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = ["Adventure", "Education", "Modern Fiction", "Contemporary", "Art and Literature"];
const postsPerPage = 4;

export default function BlogList() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Initialize currentPage from localStorage on first render
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("currentPage")) || 1;
    }
    return 1;
  });

  // Load blogs
  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage]);

  // initialize AOS.........
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, [blogs]);

  // filter blogs based on category and search term...
  useEffect(() => {
    let tempBlogs = [...blogs];
    if (selectedCategory) {
      tempBlogs = tempBlogs.filter((b) => b.category === selectedCategory);
    }
    if (searchTerm) {
      tempBlogs = tempBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBlogs(tempBlogs);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, blogs]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

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
    <div className="bg-base-100">
      <section className="py-36 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-base-content text-center mb-4">Our Latest News</h2>
        <p className="text-center text-base-content mb-8">
          Stay updated with our latest blogs, events, and insights.
        </p>

        {/* back Button */}
        <div className="w-full mb-6">
          <button
            onClick={() => router.back()}
            className="bg-base-200 text-base-content px-4 py-2 rounded"
          >
            &larr; Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 px-4">
          {/* left Side: blog cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentBlogs.map((blog) => (
              <div key={blog.id} data-aos="fade-up" className="bg-base-300 rounded-xl shadow-lg overflow-hidden">
                <img
                  src={blog.images[0]} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between text-base-content text-sm mb-2">
                    <span>{blog.date}</span>
                    <span>by {blog.admin}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-base-content">{blog.title}</h3>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-teal-600 flex items-center gap-2 mt-auto font-medium hover:underline"
                  >
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Search */}
            <div data-aos="fade-left">
              <h4 className="font-semibold mb-2 text-base-content">Search</h4>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs..."
                className="w-full border p-2 rounded text-base-content"
              />
            </div>

            {/* Categories */}
            <div data-aos="fade-left" data-aos-delay="100">
              <h4 className="font-semibold mb-2 text-base-content">Categories</h4>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`text-left py-1 px-2 rounded hover:bg-teal-100 transition hover:text-gray-700 ${
                      selectedCategory === cat ? "bg-teal-900 text-stone-50" : "bg-teal-700 text-stone-50"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div data-aos="fade-left" data-aos-delay="200">
              <h4 className="font-semibold mb-2 text-base-content">Recent Posts</h4>
              <div className="flex flex-col gap-3">
                {blogs.slice(0, 3).map((blog) => (
                  <div key={blog.id} data-aos="fade-up" className="flex gap-2 bg-base-300 p-2 rounded">
                    <img
                      src={blog.images[0]} 
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <span className="text-base-content text-xs">{blog.date}</span>
                      <h5 className="font-medium text-base-content text-sm">{blog.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-teal-600 text-gray-800" : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
