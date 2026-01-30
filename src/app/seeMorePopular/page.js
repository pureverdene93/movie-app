"use client";
import "../index.css";
import { Footer } from "../_components/Footer";
import { Header } from "../_components/Header";
import { PopularMovieSection } from "./_components/PopularMovieSection";

export default function Home() {
  return (
    <div className="back">
      <Header />
      <PopularMovieSection />
      <Footer />
    </div>
  );
}
