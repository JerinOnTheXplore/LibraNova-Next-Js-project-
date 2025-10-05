import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req, { params }) {
  try {
    const bookId = params.id;
    const { userId, date, note } = await req.json();

    if (!userId || !date || !note)
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const reminder = { userId, date: new Date(date).toISOString(), note, createdAt: new Date().toISOString() };

    await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      { $push: { reminders: reminder } }
    );

    return new Response(JSON.stringify({ success: true, reminder }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
