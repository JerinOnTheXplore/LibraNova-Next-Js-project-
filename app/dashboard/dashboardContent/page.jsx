"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300
          ${open ? "md:mr-64" : "md:mr-0"}`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full mt-16">
            <div className="relative w-24 h-24 animate-spin">
              <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
              <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
              <div className="absolute inset-8 w-8 h-8 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 right-0 min-h-[calc(100vh-4rem)] shadow-lg text-base-content transition-transform duration-300 bg-base-200 lg:bg-base-none
        ${open ? "translate-x-0 w-64" : "translate-x-full w-64"} md:translate-x-0 md:w-64 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700 flex-shrink-0 lg:pt-12">
          <FaTachometerAlt className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="font-bold text-base-content text-lg">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h2>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2">
          <ul className="flex flex-col gap-1">
            {dashboardMenu[role]?.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base-content hover:bg-gray-100 dark:hover:bg-gray-600 w-full"
                >
                  {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-20 right-2 p-2 rounded-full bg-teal-600 text-white shadow-md z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
      </button>
    </div>
  );
}
