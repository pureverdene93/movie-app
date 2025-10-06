"use client";
import "../../index.css";
import { useParams } from "next/navigation";
import { Header } from "@/app/_components/Header";
import { Footer } from "@/app/_components/Footer";
import { GenreMovieSecton } from "../_genreComponents/genreMovieSection";

export default function Home() {
  const param = useParams();
  return (
    <div className="back">
      <Header />
      <GenreMovieSecton />
      <Footer />
    </div>
  );
}
