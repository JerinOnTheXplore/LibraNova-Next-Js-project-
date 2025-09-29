import clientPromise from "@/utils/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("libra-nova");
    const users = await db.collection("users").find().toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, role, status } = body;

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const updateDoc = {};
    if (role) updateDoc.role = role;
    if (status) updateDoc.status = status;

    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    return new Response(JSON.stringify({ message: "User updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const client = await clientPromise;
    const db = client.db("libra-nova");

    await db.collection("users").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "User deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
    });
  }
}
