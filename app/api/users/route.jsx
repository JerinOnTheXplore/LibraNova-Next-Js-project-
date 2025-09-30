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

    //  user exist kore kina check kore
    let user = await usersCollection.findOne({ email });

    // user jdi exist na kore default vabe create korbe
    if (!user) {
      const newUser = {
        email,
        role: "user",
        status: "active",   
        createdAt: new Date(),
      };
      const result = await usersCollection.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }

    return new Response(
      JSON.stringify({ role: user.role, status: user.status }),
      { status: 200 }
    );

  } catch (err) {
    console.error("Error fetching or creating user:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch role" }),
      { status: 500 }
    );
  }
}
