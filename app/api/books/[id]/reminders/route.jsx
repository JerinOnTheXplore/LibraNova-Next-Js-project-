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

export async function GET(req, { params }) {
  try {
    const bookId = params.id;
    const searchParams = new URL(req.url).searchParams;
    const userId = searchParams.get("userId");

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const book = await db.collection("books").findOne(
      { _id: new ObjectId(bookId) },
      { projection: { reminders: 1, title: 1 } }
    );

    if (!book) return new Response(JSON.stringify({ error: "Book not found" }), { status: 404 });

    const userReminders = book.reminders?.filter(r => r.userId === userId) || [];

    return new Response(JSON.stringify({ reminders: userReminders, title: book.title }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

