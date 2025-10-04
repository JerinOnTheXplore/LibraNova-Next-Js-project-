"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/admin/reports");
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reports...</p>;
  if (!report) return <p className="text-center mt-10 text-red-600">No reports found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Admin Reports</h1>

      {/* Users & Books Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-teal-600  text-stone-50 rounded-lg text-center">
          <p className="">Total Users</p>
          <p className="text-2xl font-bold">{report.users.total}</p>
        </div>
        <div className="p-4 bg-green-600 rounded-lg text-center">
          <p>Active Users</p>
          <p className="text-2xl font-bold">{report.users.active}</p>
        </div>
        <div className="p-4 bg-red-400 rounded-lg text-center">
          <p>Banned Users</p>
          <p className="text-2xl font-bold">{report.users.banned}</p>
        </div>

        <div className="p-4 bg-teal-500 rounded-lg text-center">
          <p>Total Books</p>
          <p className="text-2xl font-bold">{report.books.total}</p>
        </div>
        <div className="p-4 bg-green-400 rounded-lg text-center">
          <p>Approved Books</p>
          <p className="text-2xl font-bold">{report.books.approved}</p>
        </div>
        <div className="p-4 bg-red-600 rounded-lg text-center">
          <p>Rejected Books</p>
          <p className="text-2xl font-bold">{report.books.rejected}</p>
        </div>
      </div>

      {/* Monthly Borrow Chart */}
      <div className="bg-base-200 p-4 rounded-lg shadow text-base-content">
        <h2 className="text-xl font-semibold mb-2">Monthly Borrowed Books</h2>
        <ResponsiveContainer className="text-base-content" width="100%" height={250}>
          <BarChart data={report.monthlyBorrow}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#14B8A6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-base-200 p-4 rounded-lg shadow text-base-content">
        <h2 className="text-xl font-semibold mb-2">Monthly Revenue ($)</h2>
        <ResponsiveContainer className="text-base-content" width="100%" height={250}>
          <BarChart data={report.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="total" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
