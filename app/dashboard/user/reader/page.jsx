"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

export default function ReaderPage() {
  
  const fileUrl = "/sample.pdf"; 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4 text-teal-600">📖 Read Book</h1>
      <PDFViewer file={fileUrl} />
    </div>
  );
}
