"use client";

import { useEffect, useState } from "react";
import { FaUser, FaTrashAlt } from "react-icons/fa";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //  MongoDB theke users fetch kortese....
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      body: JSON.stringify({ id, role }),
    });
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
  };

  const handleBanToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "banned" : "active";
    await fetch("/api/admin/users", {
      method: "PATCH",
      body: JSON.stringify({ id, status: newStatus }),
    });
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
    );
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Manage Users
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg shadow-lg">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u._id}
                className="hover:bg-teal-50 transition-colors duration-200"
              >
                <td>{i + 1}</td>
                <td className="flex items-center gap-2">
                  <FaUser className="text-teal-500" /> {u.name}
                </td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="select select-sm select-bordered border-teal-400"
                  >
                    <option value="user">User</option>
                    <option value="librarian">Librarian</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      u.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleBanToggle(u._id, u.status)}
                    className={`px-3 py-1 rounded-md text-white text-sm ${
                      u.status === "active"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {u.status === "active" ? "Ban" : "Unban"}
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
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
