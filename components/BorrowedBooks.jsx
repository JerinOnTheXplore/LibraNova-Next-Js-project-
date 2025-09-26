"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/utils/firebase";

export default function BorrowedBooks() {
  const [borrowed, setBorrowed] = useState([]);
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    try {
      const stored = localStorage.getItem("borrowedBooks");
      if (stored) {
        const all = JSON.parse(stored);
        const filtered = all.filter((b) => b.userEmail === user.email);
        setBorrowed(filtered);
      }
    } catch (err) {
      console.error("Error parsing borrowedBooks:", err);
    }
  }, [user]);

  if (!user) return <p>Please login to see your borrowed books.</p>;
  if (borrowed.length === 0) return <p>You haven't borrowed any books yet.</p>;

  return (
    <div className="bg-base-200 text-base-content">
      <h1 className="text-2xl font-bold  mb-6 pt-36">Borrowed Books</h1>
      <ul className="space-y-4">
        {borrowed.map((b) => (
          <li key={b._id} className="p-4 border rounded-lg">
            <p><strong>Title:</strong> {b.bookTitle}</p>
            <p><strong>Borrowed At:</strong> {new Date(b.borrowedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
