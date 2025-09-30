"use client";

import { useEffect, useState } from "react";

export default function RemoveUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  // ban / activate
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchUsers();
  };

  // permanent Remove
  const confirmDelete = async () => {
    if (!selectedUser) return;
    await fetch(`/api/admin/users?id=${selectedUser._id}`, {
      method: "DELETE",
    });
    setSelectedUser(null); // ekhne modal clse hochche...
    fetchUsers();
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-600">
        Ban / Remove Users
      </h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm bg-base-200">
        <table className="table-auto w-full min-w-[650px]">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Role</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-b last:border-b-0 hover:bg-base-100"
              >
                <td className="px-3 py-2">{u.name || "N/A"}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2 capitalize">{u.role}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      u.status === "active" ? "bg-teal-600" : "bg-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-3 py-2 flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(u._id, u.status)}
                    className={`px-3 py-1 rounded-lg text-white text-sm ${
                      u.status === "active"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {u.status === "active" ? "Ban" : "Activate"}
                  </button>
                  <button
                    onClick={() => setSelectedUser(u)} //ekhane modal open hoy
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
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently remove{" "}
              <span className="font-medium">{selectedUser.email}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
