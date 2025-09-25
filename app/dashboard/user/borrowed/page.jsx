import BorrowedBooks from "@/components/BorrowedBooks";

export default function BorrowedBooksPage() {
  return (
    <section className="min-h-screen bg-base-100 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <BorrowedBooks />
      </div>
    </section>
  );
}
