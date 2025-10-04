"use client";
import { useEffect, useState } from "react";

export default function RejectedBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRejectedBooks();
  }, []);

  const fetchRejectedBooks = async () => {
    try {
      const res = await fetch("/api/admin/reject-books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("❌ Failed to fetch rejected books", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading rejected books...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Rejected Books</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No rejected books found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm bg-base-200">
          <table className="table-auto w-full min-w-[650px]">
            <thead className="bg-red-100 text-red-800">
              <tr>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Author</th>
                <th className="px-3 py-2 text-left">Category</th>
                <th className="px-3 py-2 text-left">Price</th>
                <th className="px-3 py-2 text-left">Rejected At</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id} className="border-b last:border-b-0 hover:bg-base-100">
                  <td className="px-3 py-2 text-base-content">{b.title}</td>
                  <td className="px-3 py-2 text-base-content">{b.author}</td>
                  <td className="px-3 py-2 text-base-content">{b.category}</td>
                  <td className="px-3 py-2 text-base-content">${b.price?.$numberDouble || b.price}</td>
                  <td className="px-3 py-2 text-base-content">
                    {new Date(b.updatedAt || b.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
