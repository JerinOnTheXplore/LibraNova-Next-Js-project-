import clientPromise from "@/utils/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    // ekhane shudhu rejected books gullo
    const books = await db
      .collection("books")
      .find({ status: "rejected" })
      .project({
        title: 1,
        author: 1,
        category: 1,
        price: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .toArray();

    // invalid Date avoid korar jonno fallback diye date disi
    const safeBooks = books.map((b) => ({
      ...b,
      createdAt: b.createdAt || new Date(),
      updatedAt: b.updatedAt || b.createdAt || new Date(),
    }));

    return new Response(JSON.stringify(safeBooks), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rejected books", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch rejected books" }),
      { status: 500 }
    );
  }
}
