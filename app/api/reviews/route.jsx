import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { bookId, comment, user } = await req.json();

    if (!bookId || !comment) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const reviewDoc = {
      bookId: bookId.toString(), // store as string
      comment,
      user: user || "Anonymous",
      createdAt: new Date(),
    };

    await db.collection("reviews").insertOne(reviewDoc);

    return new Response(JSON.stringify({ message: "Review added!" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
  }
}
