"use client";

import dynamic from "next/dynamic";
import { FaBookOpen } from "react-icons/fa";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

export default function ReaderPage() {
  
  const fileUrl = "/sample.pdf"; 

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold pt-16 text-center mb-4 text-teal-600"><FaBookOpen className="inline"/> Read Book</h1>
      <PDFViewer file={fileUrl} />
    </div>
  );
}
