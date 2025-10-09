"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function PaymentsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const router = useRouter();
  const auth = getAuth(app);

  // Load payments for current user
  const loadUserPayments = (currentUser) => {
    const allPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const userPayments = allPayments.filter(
      (p) => p.userEmail === currentUser?.email
    );
    setPayments(userPayments);
  };

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        loadUserPayments(currentUser);
      } else {
        router.push("/login"); // redirect if not logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    // listen for localStorage updates
    const handleStorageChange = (e) => {
      if (e.key === "payments" && user) {
        loadUserPayments(user);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);

  if (loading) return <Loader/>; 

  //  Remove handler
  const handleRemovePayment = (id) => {
    const allPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const updatedPayments = allPayments.filter((p) => p._id !== id);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));
    loadUserPayments(user); // reload only current user's payments
  };

  return (
    <div className="bg-base-100 pt-16 md:pt-20">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-teal-600 text-center">
          My Payments
        </h1>
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-base-100 pt-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
          alt="Empty"
          className="w-32 h-32 mb-4 opacity-70"
        />
        <h2 className="text-xl font-semibold text-base-content">You have not made any payments yet.</h2>
        <p className=" mt-2 text-base-content">Go back and pay your book!</p>
      </div>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="p-4 border rounded-lg shadow-sm bg-base-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg text-base-content">
                    {payment.bookTitle}
                  </h2>
                  <p className="text-base-content">
                    Amount Paid:{" "}
                    <span className="text-teal-600 font-semibold">
                      ${payment.amount}
                    </span>
                  </p>
                  <p className="text-base-content">
                    Paid At: {new Date(payment.paidAt).toLocaleString()}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemovePayment(payment._id)}
                  className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
