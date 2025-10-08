"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let url = "/api/books";
        if (category) url += `?category=${category}`;
        const res = await fetch(url);
        const data = await res.json();
        setBooks(data);

        const savedPage = localStorage.getItem(`booksPage_${category || "all"}`);
        setPage(savedPage ? parseInt(savedPage) : 1);
      } catch (err) {
        console.error("❌ Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  // Pagination logic
  const totalPages = Math.ceil(books.length / perPage);
  const displayedBooks = books.slice((page - 1) * perPage, page * perPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem(`booksPage_${category || "all"}`, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 drop-shadow-sm">
            {category ? `${category} Books` : "Our Collection"}
          </h1>
          <p className="mt-3 text-base-content max-w-2xl mx-auto">
            {category
              ? `Explore the best ${category} books in our digital library.`
              : "Browse from a wide range of categories and start reading today."}
          </p>
          <div className="mt-4 w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-16">
            <div className="relative w-20 h-20 animate-spin">
              {/* outer ring */}
              <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
              {/* inner ring */}
              <div className="absolute inset-3 border-4 border-teal-400 rounded-full border-b-transparent"></div>
              {/* center dot */}
              <div className="absolute inset-7 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        )}

        {/* No Books */}
        {!loading && books.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No books found in this category.
          </p>
        )}

        {/* Book Grid */}
        {!loading && displayedBooks.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayedBooks.map((book, idx) => (
                <div key={book._id || idx} data-aos="fade-up">
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-10 flex-wrap">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-lg border transition ${
                      page === i + 1
                        ? "bg-teal-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
