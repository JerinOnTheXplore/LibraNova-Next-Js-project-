import { FaBook, FaCreditCard, FaStar, FaUsers, FaChartBar } from "react-icons/fa";

export const dashboardMenu = {
  user: [
    { name: "Borrowed Books", path: "/dashboard/user/borrowed", icon: FaBook },
    { name: "Payment History", path: "/dashboard/user/payments", icon: FaCreditCard },
    { name: "My Reviews", path: "/dashboard/user/reviews", icon: FaStar },
  ],
  librarian: [
    { name: "Manage Books", path: "/dashboard/librarian/books", icon: FaBook },
    { name: "Statistics", path: "/dashboard/librarian/stats", icon: FaChartBar },
  ],
  admin: [
    { name: "Manage Users", path: "/dashboard/admin/users", icon: FaUsers },
    { name: "Reports", path: "/dashboard/admin/reports", icon: FaChartBar },
  ],
};
