// app/api/books/route.js
import clientPromise from "../../../utils/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const title = searchParams.get("title");

    const client = await clientPromise;
    const db = client.db("libra-nova"); 

    let filter = {};

    if (category && category !== "all") {
      filter.category = { $regex: new RegExp(category, "i") };
    }

    if (title) {
      filter.title = { $regex: new RegExp(`^${title}$`, "i") }; // exact match ignore case
    }

    const books = await db.collection("books").find(filter).toArray();
    return new Response(JSON.stringify(books), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch books" }), { status: 500 });
  }
}
