import clientPromise from "@/utils/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ role: "user" }), { status: 200 }); // ekhane default role = user
    }

    return new Response(JSON.stringify({ role: user.role || "user" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch role" }), { status: 500 });
  }
}
