"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.back();
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.back();
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
          <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
          <div className="absolute inset-8 w-8 h-8 bg-teal-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 pt-24">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6 z-10">
          <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-md">
            <FaBookOpen size={28} />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-teal-700 dark:text-teal-400">
            LibraNova
          </h2>
          <p className="text-sm text-base-content">
            Login to continue your reading journey 📚
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-base-content"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-base-content"
            required
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-sm text-center mt-4 text-base-content">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="px-3 text-base-content text-sm">
            OR
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-base-300 dark:border-gray-700 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-base-content">
            Sign in with Google
          </span>
        </button>
      </div>
    </div>
  );
}
