"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe("NEXT_PUBLIC_STRIPE_PUBLIC_KEY");

function CheckoutForm({ book, user, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Simulate payment success
    setTimeout(() => {
      const payment = {
        _id: Date.now().toString(),
        bookId: book._id,
        bookTitle: book.title,
        amount: book.price,
        userEmail: user.email,
        paidAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem("payments")) || [];
      existing.push(payment);
      localStorage.setItem("payments", JSON.stringify(existing));

      toast.success("Payment successful!");
      setLoading(false);
      onClose();
      router.push("/dashboard/user/payments");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Pay ${book.price} for "{book.title}"
      </h3>
      <CardElement className="p-3 border rounded-lg" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentModal({ book, user, onClose }) {
  return (
    <div className="fixed inset-0 bg-base-100 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-200 rounded-lg shadow-lg p-6 w-96">
        <Elements stripe={stripePromise}>
          <CheckoutForm book={book} user={user} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}
