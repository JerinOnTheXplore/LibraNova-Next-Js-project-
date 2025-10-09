// app/books/BooksPageClient.jsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BooksPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat") || "all";

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books?category=${category}&page=${page}&limit=${perPage}`);
        const data = await res.json();
        setBooks(data.books);
        setTotalBooks(data.totalBooks);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, page]);

  const totalPages = Math.ceil(totalBooks / perPage);

  return (
    <section className="min-h-screen bg-base-100 py-16">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 drop-shadow-sm">
            {category === "all" ? "Our Collection" : `${category} Books`}
          </h1>
          <p className="mt-3 text-base-content max-w-2xl mx-auto">
            {category === "all"
              ? "Browse from a wide range of categories and start reading today."
              : `Explore the best ${category} books in our digital library.`}
          </p>
          <div className="mt-4 w-24 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-16">
            <div className="relative w-20 h-20 animate-spin">
              <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
              <div className="absolute inset-3 border-4 border-teal-400 rounded-full border-b-transparent"></div>
              <div className="absolute inset-7 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        )}

        {!loading && books.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No books found in this category.</p>
        )}

        {!loading && books.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((book, idx) => (
                <div key={book._id || idx} data-aos="fade-up">
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-10 flex-wrap">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
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
