"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <div className="bg-base-300 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* Book Cover */}
      <div className="relative w-full h-64 md:h-72">
        <Image
  src={book.image || "/images/book1.png"}
  alt={book.title}
  fill
  sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
  className="object-cover rounded-lg"
/>

      </div>

      {/* Book Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-lg text-base-content line-clamp-2">{book.title}</h3>
          <p className="text-sm text-base-content mt-1">{book.author}</p>
          <p className="mt-2 text-teal-600 font-semibold text-lg">${book.price}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/books/${book._id}`}
            className="w-full text-center py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            View Details
          </Link>
          <button className="w-full py-2 rounded-lg border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition">
            Borrow
          </button>
          <button className="w-full py-2 rounded-lg border border-gray-400 text-base-content hover:bg-gray-400 hover:text-white transition">
            Pay
          </button>
          <button className="w-full py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
