"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchUsers();
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl text-center sm:text-3xl font-bold mb-4 sm:mb-6 text-teal-600  sm:text-left mt-12">
        Manage Users
      </h1>

      {/* table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm text-base-content bg-base-200">
        <table className="table-auto w-full min-w-[600px]">
          <thead className=" dark:bg-teal-500 text-teal-800">
            <tr>
              <th className="px-3 py-2 text-left text-base-content">Name</th>
              <th className="px-3 py-2 text-left text-base-content">Email</th>
              <th className="px-3 py-2 text-left text-base-content">Role</th>
              <th className="px-3 py-2 text-left text-base-content">Status</th>
              <th className="px-3 py-2 text-left text-base-content">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b last:border-b-0 hover:bg-base-100">
                <td className="px-3 py-2 text-base-content">{u.name}</td>
                <td className="px-3 py-2 text-base-content">{u.email}</td>
                <td className="px-3 py-2 text-base-content">{u.role}</td>
                <td className="px-3 py-2 text-base-content">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      u.status === "active" ? "bg-teal-600" : "bg-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleStatusToggle(u._id, u.status)}
                    className="px-2 sm:px-3 py-1 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                  >
                    {u.status === "active" ? "Ban" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
