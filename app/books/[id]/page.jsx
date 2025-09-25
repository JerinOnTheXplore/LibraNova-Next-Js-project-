
import AddReview from "@/components/AddReview";
import clientPromise from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function BookDetails({ params }) {
  const client = await clientPromise;
  const db = (await client).db("libra-nova");
  


  //  Fetch main book
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

  //  Fetch related books (same category, excluding current one)
  let relatedBooks = [];
  try {
    relatedBooks = await db
      .collection("books")
      .find({ category: book.category, _id: { $ne: new ObjectId(params.id) } })
      .limit(4)
      .toArray();
  } catch (e) {
    console.error("Error fetching related books:", e);
  }

  //  Fetch reviews for this book
  let reviews = [];
  try {
    reviews = await db
      .collection("reviews")
      .find({ bookId: params.id })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (e) {
    console.error("Error fetching reviews:", e);
  }

  return (
    <section className="min-h-screen bg-base-100 py-24 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/books"
          className="inline-block mb-6 px-4 py-2 rounded-lg bg-base-200 text-base-content hover:bg-gray-300 dark:hover:bg-gray-400 transition"
        >
          ← Back
        </Link>

        {/* Main Book Info */}
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
                <strong>Category:</strong> {book.category}
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
              <button  className="flex-1 px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition">
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

        {/* Related Books */}
{relatedBooks.length > 0 && (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-base-content mb-6">Related Books</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {relatedBooks.map((b) => (
        <Link key={b._id} href={`/books/${b._id}`}>
          <div className="bg-base-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer flex flex-col h-full">
            <div className="flex-1">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-semibold text-base-content">{b.title}</h3>
              <p className="text-sm text-base-content">by {b.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
)}

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-base-content mb-6">Reviews</h2>

          {/* Review List */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-base-200 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-base-content">{review.comment}</p>
                  <p className="text-sm text-base-content mt-2">
                    — {review.user || "Anonymous"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content">No reviews yet. Be the first to review!</p>
          )}

          {/* Add Review Form (Client-side Needed) */}
          <AddReview bookId={params.id} />
        </div>
      </div>
    </section>
  );
}
