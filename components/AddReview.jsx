"use client";
import { useState } from "react";

export default function AddReview({ bookId }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false); // modal state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, comment, user: "Anonymous" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit review");
      }

      setComment(""); //  comment reset kore dey
      setSuccessModal(true); // eta modal show kore
    } catch (err) {
      console.error(err);
      alert(err.message); //alert hishebe error message dejhabe
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mt-6 bg-base-200 p-6 rounded-lg">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
          className="w-full textarea text-base-content textarea-bordered"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-40 z-50">
          <div className="bg-base-100 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-teal-700 mb-4">Review Submitted!</h2>
            <p className="mb-6 text-base-content">Thank you for sharing your feedback.</p>
            <button
              onClick={() => setSuccessModal(false)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
