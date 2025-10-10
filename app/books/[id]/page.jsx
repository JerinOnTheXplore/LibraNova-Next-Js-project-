"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import BookActions from "@/components/BookActions";

export default function BookDetails({ params }) {
  const unwrappedParams = use(params); 
  const bookId = unwrappedParams.id;

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await fetch("/data/books.json");
        const allBooks = await res.json();

        // sssign IDs if missing
        const booksWithId = allBooks.map((b, idx) => ({
          _id: b._id || String(idx + 1),
          ...b,
        }));

        // Find main book
        const foundBook = booksWithId.find((b) => b._id === bookId);
        setBook(foundBook);

        if (foundBook) {
          // Related books
          const related = booksWithId
            .filter((b) => b.category === foundBook.category && b._id !== bookId)
            .slice(0, 4);
          setRelatedBooks(related);
        }

        // Fake reviews
        const fakeReviews = [
          { _id: "1", comment: "Great book!", user: "Reader 1" },
          { _id: "2", comment: "Loved the writing style.", user: "Reader 2" },
        ];
        setReviews(fakeReviews);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-20 h-20 animate-spin">
          <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
          <div className="absolute inset-3 border-4 border-teal-400 rounded-full border-b-transparent"></div>
          <div className="absolute inset-7 bg-teal-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Book not found!</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/books"
          className="inline-block mb-6 px-4 py-2 rounded-lg bg-base-200 text-base-content hover:bg-gray-300 transition"
        >
          ← Back
        </Link>

        <div className="bg-base-300 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl text-base-content font-bold mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-base-content mb-1">
                👤 Author: {book.author}
              </p>
              <p className="text-lg text-base-content mb-1">
                📚 Category: {book.category}
              </p>
              <p className="text-lg text-base-content mb-1">
                📖 Total Pages: {book.totalPages || "N/A"}
              </p>
              <p className="text-lg text-base-content mb-1">
                💰 Price: ${book.price}
              </p>
              <p className="mt-4 text-base-content">
                <b>Description:</b> {book.description}
              </p>
            </div>

            <BookActions book={book} />
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-base-content mb-6">
              Related Books
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((b) => (
                <Link key={b._id} href={`/books/${b._id}`}>
                  <div className="bg-base-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                    <div className="flex-1">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-base-content">{b.title}</h3>
                      <p className="text-sm text-base-content">by {b.author}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-base-content mb-6">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-base-200 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-base-content">{review.comment}</p>
                  <p className="text-sm text-base-content mt-2">
                    — {review.user || "Anonymous"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
