"use client";

import Image from "next/image";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
      <div className="relative w-full h-56">
        <Image
          src={book.cover || "/images/book1.png"}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-700 text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="mt-2 text-teal-700 font-semibold">${book.price}</p>
      </div>
    </div>
  );
}
