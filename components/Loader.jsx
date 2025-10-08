"use client";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <div className="relative w-24 h-24 animate-spin">
        <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent"></div>
        <div className="absolute inset-4 border-4 border-teal-400 rounded-full border-b-transparent"></div>
        <div className="absolute inset-8 w-8 h-8 bg-teal-600 rounded-full"></div>
      </div>
    </div>
  );
}
