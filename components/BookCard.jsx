"use client";

import { useState } from "react";
import AddReview from "./AddReview";
import { getAuth } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";

function PaymentForm({ book, user, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: book.price }),
      });
      const { client_secret } = await res.json();

      const card = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        const payment = {
          _id: Date.now().toString(),
          bookId: book._id,
          bookTitle: book.title,
          userEmail: user.email,
          amount: book.price,
          paidAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem("payments")) || [];
        existing.push(payment);
        localStorage.setItem("payments", JSON.stringify(existing));

        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (err) {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex bg-white/20 pb-5 flex-col gap-4">
      <CardElement className="p-3 border text-base-content rounded-md mb-4" />
      <div className="flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
}

export default function BookCard({ book }) {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleBorrow = () => {
    if (!user) return toast.error("Please login to borrow books.");
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
    setShowBorrowModal(true);
  };

  const handleGoToBorrowed = () => {
    setShowBorrowModal(false);
    router.push("/dashboard/user/borrowed");
  };

  const handlePay = () => {
    if (!user) return toast.error("Please login to pay for books.");
    setShowPayModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayModal(false);
    setShowSuccessModal(true);
  };

  const handleGoToPayments = () => {
    setShowSuccessModal(false);
    router.push("/dashboard/user/payments");
  };

  const handleViewDetails = () => router.push(`/books/${book._id}`);

  return (
    <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden flex flex-col relative">
      <Toaster position="top-right" />

      {/* Rejected Badge */}
      {book.status === "rejected" && (
        <span className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded">
          Rejected
        </span>
      )}

      <img
        src={book.image}
        alt={book.title}
        className="w-full h-56 object-cover md:h-64 lg:h-72"
      />

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg overflow-ellipsis">{book.title}</h3>
          <p className="text-sm text-base-content">by {book.author}</p>
          <p className="text-sm mt-2">{book.category}</p>
          <p className="text-teal-600 font-semibold mt-2">${book.price}</p>
        </div>

        <div>
          <button
            onClick={handleViewDetails}
            className="flex-1 w-full px-3 py-2 border border-gray-500 text-base-content rounded-lg hover:bg-gray-500 hover:text-white transition mt-2"
          >
            View Details
          </button>

          {/* Borrow, Pay, Review buttons gulo hide kore jodi rejected hoy */}
          {book.status !== "rejected" && (
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
          )}
        </div>

        {showReviewForm && (
          <div className="mt-4">
            <AddReview bookId={book._id} />
          </div>
        )}
      </div>

      {/* Borrow Success Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold text-teal-700 mb-3">🎉 Success!</h2>
            <p className="text-base-content mb-4">
              You have successfully borrowed <strong>{book.title}</strong>.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowBorrowModal(false)}
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

      {/* Stripe Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center  justify-center z-50">
          <div className="bg-base-200 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold text-teal-700 mb-3">💳 Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm
                book={book}
                user={user}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPayModal(false)}
              />
            </Elements>
          </div>
        </div>
      )}

      {/* Payment Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-bold text-teal-700 mb-3">
              🎉 Payment Successful!
            </h2>
            <p className="text-base-content mb-4">
              You have successfully paid for <strong>{book.title}</strong>.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleGoToPayments}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Go to My Payments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
