import FeaturedBooks from "@/components/FeaturedBooks";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ReadersFeedback from "@/components/ReadersFeedback";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      
      <Hero></Hero>
      <FeaturedBooks></FeaturedBooks>
      <ReadersFeedback></ReadersFeedback>
    </main>
  );
}
