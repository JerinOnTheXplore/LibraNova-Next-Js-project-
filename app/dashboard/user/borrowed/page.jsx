"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import app from "@/utils/firebase";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader"; 

export default function BorrowedBooksPage() {
  const [borrowed, setBorrowed] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const auth = getAuth(app);

  useEffect(() => {
    // Firebase auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
        const filtered = stored.filter((b) => b.userEmail === currentUser.email);
        setBorrowed(filtered);
      }

      setLoading(false); //  user state  determined howar por loader off hoye jay..
    });

    return () => unsubscribe();
  }, [auth]);

  // show Loader while checking auth
  if (loading) {
    return <Loader />;
  }

  // handle return
  const handleReturn = (id) => {
    const updated = borrowed.filter((b) => b._id !== id);
    setBorrowed(updated);

    const stored = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const newStored = stored.filter((b) => b._id !== id);
    localStorage.setItem("borrowedBooks", JSON.stringify(newStored));

    toast.success("Book returned successfully!");
  };

  if (user === null) {
    return (
      <div className="flex flex-col bg-base-100 items-center justify-center min-h-[60vh] text-center ">
        <h2 className="text-xl font-semibold text-base-content">Please login to see your borrowed books.</h2>
      </div>
    );
  }

  if (borrowed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-base-100 pt-24">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
          alt="Empty"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-base-content">You haven't borrowed any books yet.</h2>
        <p className=" mt-2 text-base-content">Go back and borrow your first book!</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="p-6 pt-16 md:pt-20 max-w-7xl mx-auto bg-base-100">
        <Toaster position="top-right"/>
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">📚 My Borrowed Books</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowed.map((b) => (
            <div
              key={b._id}
              className="bg-base-200 text-base-content border rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-base-content">{b.bookTitle}</h3>
              <p className="text-sm text-base-content mt-1">
                Borrowed At:{" "}
                <span className="font-medium">{new Date(b.borrowedAt).toLocaleString()}</span>
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleReturn(b._id)}
                  className="px-3 py-1 text-sm rounded-lg bg-teal-500 text-white hover:bg-teal-600"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
