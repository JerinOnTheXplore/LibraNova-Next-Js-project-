"use client";

import ManageBooks from "@/components/ManageBooks";

export default function LibrarianBooksPage() {
  return (
    <section className="min-h-screen bg-base-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-teal-600 text-center ">
           Librarian – Manage Books
        </h1>
        <ManageBooks />
      </div>
    </section>
  );
}
