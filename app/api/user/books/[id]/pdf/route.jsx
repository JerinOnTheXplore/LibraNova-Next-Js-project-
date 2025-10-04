import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Book ID missing" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("libra-nova");
    const book = await db.collection("books").findOne({ _id: new ObjectId(id) });

    if (!book || !book.pdfUrl) {
      return new Response(JSON.stringify({ error: "PDF not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ pdfUrl: book.pdfUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
