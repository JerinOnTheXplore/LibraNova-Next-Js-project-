
import clientPromise from "../../../utils/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 8;

    const client = await clientPromise;
    const db = client.db("libra-nova");

    let filter = {};
    if (category && category !== "all") {
      filter.category = { $regex: new RegExp(category, "i") };
    }

    const totalBooks = await db.collection("books").countDocuments(filter);

    // Fetch paginated books
    const books = await db
      .collection("books")
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return new Response(JSON.stringify({ books, totalBooks }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch books" }),
      { status: 500 }
    );
  }
}
