import clientPromise from "../../../utils/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("libra-nova"); 

    let filter = {};
    if (category && category !== "all") filter.category = { $regex: new RegExp(category, "i") };

    const books = await db
      .collection("books")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch books" }), { status: 500 });
  }
}
