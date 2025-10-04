
import { ObjectId } from "mongodb";
import clientPromise from "../../../../utils/mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    const book = await db.collection("books").findOne({ _id: new ObjectId(params.id) });

    if (!book) {
      return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch book" }), { status: 500 });
  }
}
