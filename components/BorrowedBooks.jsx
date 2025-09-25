"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/utils/firebase";

export default function BorrowedBooks() {
  const [borrowed, setBorrowed] = useState([]);
  const auth = getAuth(app);
  const user = auth.currentUser;

  const fetchBorrowed = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/borrowed?email=${user.email}`);
      const data = await res.json();
      setBorrowed(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, [user]);

  if (!user) return <p>Please login to see your borrowed books.</p>;
  if (borrowed.length === 0) return <p>You haven't borrowed any books yet.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Borrowed Books</h1>
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
