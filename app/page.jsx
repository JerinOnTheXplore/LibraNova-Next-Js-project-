"use client";

import FeaturedAuthors from "@/components/FeaturedAuthors";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import OurLatestNews from "@/components/OurLatestNews";
import ReadersFeedback from "@/components/ReadersFeedback";
import StatsSection from "@/components/StatsSection";
import TakeBook from "@/components/TakeBook";
import TopCategories from "@/components/TopCategories";
import UpcomingEvents from "@/components/UpcomingEvents";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
 const [loading, setLoading] = useState(true);

 useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <main>
      
      
      <Hero></Hero>
      <FeaturedBooks></FeaturedBooks>
      <TopCategories></TopCategories>
      <ReadersFeedback></ReadersFeedback>
      <StatsSection></StatsSection>
      <UpcomingEvents></UpcomingEvents>
      <OurLatestNews></OurLatestNews>
      <TakeBook></TakeBook>
    </main>
  );
}
