"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function AddReview({ bookId, bookTitle }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newReview = {
        _id: Date.now(),
        bookId,
        bookTitle,
        review: comment,
        userEmail: user?.email || "Anonymous",
        createdAt: new Date().toISOString(),
      };

      // save to localStorage
      const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      allReviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(allReviews));

      setComment("");
      setSuccessModal(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    setSuccessModal(false);
    router.push("/dashboard/user/reviews");
  };

  return (
    <>
      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-base-200 p-6 rounded-lg shadow-md"
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
          className="w-full textarea textarea-bordered text-base-content"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-base-100 p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">
              ✅ Review Submitted!
            </h2>
            <p className="mb-6 text-base-content">
              Thank you for sharing your feedback.
            </p>
            <button
              onClick={handleRedirect}
              className="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Go to My Reviews
            </button>
          </div>
        </div>
      )}
    </>
  );
}
