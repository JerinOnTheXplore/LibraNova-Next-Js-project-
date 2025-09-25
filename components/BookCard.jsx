"use client";

import { useState } from "react";
import AddReview from "./AddReview";
import { getAuth } from "firebase/auth";
import app from "@/utils/firebase";

export default function BookCard({ book, onBorrow }) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleBorrow = async () => {
    if (!user) {
      alert("Please login to borrow books.");
      return;
    }

    try {
      const res = await fetch("/api/borrowed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          userEmail: user.email,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to borrow book");

      alert("Book borrowed successfully!");
      if (onBorrow) onBorrow(); // callback for parent to refresh borrowed books
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePay = () => {
    alert("Payment functionality not implemented yet!");
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Book Image */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-56 object-cover md:h-64 lg:h-72"
      />

      {/* Book Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-500">by {book.author}</p>
          <p className="text-sm mt-2">{book.category}</p>
          <p className="text-teal-600 font-semibold mt-2">${book.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-2">
          <button
            onClick={handleBorrow}
            className="flex-1 min-w-[100px] px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            Borrow
          </button>
          <button
            onClick={handlePay}
            className="flex-1 min-w-[100px] px-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
          >
            Pay
          </button>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex-1 min-w-[100px] px-3 py-2 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition"
          >
            Review
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mt-4">
            <AddReview bookId={book._id} />
          </div>
        )}
      </div>
    </div>
  );
}
