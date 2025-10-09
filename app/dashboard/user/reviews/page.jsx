"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function ReviewsPage() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookMap, setBookMap] = useState({});
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        const userReviews = allReviews.filter(
          (r) => r.userEmail === currentUser.email
        );
        setReviews(userReviews);

        // fetch book titles for all reviews
        const map = {};
        for (const review of userReviews) {
          try {
            const res = await fetch(`/api/books/${review.bookId}`);
            if (res.ok) {
              const book = await res.json();
              map[review.bookId] = book.title;
            } else {
              map[review.bookId] = "Unknown Book";
            }
          } catch {
            map[review.bookId] = "Unknown Book";
          }
        }
        setBookMap(map);
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

    setReviews(reviews.filter((r) => r._id !== id));
  };

  if (loading) return <Loader/>;

  return (
    <div className="bg-base-100 pt-16 md:pt-20">
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-teal-600 text-center">
          My Reviews
        </h1>

        {reviews.length === 0 ? (
          <p className="text-base-content text-center">
            You have not written any reviews yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-lg shadow-sm bg-base-200 flex flex-col gap-2"
              >
                <h2 className="font-semibold text-lg text-teal-600">
                  {bookMap[review.bookId] || "Loading..."}
                </h2>
                <p className="text-base-content">{review.review}</p>
                <p className="text-sm text-base-content">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 w-fit"
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
