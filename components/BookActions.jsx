"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/utils/stripe";
import AddReview from "./AddReview";

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

      if (error) toast.error(error.message);
      else if (paymentIntent && paymentIntent.status === "succeeded") {
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
    } catch {
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/20 p-3 rounded-md">
      <CardElement className="p-3 border text-base-content rounded-md" />
      <div className="flex justify-center gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-600 text-white">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          Pay Now
        </button>
      </div>
    </form>
  );
}

export default function BookActions({ book }) {
  
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  return (
    <div className="mt-8">
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={handleBorrow} className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          Borrow
        </button>
        <button
          onClick={handlePay}
          className="flex-1 px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white"
        >
          Pay
        </button>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex-1 px-4 py-2 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white"
        >
          Review
        </button>
      </div>

      {showReviewForm && <AddReview bookId={book._id} />}

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg p-6 text-center w-96">
            <h2 className="text-xl font-bold text-teal-700 mb-3">🎉 Success!</h2>
            <p className="mb-4">You have successfully borrowed <strong>{book.title}</strong>.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowBorrowModal(false)} className="px-4 py-2 bg-base-100 rounded-lg hover:bg-gray-300">
                Close
              </button>
              <button onClick={handleGoToBorrowed} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                Go to My Borrowed Books
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg p-6 text-center w-96">
            <h2 className="text-xl font-bold text-teal-700 mb-3">💳 Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm book={book} user={user} onSuccess={handlePaymentSuccess} onCancel={() => setShowPayModal(false)} />
            </Elements>
          </div>
        </div>
      )}

      {/* payment success modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg p-6 text-center w-96">
            <h2 className="text-xl font-bold text-teal-700 mb-3">🎉 Payment Successful!</h2>
            <p className="mb-4">You have successfully paid for <strong>{book.title}</strong>.</p>
            <button onClick={handleGoToPayments} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Go to My Payments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
