import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

// Next.js API route handler
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const librarianId = searchParams.get("librarianId");

    if (!librarianId) {
      return new Response(JSON.stringify({ error: "Missing librarianId" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const books = await db
      .collection("books")
      .find({ librarianId })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, author, category, description, image, price, librarianId } = await req.json();

    if (!title || !author || !category || !price || !librarianId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const newBook = {
      title,
      author,
      category,
      description,
      image,
      price,
      librarianId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("books").insertOne(newBook);

    return new Response(
      JSON.stringify({ success: true, book: { ...newBook, _id: result.insertedId } }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// For single book actions: update & delete
export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return new Response(JSON.stringify({ error: "Missing bookId" }), { status: 400 });
    }

    const { title, author, category, description, image, price } = await req.json();

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { title, author, category, description, image, price, updatedAt: new Date() } }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return new Response(JSON.stringify({ error: "Missing bookId" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("books").deleteOne({ _id: new ObjectId(bookId) });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
