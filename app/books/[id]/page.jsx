import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function BookDetails({ params }) {
  const client = await clientPromise;
  const db = (await client).db("libra-nova");

  let book = null;
  try {
    book = await db.collection("books").findOne({ _id: new ObjectId(params.id) });
  } catch (e) {
    console.error("Invalid ObjectId:", e);
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Book not found!</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 py-24 md:py-48 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/books"
          className="inline-block mb-6 px-4 py-2 rounded-lg bg-base-200 text-base-content hover:bg-gray-300 dark:hover:bg-gray-400 transition"
        >
          ← Back
        </Link>

        <div className="bg-base-300 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row gap-6">
          {/* Left: Image */}
          <div className="md:w-1/3 w-full">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-base-content">{book.title}</h1>
              <p className="mt-2 text-base-content text-lg">by {book.author}</p>
              <p className="mt-4 text-base text-base-content leading-relaxed">
                {book.category}
              </p>
              <p className="mt-4 text-base text-base-content leading-relaxed">
                {book.description}
              </p>
              <p className="mt-6 text-teal-600 font-semibold text-xl">
                ${book.price}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition">
                Borrow
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition">
                Pay
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition">
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
