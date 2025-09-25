"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// MongoDB theke fetch 
async function fetchBook(title) {
  const res = await fetch(`/api/books?title=${encodeURIComponent(title)}`);
  const books = await res.json();
  return books[0] || null;
}

export default function BookDetails({ params }) {
  const { bookTitle } = params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook(bookTitle).then(setBook);
  }, [bookTitle]);

  if (!book) return <p className="p-6 text-center">Loading or Book not found...</p>;

  const handleBorrow = () => alert(`Borrowed "${book.title}"`);
  const handlePay = () => alert(`Paid for "${book.title}"`);
  const handleReview = () => alert(`Review submitted for "${book.title}"`);

  
  const price = book.price?.$numberDouble ? parseFloat(book.price.$numberDouble) : book.price;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Book Cover */}
      <div className="relative w-full md:w-1/3 h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={book.image || "/images/book1.png"}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Book Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{book.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{book.author}</p>
        {book.description && <p className="text-gray-700 dark:text-gray-200">{book.description}</p>}
        <p className="text-teal-600 font-semibold text-lg">${price}</p>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <button
            onClick={handleBorrow}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            Borrow
          </button>
          <button
            onClick={handlePay}
            className="px-4 py-2 rounded-lg border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition"
          >
            Pay
          </button>
          <button
            onClick={handleReview}
            className="px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
