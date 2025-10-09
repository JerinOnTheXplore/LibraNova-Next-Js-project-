"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaTachometerAlt } from "react-icons/fa";
import { dashboardMenu } from "@/dashboardMenu";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children, role = "user" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-base-100 pt-16">
      {/*Loader Overlay*/}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-base-100/80 backdrop-blur-sm z-[60]">
          <div className="relative w-20 h-20 animate-spin">
            <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
            <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
            <div className="absolute inset-8 w-6 h-6 bg-teal-600 rounded-full"></div>
          </div>
        </div>
      )}

      {/*Main Content*/}
<div
  className={`transition-all duration-300 md:pr-64 ${
    open ? "pr-64" : "pr-0"
  }`}
>
  <div className="p-4 md:p-6">{!loading && children}</div>
</div>

      {/*Sidebar*/}
      <aside
        className={`fixed top-16 right-0 pt-10  h-[calc(100vh-4rem)] w-64  shadow-lg  transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="flex items-center gap-2 p-4 border-b dark:border-gray-700">
          <FaTachometerAlt className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="font-bold text-lg text-base-content">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h2>
        </div>

        <ul className="mt-4 space-y-1 px-2 overflow-y-auto h-[calc(100%-3rem)]">
          {dashboardMenu[role]?.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 text-base-content"
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-20 right-2 p-2 rounded-full bg-teal-600 text-white shadow-md z-[70] md:hidden"
      >
        {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
      </button>
    </div>
  );
}
