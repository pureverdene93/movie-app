"use client";
import "./index.css";
import { useState } from "react";
import { Header } from "./_components/Header";
import { HeroSLider } from "./_components/HeroSlider";
import { MovieSectionUpcoming } from "./_features/MovieSectionUpcoming";
import { Footer } from "./_components/Footer";
import { MovieSectionPopular } from "./_features/MovieSectionPopular";
import { MovieSectionTopRated } from "./_features/MovieSectionTop-Rated";

export default function Home() {
  return (
    <div className="back">
      <Header />
      <div className="flex flex-col gap-[52px] max-sm:gap-[32px]">
        <div className="flex flex-col gap-[52px]">
          <HeroSLider />
          <MovieSectionUpcoming title={"Upcoming"} />
        </div>
        <MovieSectionPopular title={"Popular"} />
        <MovieSectionTopRated title={"Top Rated"} />
        <Footer />
      </div>
    </div>
  );
}
