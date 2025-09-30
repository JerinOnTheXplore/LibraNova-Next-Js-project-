
import clientPromise from "@/utils/mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return new Response(JSON.stringify({ error: "Status required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found or already updated" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "User status updated" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
  }
}
