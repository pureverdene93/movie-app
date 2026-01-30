"use client";
import { MovieCard } from "./MovieCard";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { SeeMore } from "../_icons/SeeMoreIcon";
import { MovieSectionSkeleton } from "@/components/ui/MovieCardSkeleton";

const ApiLink =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieSectionTopRated = (props) => {
  const { title } = props;
  const [topRatedMovieData, setTopRatedMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setTopRatedMovieData(jsonData.results);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <MovieSectionSkeleton showSeeMore={true} />;
  }

  if (!loading && typeof topRatedMovieData === "undefined") {
    return <div className="text-foreground text-[24px]">Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9 justify-center items-center w-full px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1275px]">
        <div className="flex items-center justify-between flex-row">
          <p className="text-foreground text-lg sm:text-xl lg:text-2xl font-semibold">Top Rated</p>
          <Link href={"/seeMoreTopRated"}>
            <button className="text-foreground flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-70 transition-opacity text-sm sm:text-base">
              See more <SeeMore />
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[1275px]">
        {topRatedMovieData.slice(0, 10).map((movie, index) => {
          return (
            <MovieCard
              key={index}
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              imageSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              upcomingMovieId={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};
