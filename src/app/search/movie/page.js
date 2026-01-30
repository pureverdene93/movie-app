"use client";
import "../../index.css";
import { Header } from "@/app/_components/Header";
import { Footer } from "@/app/_components/Footer";
import { SearchedMovieSection } from "./_components/searchedMovieSection";
import { Suspense } from "react";
import { SearchSkeleton } from "@/components/ui/MovieCardSkeleton";

function SearchContent() {
  return <SearchedMovieSection />;
}

export default function Home() {
  return (
    <div className="back">
      <Header />
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
}
