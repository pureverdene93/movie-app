"use client";
import "../../index.css";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { MoreLikeThisSection } from "../_similarMoviesComponents/moreLikeThisSection";

export default function Home() {
  return (
    <div className="back">
      <Header />
      <MoreLikeThisSection />
      <Footer />
    </div>
  );
}
