"use client";
import "../../index.css";
import { Header } from "@/app/_components/Header";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/app/_components/Footer";
import { useEffect } from "react";
import { SearchedMovieSection } from "./_components/searchedMovieSection";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("query");
  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${getSearchParams}&language=en-US&page=${1}`;
  console.log("what is this", getSearchParams);

  const getData = async () => {
    const data = await fetch(apiSearch, options);
    const jsonData = await data.json();
    console.log("search data is here", jsonData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="back">
      <Header />
      <SearchedMovieSection />
      <Footer />
    </div>
  );
}
