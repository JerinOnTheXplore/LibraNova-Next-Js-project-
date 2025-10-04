import { 
  FaBook, 
  FaCreditCard, 
  FaStar, 
  FaUsers, 
  FaChartBar, 
  FaPlusCircle, 
  FaEdit, 
  FaTrash, 
  FaBell, 
  FaFilePdf, 
  FaClock, 
  FaMoneyBillWave, 
  FaUserShield, 
  FaUserTimes, 
  FaCheckCircle, 
  FaTimesCircle 
} from "react-icons/fa";

export const dashboardMenu = {
  user: [
    { name: "Borrowed Books", path: "/dashboard/user/borrowed", icon: FaBook },
    { name: "Payment History", path: "/dashboard/user/payments", icon: FaCreditCard },
    { name: "Read Books (PDF)", path: "/dashboard/user/reader", icon: FaFilePdf },
    { name: "Reminders", path: "/dashboard/user/reminders", icon: FaBell },
    { name: "Extend Rental", path: "/dashboard/user/extend", icon: FaClock },
    { name: "My Reviews", path: "/dashboard/user/reviews", icon: FaStar },
  ],

  librarian: [
    { name: "Manage Books", path: "/dashboard/librarian/books", icon: FaBook },
    { name: "Add Book", path: "/dashboard/librarian/add-book", icon: FaPlusCircle },
    { name: "Update Book", path: "/dashboard/librarian/update-book", icon: FaEdit },
    { name: "Remove Book", path: "/dashboard/librarian/remove-book", icon: FaTrash },
    { name: "Statistics", path: "/dashboard/librarian/stats", icon: FaChartBar },
  ],

  admin: [
    { name: "Manage Users", path: "/dashboard/admin/users", icon: FaUsers },
    { name: "Ban/Remove User", path: "/dashboard/admin/remove-user", icon: FaUserTimes },
    { name: "Manage Librarians", path: "/dashboard/admin/librarians", icon: FaUserShield },
    { name: "Approve Books", path: "/dashboard/admin/approve-books", icon: FaCheckCircle },
    { name: "Rejected Books", path: "/dashboard/admin/reject-books", icon: FaTimesCircle },
    { name: "Reports", path: "/dashboard/admin/reports", icon: FaChartBar },
    // { name: "Refunds & Disputes", path: "/dashboard/admin/refunds", icon: FaMoneyBillWave },
  ],
};
