"use client";

import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // sample data as mock
        const data = {
          "totalBooks": 120,
          "totalCategories": 8,
          "totalMembers": 56,
          "booksAddedThisMonth": [5, 8, 10, 12],
          "borrowedReturned": {
            "borrowed": [20, 25, 30],
            "returned": [18, 22, 28]
          },
          "popularCategories": [
            { "category": "Fiction", "count": 45 },
            { "category": "Science", "count": 30 }
          ],
          "topBooks": [
            { "title": "Book 1", "borrowed": 15 },
            { "title": "Book 2", "borrowed": 12 }
          ]
        };

        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader/>;
  if (!stats) return <p className="text-center mt-10 text-red-500">No stats available.</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

  const booksAddedData = stats.booksAddedThisMonth.map((count, idx) => ({
    month: `Month ${idx + 1}`,
    count
  }));

  const borrowedReturnedData = stats.borrowedReturned.borrowed.map((b, idx) => ({
    month: `Month ${idx + 1}`,
    borrowed: b,
    returned: stats.borrowedReturned.returned[idx]
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-6 text-center">Library Statistics</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg shadow bg-base-200 text-center">
          <h2 className="text-base-content">Total Books</h2>
          <p className="text-3xl font-bold text-teal-700">{stats.totalBooks}</p>
        </div>
        <div className="p-6 rounded-lg shadow bg-base-200 text-center">
          <h2 className="text-base-content">Total Categories</h2>
          <p className="text-3xl font-bold text-teal-700">{stats.totalCategories}</p>
        </div>
        <div className="p-6 rounded-lg shadow bg-base-200 text-center">
          <h2 className="text-base-content">Active Members</h2>
          <p className="text-3xl font-bold text-teal-700">{stats.totalMembers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-base-200 rounded shadow">
          <h2 className="font-semibold mb-2 text-base-content">Books Added Monthly</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={booksAddedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#0088FE" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-base-200 rounded shadow text-base-content">
          <h2 className="font-semibold mb-2 text-base-content">Borrowed vs Returned</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={borrowedReturnedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="borrowed" fill="#00C49F" />
              <Bar dataKey="returned" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="p-6 bg-base-200 text-base-content rounded shadow">
        <h2 className="font-semibold mb-2">Most Popular Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.popularCategories}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats.popularCategories.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Borrowed Books Table */}
      <div className="p-6 bg-base-200 text-base-content rounded shadow overflow-x-auto">
        <h2 className="font-semibold mb-4">Top 5 Borrowed Books</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Title</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-base-content">Borrowed Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stats.topBooks.map((book, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 text-base-content">{book.title}</td>
                <td className="px-4 py-2 text-base-content">{book.borrowed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
