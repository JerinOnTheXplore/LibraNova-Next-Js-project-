"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// react-icons
import { FaBars, FaTimes, FaTachometerAlt } from "react-icons/fa";
import { dashboardMenu } from "@/dashboardMenu";

export default function DashboardLayout({ children, role = "user" }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // Simulate loading (replace with real API loading if needed)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // 1.2s loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-base-100 pt-16">
      {/* Content Area (left side) */}
      <div
        className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300
          ${open ? "md:mr-64" : "md:mr-0"}`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full mt-16">
            <div className="relative w-24 h-24 animate-spin">
              {/* Outer Book Circle */}
              <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
              {/* Inner Book Icon Circle */}
              <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
              {/* Center Dot */}
              <div className="absolute inset-8 w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Sidebar (right side) */}
      <div
        className={`fixed top-16 lg:top-24 right-0 h-[calc(100vh-4rem)] bg-base-200 shadow-lg text-base-content transition-transform duration-300 z-40
        ${open ? "translate-x-0 w-64" : "translate-x-full w-64"}
        md:translate-x-0 md:w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="font-bold text-base-content text-lg">
              {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
            </h2>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4 space-y-1 px-2 overflow-y-auto h-[calc(100%-3rem)]">
          {dashboardMenu[role]?.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base-content hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button (always visible on mobile) */}
      <button
        className="fixed top-20 right-2 p-2 rounded-full bg-teal-600 text-white shadow-md z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
      </button>
    </div>
  );
}
