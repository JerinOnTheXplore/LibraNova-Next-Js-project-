//app>books>page.jsx

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";

export default function BooksPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const perPage = 8; // 8 books per page

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        let url = "/api/books";
        if (category) url += `?category=${category}`;
        const res = await fetch(url);
        const data = await res.json();
        setBooks(data);
        setPage(1); // reset page when category changes
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  // Current books to show
  const displayedBooks = books.slice(0, page * perPage);

  // Load more handler
  const handleLoadMore = () => setPage(page + 1);
  

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

        {/* Loading State */}
        {loading && (
          <p className="text-center text-teal-700 font-medium animate-pulse">
            Loading books...
          </p>
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
              {displayedBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* Load More Button */}
            {displayedBooks.length < books.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
