import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Admin Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
