"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import DashboardLayout from "./dashboardContent/page";
import app from "@/utils/firebase";


export default function DashboardWrapper({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await fetch(`/api/users?email=${currentUser.email}`);
          const data = await res.json();
          setRole(data.role || "user");
        } catch (err) {
          console.error(err);
          setRole("user");
        }
      } else {
        setRole("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <p className="text-center mt-10">Loading Dashboard...</p>;
  }

  return <DashboardLayout role={role}>{children}</DashboardLayout>;
}
