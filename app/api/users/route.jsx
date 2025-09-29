import clientPromise from "@/utils/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email required" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");
    const usersCollection = db.collection("users");

    let user = await usersCollection.findOne({ email });

    // user na pwa gele default vabe use r toiri kortese ekhane...
    if (!user) {
      const newUser = {
        email,
        role: "user",
        status: "active",   // eta default
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      user = newUser;
    }

    return new Response(
      JSON.stringify({ role: user.role || "user", status: user.status || "active" }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch role" }),
      { status: 500 }
    );
  }
}
