"use client";
import "../index.css";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import { TopRatedMovieSection } from "./_components/TopRatedMovieSection";

export default function Home() {
  return (
    <div className="back">
      <Header />
      <TopRatedMovieSection />
      <Footer />
    </div>
  );
}
