"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("borrowed");

  // Dummy data (replace with API data)
  const rentals = [
    {
      _id: 1,
      bookTitle: "Atomic Habits",
      coverImage: "https://covers.openlibrary.org/b/id/10523354-L.jpg",
      rentalDate: "2025-09-10",
      dueDate: "2025-09-30",
      status: "active",
    },
    {
      _id: 2,
      bookTitle: "The Alchemist",
      coverImage: "https://covers.openlibrary.org/b/id/9870866-L.jpg",
      rentalDate: "2025-08-01",
      dueDate: "2025-08-15",
      status: "expired",
    },
  ];

  const payments = [
    {
      _id: 1,
      paymentId: "TXN12345",
      amount: 200,
      date: "2025-09-10",
      method: "Stripe",
      status: "success",
    },
    {
      _id: 2,
      paymentId: "TXN67890",
      amount: 150,
      date: "2025-08-01",
      method: "SSLCommerz",
      status: "failed",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        📚 My Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${activeTab === "borrowed" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("borrowed")}
          >
            Borrowed Books
          </button>
          <button
            className={`tab ${activeTab === "payments" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("payments")}
          >
            Payment History
          </button>
        </div>
      </div>

      {/* Borrowed Books Section */}
      {activeTab === "borrowed" && (
        <motion.div
          key="borrowed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rentals.map((rental) => (
            <div
              key={rental._id}
              className="card bg-base-100 shadow-xl border"
            >
              <figure>
                <img
                  src={rental.coverImage}
                  alt={rental.bookTitle}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{rental.bookTitle}</h2>
                <p>
                  <span className="font-semibold">Rented:</span>{" "}
                  {new Date(rental.rentalDate).toLocaleDateString()}
                </p>
                <p
                  className={
                    rental.status === "expired" ? "text-red-500 font-semibold" : ""
                  }
                >
                  <span className="font-semibold">Due:</span>{" "}
                  {new Date(rental.dueDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {rental.status}
                </p>
                {rental.status === "active" && (
                  <button className="btn btn-sm btn-primary mt-2">
                    Extend Rental
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Payment History Section */}
      {activeTab === "payments" && (
        <motion.div
          key="payments"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto"
        >
          <table className="table w-full border">
            <thead>
              <tr className="bg-base-200">
                <th>Txn ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.paymentId}</td>
                  <td>${p.amount}</td>
                  <td>{new Date(p.date).toLocaleDateString()}</td>
                  <td>{p.method}</td>
                  <td
                    className={
                      p.status === "success"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
