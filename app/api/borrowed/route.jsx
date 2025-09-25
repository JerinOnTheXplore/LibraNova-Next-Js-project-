import { NextResponse } from "next/server";

let borrowedBooks = []; // temp store, replace with DB

export async function POST(request) {
  try {
    const data = await request.json();
    borrowedBooks.push({
      ...data,
      _id: Date.now().toString(),
      borrowedAt: new Date().toISOString(),
    });
    return NextResponse.json({ message: "Book borrowed", data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(borrowedBooks);
}
