"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // user er review gulo filter kore
        const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        const userReviews = allReviews.filter(
          (r) => r.userEmail === currentUser.email
        );
        setReviews(userReviews);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleDelete = (id) => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updated = allReviews.filter((r) => r._id !== id);
    localStorage.setItem("reviews", JSON.stringify(updated));

    // update state
    setReviews(reviews.filter((r) => r._id !== id));
  };

  if (loading) return null;

  return (
    <div className="bg-base-100 pt-24 md:pt-36">
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-teal-600 text-center">
          My Reviews
        </h1>

        {reviews.length === 0 ? (
          <p className="text-base-content text-center">
            You have not written any reviews yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-lg shadow-sm bg-base-200 flex flex-col gap-2"
              >
                <h2 className="font-semibold text-lg text-teal-600">
                  {review.title}
                </h2>
                <p className="text-base-content">{review.review}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-fit"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
