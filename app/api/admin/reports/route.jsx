import clientPromise from "@/utils/mongodb";

/**
 * GET /api/admin/reports
 * ei api ta admin report er 
 * users: total, active,bannde
 * monthlyborrow: last 6 mashe koyta boi borrow hoise seta conditionally
 * monthlyrevenue: last 6 mashe total  koto ay hoise........
 * eta server side e chole mane nextjs route handler e ..ar sorasori mongodb theke data niye ashe..
 * coolection: users, books, borrowedbooks,payments
 * data fields: borrowedBooks,borrowedAt,payments,paidAt
 */

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    // users stats
    const users = await db.collection("users").find({}).toArray();
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === "active").length;
    const bannedUsers = users.filter(u => u.status === "banned").length;

    // books stats
    const books = await db.collection("books").find({}).toArray();
    const totalBooks = books.length;
    const approvedBooks = books.filter(b => b.status === "approved").length;
    const rejectedBooks = books.filter(b => b.status === "rejected").length;

    // borrowed books monthly stats (last 6 months)
    const borrowRecords = await db.collection("borrowedBooks").find({}).toArray();
    const now = new Date();
    const monthlyBorrow = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const count = borrowRecords.filter(b => {
        const date = new Date(b.borrowedAt);
        return date >= monthStart && date <= monthEnd;
      }).length;
      monthlyBorrow.push({ month: monthStart.toLocaleString('default', { month: 'short' }), count });
    }

    // revenue monthly stats (payments)
    const payments = await db.collection("payments").find({}).toArray();
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const total = payments
        .filter(p => {
          const date = new Date(p.paidAt);
          return date >= monthStart && date <= monthEnd;
        })
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);
      monthlyRevenue.push({ month: monthStart.toLocaleString('default', { month: 'short' }), total });
    }

    return new Response(JSON.stringify({
      users: { total: totalUsers, active: activeUsers, banned: bannedUsers },
      books: { total: totalBooks, approved: approvedBooks, rejected: rejectedBooks },
      monthlyBorrow,
      monthlyRevenue
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch reports" }), { status: 500 });
  }
}
