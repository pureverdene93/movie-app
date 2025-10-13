"use client";
import { MovieCard } from "./MovieCard";
import { MovieType } from "./MovieType";
import { useState } from "react";
import { useEffect } from "react";
import { SeeMore } from "../_icons/SeeMoreIcon";
import Link from "next/link";

// import { MovieSectionUpcomingSeeMore } from "./_features/MovieSectionUpcomingSeeMore";

const ApiLink =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieSectionUpcoming = (props) => {
  const { title } = props;
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [seeMoreUpcoming, setSeeMoreUpcoming] = useState(1);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    // console.log(jsonData);
    setUpcomingMovieData(jsonData.results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(upcomingMovieData);

  if (loading) {
    return (
      <div className="flex flex-col gap-[36px] items-center">
        <div className=" w-[1275px] flex items-center justify-between ">
          <div className="w-[250px] h-[32px] bg-white rounded-[5px]"></div>
          <div className="w-[165px] h-[32px] bg-white rounded-[5px]"></div>
        </div>
        <div className="w-[1440px] flex flex-wrap gap-[32px] justify-center">
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
          <div className="w-[230px] h-[439px] rounded-[5px] bg-white"></div>
        </div>
      </div>
    );
  }
  if (!loading && typeof upcomingMovieData === "undefined") {
    return <div className="text-black text-[100px]">Something wrong Test</div>;
  }

  // const seeMore = () => {
  //   setSeeMoreUpcoming(seeMoreUpcoming + 1);
  // };

  return (
    <div className=" flex flex-col gap-[36px] justify-center items-center max-sm:gap-[32px]">
      <div className="w-[1275px] max-sm:w-[335px]">
        <div className="flex items-center justify-between flex-row max-sm:w-[335px]">
          <p className="text-black text-[24px] font-semibold">{title}</p>
          <Link href={"/seeMoreUpcoming"}>
            <button className="text-black flex items-center gap-[14px] cursor-pointer">
              See more <SeeMore />
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-[32px] justify-center max-sm:gap-[20px] max-sm:w-[375px]">
        {upcomingMovieData.slice(0, 10).map((movie, index) => {
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
