import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

// GET- fetch books for a librarian
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // frontend theke librarian email ..

    if (!email) return new Response(JSON.stringify({ error: "Missing librarian email" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const books = await db
      .collection("books")
      .find({ librarianEmail: email }) //  librarianEmail store koere book doc  e...
      .toArray();

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// POST - add new book
export async function POST(req) {
  try {
    const { title, author, category, price, email } = await req.json();

    if (!title || !author || !category || !price || !email)
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("books").insertOne({
      title,
      author,
      category,
      price,
      librarianEmail: email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ bookId: result.insertedId }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// PUT - update a book
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");
    const { title, author, category, price } = await req.json();

    if (!bookId || !title || !author || !category || !price)
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { title, author, category, price } }
    );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE - delete a book
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) return new Response(JSON.stringify({ error: "Missing bookId" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("books").deleteOne({ _id: new ObjectId(bookId) });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
