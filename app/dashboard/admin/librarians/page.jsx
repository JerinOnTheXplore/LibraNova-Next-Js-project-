"use client";

import { useEffect, useState } from "react";

export default function AdminLibrariansPage() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLibrarian, setSelectedLibrarian] = useState(null);

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const fetchLibrarians = async () => {
    const res = await fetch("/api/admin/librarians");
    const data = await res.json();
    setLibrarians(data);
    setLoading(false);
  };

  // ban / activate
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    await fetch("/api/admin/librarians", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchLibrarians();
  };

  // remove librarian
  const handleDelete = async () => {
    if (!selectedLibrarian) return;
    await fetch(`/api/admin/librarians?id=${selectedLibrarian._id}`, {
      method: "DELETE",
    });
    setSelectedLibrarian(null);
    fetchLibrarians();
  };

  if (loading) return <p className="text-center mt-10 text-base-content">Loading librarians...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto py-20">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-600 pt-16">
        Manage Librarians
      </h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-base-200">
        <table className="table-auto w-full min-w-[650px]">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Created At</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {librarians.map((lib) => (
              <tr
                key={lib._id}
                className="border-b last:border-b-0 hover:bg-base-100"
              >
                <td className="px-3 py-2 text-base-content">{lib.name || "N/A"}</td>
                <td className="px-3 py-2 text-base-content">{lib.email}</td>
                <td className="px-3 py-2 text-base-content">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      lib.status === "active" ? "bg-teal-600" : "bg-red-600"
                    }`}
                  >
                    {lib.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-sm text-base-content">
                  {new Date(lib.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(lib._id, lib.status)}
                    className={`px-3 py-1 rounded-lg text-white text-sm ${
                      lib.status === "active"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {lib.status === "active" ? "Ban" : "Activate"}
                  </button>
                  <button
                    onClick={() => setSelectedLibrarian(lib)}
                    className="px-3 py-1 rounded-lg text-white text-sm bg-red-600 hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* confirmation modal */}
      {selectedLibrarian && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-50">
          <div className="bg-base-300 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-base-content">
              Confirm Remove
            </h2>
            <p className="mb-6 text-base-content">
              Are you sure you want to permanently remove{" "}
              <span className="font-bold">{selectedLibrarian.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedLibrarian(null)}
                className="px-4 py-2 text-gray-800 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
