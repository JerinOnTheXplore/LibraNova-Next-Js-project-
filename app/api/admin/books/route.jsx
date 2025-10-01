import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");
    const books = await db.collection("books").find({}).toArray();
    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

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

    await db.collection("books").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return new Response(JSON.stringify({ message: "Book updated" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
