"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (requiredRole && role !== requiredRole) router.push("/login");
    }
  }, [user, role, loading, router, requiredRole]);

  if (loading) return <p>Loading...</p>;
  return children;
}
