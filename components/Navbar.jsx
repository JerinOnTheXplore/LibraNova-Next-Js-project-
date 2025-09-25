"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaBookOpen,
  FaSignInAlt,
  FaUserPlus,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const booksDropdownItems = [
    { href: "/books", label: "Browse All" },
    { href: "/books?cat=novel", label: "Novels" },
    { href: "/books?cat=science", label: "Science" },
    { href: "/books?cat=tech", label: "Technology" },
  ];

  const dashboardItems = [
    { href: "/dashboard/user", label: "User Dashboard", roles: ["user"] },
    { href: "/dashboard/librarian", label: "Librarian Dashboard", roles: ["librarian"] },
    { href: "/dashboard/admin", label: "Admin Dashboard", roles: ["admin"] },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Disable scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <FaBookOpen className="text-teal-700 dark:text-teal-400" />
          <span className="sm:inline text-base-content">LibraNova</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex mx-auto max-w-4xl py-3 px-5 bg-teal-700 text-white items-center gap-4 rounded-full">
          <LinkItem href="/" label="Home" />
          <DropdownMenu title="Books" items={booksDropdownItems} />
          <LinkItem href="/dashboard/dashboardContent" label="Dashboard" />
          <LinkItem href="/my-library" label="My Library" />
          <LinkItem href="/rentals" label="Rentals" />
          <LinkItem href="/pricing" label="Pricing" />
          <LinkItem href="/blog" label="Blog" />
          <LinkItem href="/about" label="About" />
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded transition-colors">
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-300" />
              ) : (
              <FaMoon className="w-5 h-5 text-yellow-300" />
            )}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="px-3 py-2 rounded-full text-base-content bg-base-300">
                Welcome, {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-full text-base-content transition-colors"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center text-base-content gap-1 hover:text-teal-600"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                href="/register"
                className="flex items-center text-base-content gap-1 hover:text-teal-600"
              >
                <FaUserPlus /> Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-base-content hover:text-teal-600"
        >
          {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer + Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-md z-20"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-700 text-white shadow-xl p-6 z-30"
            >
              <div className="flex justify-between  items-center mb-10 ">
                <span className="text-lg font-semibold">Menu</span>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes className="w-6 h-6 text-base-content "/>
                </button>
              </div>
              <div className="flex flex-col gap-4 bg-base-200 text-base-content px-2">
                <LinkItemMobile href="/" label="Home" />
                <DropdownMenuMobile title="Books" items={booksDropdownItems} />
                <LinkItemMobile href="/dashboard/dashboardContent" label="Dashboard" />
                <LinkItemMobile href="/my-library" label="My Library" />
                <LinkItemMobile href="/rentals" label="Rentals" />
                <LinkItemMobile href="/pricing" label="Pricing" />
                <LinkItemMobile href="/blog" label="Blog" />
                <LinkItemMobile href="/about" label="About" />
                {!user && <LinkItemMobile href="/login" label="Login" />}
                {!user && <LinkItemMobile href="/register" label="Register" />}
                {user && <LinkItemMobile href="#" label="Logout" onClick={handleLogout} />}
                {/* Theme Toggle Mobile */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-2  hover:bg-white/20 dark:hover:bg-white/20 rounded"
                >
                  {darkMode ? <FaSun className="text-yellow-500" /> :  <FaMoon className="text-yellow-500" />} Toggle Theme
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Dropdown Components
function DropdownMenu({ title, items }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-gray-200 focus:outline-none">
        {title}
      </button>
      <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 grid grid-cols-1 gap-2 p-4 bg-base-200 shadow-xl rounded-xl w-48 top-10 text-base-content">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="hover:underline">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function DropdownMenuMobile({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full hover:bg-white/20 p-2 rounded-lg transition-colors"
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="ml-6 mt-2 flex flex-col gap-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function LinkItem({ href, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {label}
    </Link>
  );
}

function LinkItemMobile({ href, label, onClick }) {
  return (
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 w-full text-left hover:bg-gray-500 p-2 rounded-lg transition-colors"
      >
        {label}
      </Link>
    );
}
