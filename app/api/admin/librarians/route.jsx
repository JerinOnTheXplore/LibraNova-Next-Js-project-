import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

// GET all librarians
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");
    const librarians = await db.collection("librarians").find({}).toArray();

    return new Response(JSON.stringify(librarians), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET librarians error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch librarians" }), {
      status: 500,
    });
  }
}

// PATCH librarian status (ban / activate)
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return new Response(JSON.stringify({ error: "Missing id or status" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("librarians").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return new Response(JSON.stringify({ message: "Status updated" }), {
      status: 200,
    });
  } catch (err) {
    console.error("PATCH librarian error:", err);
    return new Response(JSON.stringify({ error: "Failed to update status" }), {
      status: 500,
    });
  }
}

// DELETE librarian
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing librarian id" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("librarians").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Librarian removed" }), {
      status: 200,
    });
  } catch (err) {
    console.error("DELETE librarian error:", err);
    return new Response(JSON.stringify({ error: "Failed to delete librarian" }), {
      status: 500,
    });
  }
}
