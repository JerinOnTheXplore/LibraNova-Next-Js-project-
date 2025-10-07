import FeaturedBooks from "@/components/FeaturedBooks";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ReadersFeedback from "@/components/ReadersFeedback";
import TopCategories from "@/components/TopCategories";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      
      <Hero></Hero>
      <FeaturedBooks></FeaturedBooks>
      <TopCategories></TopCategories>
      <ReadersFeedback></ReadersFeedback>
    </main>
  );
}
