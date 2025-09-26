"use client";

import { useState } from "react";
import AddReview from "./AddReview";
import { getAuth } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function BookCard({ book }) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleBorrow = () => {
    if (!user) {
      alert("Please login to borrow books.");
      return;
    }

    // save in localStorage
    const borrowedBook = {
      _id: Date.now().toString(),
      bookId: book._id,
      bookTitle: book.title,
      userEmail: user.email,
      borrowedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    existing.push(borrowedBook);
    localStorage.setItem("borrowedBooks", JSON.stringify(existing));

    // show modal
    setShowModal(true);
  };

  const handleGoToBorrowed = () => {
    setShowModal(false);
    router.push("/dashboard/user/borrowed");
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

      {/* Borrow Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold text-teal-700 mb-3">🎉 Success!</h2>
            <p className="text-base-content mb-4">
              You have successfully borrowed <strong>{book.title}</strong>.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-base-100 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleGoToBorrowed}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Go to My Borrowed Books
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
