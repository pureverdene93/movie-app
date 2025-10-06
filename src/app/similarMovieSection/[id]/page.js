"use client";
import "../../index.css";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { MovieCard } from "@/app/_features/MovieCard";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { MoreLikeThisSection } from "../_similarMoviesComponents/moreLikeThisSection";
import { MovieType } from "@/app/_features/MovieType";

export default function Home() {
  return (
    <div className="back">
      <div className="flex flex-col gap-[56px] mb-[76px]">
        <Header />
        <MoreLikeThisSection />
      </div>
      <Footer />
    </div>
  );
}
