"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaBookOpen, FaTachometerAlt, FaBookmark, FaClock, FaWallet, FaBlog, FaInfoCircle, FaSignInAlt, FaUserPlus, FaSearch } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role } = useAuth();

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md shadow-sm bg-white/80">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <FaBookOpen className="text-teal-700" />
          <span className="sm:inline text-gray-800">LibraNova</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex mx-auto max-w-4xl py-3 px-5 bg-teal-700 text-white items-center gap-4 rounded-full">
          <DropdownMenu title="Books" icon={<FaBookOpen />} items={booksDropdownItems} />

          {user && (
            <DropdownMenu
              title="Dashboard"
              icon={<FaTachometerAlt />}
              items={dashboardItems.filter(item => item.roles.includes(role))}
            />
          )}

          <LinkItem href="/my-library" label="My Library" icon={<FaBookmark />} variant="dark" />
          <LinkItem href="/rentals" label="Rentals" icon={<FaClock />} variant="dark" />
          <LinkItem href="/pricing" label="Pricing" icon={<FaWallet />} variant="dark" />
          <LinkItem href="/blog" label="Blog" icon={<FaBlog />} variant="dark" />
          <LinkItem href="/about" label="About" icon={<FaInfoCircle />} variant="dark" />
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5 text-gray-700">
          <button className="hover:text-teal-600"><FaSearch className="w-5 h-5" /></button>

          {user ? (
            <span className="px-3 py-2 rounded-full bg-gray-200 text-gray-700">
              Hi, {user.displayName || user.email}
            </span>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-1 hover:text-teal-600"><FaSignInAlt className="w-4 h-4" /> Login</Link>
              <Link href="/register" className="flex items-center gap-1 hover:text-teal-600"><FaUserPlus className="w-4 h-4" /> Register</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="block lg:hidden text-gray-700 hover:text-teal-600">
          {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-teal-800 to-teal-700 text-white shadow-xl p-6 z-40">
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsOpen(false)}><FaTimes className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col -ml-2 bg-gradient-to-b from-teal-800 to-teal-900 p-2 gap-4">
              <DropdownMenuMobile title="Books" items={booksDropdownItems} />
              {user && <DropdownMenuMobile title="Dashboard" items={dashboardItems.filter(item => item.roles.includes(role))} />}
              <LinkItemMobile href="/my-library" label="My Library" icon={<FaBookmark />} />
              <LinkItemMobile href="/rentals" label="Rentals" icon={<FaClock />} />
              <LinkItemMobile href="/pricing" label="Pricing" icon={<FaWallet />} />
              <LinkItemMobile href="/blog" label="Blog" icon={<FaBlog />} />
              <LinkItemMobile href="/about" label="About" icon={<FaInfoCircle />} />
              {!user && <LinkItemMobile href="/login" label="Login" icon={<FaSignInAlt />} />}
              {!user && <LinkItemMobile href="/register" label="Register" icon={<FaUserPlus />} />}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Dropdown Components
function DropdownMenu({ title, icon, items }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-gray-200 focus:outline-none">{icon} {title}</button>
      <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 hover:visible hover:opacity-100 transition-all duration-200 grid grid-cols-1 gap-2 p-4 bg-white shadow-xl rounded-xl w-48 top-10 text-gray-800">
        {items.map(item => <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>)}
      </div>
    </div>
  );
}

function DropdownMenuMobile({ title, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full hover:bg-white/20 p-2 rounded-lg transition-colors">
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="ml-6 mt-2 flex flex-col gap-2">{items.map(item => <Link key={item.href} href={item.href} className="hover:underline">{item.label}</Link>)}</div>}
    </div>
  );
}

function LinkItem({ href, label, icon, variant = "light" }) {
  return <Link href={href} className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${variant === "dark" ? "text-stone-50 hover:text-gray-200" : "text-gray-700 hover:text-teal-700"}`}>{icon} {label}</Link>;
}

function LinkItemMobile({ href, label, icon }) {
  return <Link href={href} className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg transition-colors">{icon}<span>{label}</span></Link>;
}
