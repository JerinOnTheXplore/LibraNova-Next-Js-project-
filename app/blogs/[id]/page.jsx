"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaUser, FaComments, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const BlogDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        const found = data.find((b) => b.id === parseInt(id));
        setCurrentBlog(found);
        setLoading(false); // stop loading after data fetch
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const saved = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(saved);
  }, [id]);

  // initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, [blogs]);

  // filter blogs based on category and search term
  useEffect(() => {
    let filtered = [...blogs];

    if (selectedCategory) {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);

    if (filtered.length > 0) setCurrentBlog(filtered[0]);
  }, [selectedCategory, searchTerm, blogs]);

  const handleCategoryClick = (cat) => setSelectedCategory(cat);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const newComment = {
      name,
      email,
      message,
      blogId: currentBlog.id,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
    form.reset();
  };

  if (loading || !currentBlog) {
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

  const filteredComments = comments.filter((c) => c.blogId === currentBlog.id);

  const categories = ["Adventure", "Education", "Modern Fiction", "Contemporary", "Art and Literature"];

  return (
    <div className="bg-base-100">
      <section className="max-w-6xl mx-auto px-4 py-36 flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-2/3">
          {/* Back Button */}
          <div className="w-full mb-6">
            <button
              onClick={() => router.back()}
              className="bg-base-200 text-base-content px-4 py-2 rounded"
            >
              &larr; Back
            </button>
          </div>

          <div data-aos="fade-up">
            <img
              src={currentBlog.images[0]}
              alt={currentBlog.title}
              className="rounded mb-6 w-full h-80 object-cover"
            />
            <div className="flex justify-between text-base-content text-sm mb-4">
              <span className="flex items-center text-base-content gap-2">
                <FaUser /> {currentBlog.admin}
              </span>
              <span className="flex items-center text-base-content gap-2">
                <FaComments /> 2{currentBlog.comments} comments
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-base-content">{currentBlog.title}</h1>
            <p className="text-base-content leading-relaxed mb-6">{currentBlog.description}</p>

            <div className="flex gap-4 mb-6">
              <img src={currentBlog.images[1]} alt="" className="w-1/2 rounded object-cover" data-aos="fade-right" />
              <img src={currentBlog.images[2]} alt="" className="w-1/2 rounded object-cover" data-aos="fade-left" />
            </div>

            <p className="text-base-content mb-6">{currentBlog.conclusion}</p>

            <div className="flex items-center gap-4 mb-8">
              <FaFacebook className="text-blue-600 text-xl cursor-pointer" />
              <FaTwitter className="text-sky-500 text-xl cursor-pointer" />
              <FaLinkedin className="text-blue-700 text-xl cursor-pointer" />
            </div>

            {/* Comments */}
            <div className="mb-8" data-aos="fade-up">
              <h2 className="text-xl font-semibold text-base-content mb-4">Comments</h2>
              <div className="bg-base-300 text-base-content p-4 rounded mb-3">
                <p><strong>Sarah:</strong> Great insights! Really enjoyed this read.</p>
              </div>
              <div className="bg-base-300 p-4 text-base-content rounded mb-3">
                <p><strong>David:</strong> Looking forward to more such articles!</p>
              </div>
              {filteredComments.map((c, i) => (
                <div key={i} className="bg-base-300 p-4 rounded mb-3 text-base-content">
                  <p><strong>{c.name}:</strong> {c.message}</p>
                </div>
              ))}
            </div>

            {/* Leave a Comment */}
            <form onSubmit={handleComment} className="bg-base-100 p-6 rounded-lg" data-aos="fade-up">
              <h2 className="text-xl font-semibold text-base-content  mb-4">Leave a Comment</h2>
              <input name="name" required placeholder="Your Name" className="w-full mb-3 border p-2 rounded text-base-content" />
              <input name="email" required type="email" placeholder="Your Email" className="w-full mb-3 border p-2 rounded text-base-content" />
              <textarea name="message" required rows="4" placeholder="Your Message" className="w-full mb-3 border p-2 rounded text-base-content"></textarea>
              <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded">Submit</button>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          {/* Search */}
          <div data-aos="fade-left">
            <h3 className="text-lg font-semibold text-base-content mb-2">Search</h3>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="w-full border p-2 rounded text-base-content"
            />
          </div>

          {/* Categories */}
          <div data-aos="fade-left" data-aos-delay="100">
            <h3 className="text-lg font-semibold text-base-content mb-3">Categories</h3>
            <ul className="space-y-2 text-teal-700">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="hover:bg-teal-200 p-2 rounded-sm cursor-pointer"
                  onClick={() => {
                    handleCategoryClick(cat); 
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h3 className="text-lg font-semibold text-base-content mb-3">Recent Posts</h3>
            <div className="flex flex-col gap-3">
              {(filteredBlogs.length > 0 ? filteredBlogs.slice(0, 3) : blogs.slice(0, 3)).map((b) => (
                <div key={b.id} data-aos="fade-up" className="flex gap-3 items-center cursor-pointer" onClick={() => setCurrentBlog(b)}>
                  <img src={b.images[0]} alt="" className="w-20 h-16 rounded object-cover" />
                  <div>
                    <p className="text-xs text-base-content">{b.date}</p>
                    <p className="text-sm font-medium text-base-content">{b.title}</p>
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

export default BlogDetails;
