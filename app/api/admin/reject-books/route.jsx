import clientPromise from "@/utils/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    // shudhu rejected books gulo
    const books = await db
      .collection("books")
      .find({ status: "rejected" })
      .toArray();

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch rejected books" }),
      { status: 500 }
    );
  }
}
