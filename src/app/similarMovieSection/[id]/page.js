"use client";
import "../../index.css";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { MoreLikeThisSection } from "../_similarMoviesComponents/moreLikeThisSection";

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
