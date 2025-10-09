import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import Link from "next/link";
import BookActions from "@/components/BookActions"; 

export default async function BookDetails({ params }) {
  const client = await clientPromise;
  const db = client.db("libra-nova");

  // fetch main book
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

  // convert _id to string
  book._id = book._id.toString();

  // fetch related books
  let relatedBooks = [];
  try {
    relatedBooks = await db
      .collection("books")
      .find({ category: book.category, _id: { $ne: new ObjectId(params.id) } })
      .limit(4)
      .toArray();
    relatedBooks = relatedBooks.map(b => ({ ...b, _id: b._id.toString() }));
  } catch (e) {
    console.error("Error fetching related books:", e);
  }

  // fetch reviews...
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
          className="inline-block mb-6 px-4 py-2 rounded-lg bg-base-200 text-base-content hover:bg-gray-300 transition"
        >
          ← Back
        </Link>

        {/* Main Book Info */}
        <div className="bg-base-300 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full">
            <img src={book.image} alt={book.title} className="w-full h-96 object-cover" />
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl text-base-content font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-base-content mb-1">👤 Author: {book.author}</p>
              <p className="text-lg text-base-content mb-1">📚 Category: {book.category}</p>
              <p className="text-lg text-base-content mb-1">📖 Total Pages: {book.totalPages}120</p>
              <p className="text-lg text-base-content mb-1">💰 Price: ${book.price}</p>
              <p className="mt-4 text-base-content"><b>Description:</b> {book.description}</p>
            </div>

            {/* Client-side Actions */}
            <BookActions book={book} />
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
                      <img src={b.image} alt={b.title} className="w-full h-48 object-cover rounded-md" />
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
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-base-200 p-4 rounded-lg shadow-sm">
                  <p className="text-base-content">{review.comment}</p>
                  <p className="text-sm text-base-content mt-2">— {review.user || "Anonymous"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-base-content">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </section>
  );
}
