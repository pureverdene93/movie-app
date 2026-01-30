"use client";
import "./index.css";
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
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-13 w-full">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-13">
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
