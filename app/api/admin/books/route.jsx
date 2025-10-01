import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

//GET All Books (except rejected)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    const books = await db
      .collection("books")
      .find({ status: { $ne: "rejected" } })
      .toArray();

    return Response.json(books, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// PATCH (Update book status)
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return Response.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json({ message: "Book status updated" }, { status: 200 });
  } catch (error) {
    console.error("PATCH Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// DELETE (Remove book by id)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing book id" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("books").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }

    return Response.json({ message: "Book deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
