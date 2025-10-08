"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader"; 

export default function ApproveBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, action: null, book: null });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("/api/admin/books");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const openModal = (book, action) => setModal({ open: true, action, book });
  const closeModal = () => setModal({ open: false, action: null, book: null });

  const handleAction = async () => {
    const { book, action } = modal;
    if (!book || !action) return;

    if (action === "approve" || action === "reject") {
      await fetch("/api/admin/books", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: book._id, status: action === "approve" ? "approved" : "rejected" }),
      });
    } else if (action === "delete") {
      await fetch(`/api/admin/books?id=${book._id}`, { method: "DELETE" });
    }

    closeModal();
    fetchBooks();
  };
  if (loading) return <Loader />;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Approve / Manage Books</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-base-200">
        <table className="table-auto w-full min-w-[700px]">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Author</th>
              <th className="px-3 py-2 text-left">Category</th>
              <th className="px-3 py-2 text-left">Price ($)</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b._id} className="border-b last:border-b-0 hover:bg-base-100">
                <td className="px-3 py-2 text-base-content">{b.title}</td>
                <td className="px-3 py-2 text-base-content">{b.author}</td>
                <td className="px-3 py-2 text-base-content">{b.category}</td>
                <td className="px-3 py-2 text-base-content">{b.price?.$numberDouble || "N/A"}</td>
                <td className="px-3 py-2 capitalize">
                  <span className={`px-2 py-1 rounded-full text-white text-sm ${
                    b.status === "approved" ? "bg-teal-600" :
                    b.status === "pending" ? "bg-yellow-600" : "bg-red-600"
                  }`}>
                    {b.status || "pending"}
                  </span>
                </td>
                <td className="px-3 py-2 flex gap-2 flex-wrap">
                  <button
                    onClick={() => openModal(b, "approve")}
                    className="px-3 py-1 rounded-lg text-white text-sm bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openModal(b, "reject")}
                    className="px-3 py-1 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openModal(b, "delete")}
                    className="px-3 py-1 rounded-lg text-white text-sm bg-gray-600 hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-base-100 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-300 rounded-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl text-base-content font-bold mb-4">Confirm {modal.action}</h2>
            <p className="mb-6 text-base-content">
              Are you sure you want to {modal.action} <br />
              <span className="font-semibold text-base-content">{modal.book.title}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAction}
                className={`px-4 py-2 rounded-lg text-white ${
                  modal.action === "approve" ? "bg-green-600 hover:bg-green-700" :
                  modal.action === "reject" ? "bg-red-600 hover:bg-red-700" :
                  "bg-gray-600 hover:bg-gray-700"
                }`}
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 text-base-content rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
