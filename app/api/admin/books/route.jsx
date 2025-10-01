import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");

    const books = await db
      .collection("books")
      .find({ status: { $ne: "rejected" } })
      .toArray();

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, status } = body;

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

    return new Response(JSON.stringify({ message: "Book status updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing book id" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("books").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Book deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
