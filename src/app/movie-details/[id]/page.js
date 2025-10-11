"use client";
import "../../index.css";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";

import { MovieDetailSection } from "../_components/MovieDetailSection";

export default function Home() {
  return (
    <div className="back">
      <Header />
      <MovieDetailSection />
      <Footer />
    </div>
  );
}
