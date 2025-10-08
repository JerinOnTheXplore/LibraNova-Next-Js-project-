import FeaturedAuthors from "@/components/FeaturedAuthors";
import FeaturedBooks from "@/components/FeaturedBooks";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OurLatestNews from "@/components/OurLatestNews";
import ReadersFeedback from "@/components/ReadersFeedback";
import StatsSection from "@/components/StatsSection";
import TopCategories from "@/components/TopCategories";
import UpcomingEvents from "@/components/UpcomingEvents";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      
      <Hero></Hero>
      <FeaturedBooks></FeaturedBooks>
      <TopCategories></TopCategories>
      <ReadersFeedback></ReadersFeedback>
      <FeaturedAuthors></FeaturedAuthors>
      <StatsSection></StatsSection>
      <UpcomingEvents></UpcomingEvents>
      <OurLatestNews></OurLatestNews>
    </main>
  );
}
