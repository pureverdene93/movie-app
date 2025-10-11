"use client";
import { useParams } from "next/navigation";
import { MovieCard } from "@/app/_features/MovieCard";
import { useEffect, useState } from "react";
import { GenreMovieCard } from "./genreMovieCard";
import { GenresIcon } from "@/app/_icons/GenresIcon";
import Link from "next/link";
import { PrevNotWorkingIcon } from "@/app/_icons/prevNotWorkingIcon";
import { PrevIcon } from "@/app/_icons/PrevIcon";
import { NextNotWorkingIcon } from "@/app/_icons/NextNotWorking";
import { Next } from "@/app/seeMoreUpcoming/_icons/Next";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const GenreMovieSecton = () => {
  const param = useParams();
  const { id } = param;
  const [page, setPage] = useState(1);
  const genreSearchApiLink = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;
  const genreNameApiLink =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const [genreData, setGenreData] = useState([]);
  const [genreTitleData, setGenreTitleData] = useState([]);
  const [totalResults, setTotalResults] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(genreSearchApiLink, options);
    const jsonData = await data.json();
    setGenreData(jsonData.results);
    setTotalResults(jsonData.total_results);
    console.log("hahahah", jsonData);

    const genreData = await fetch(genreNameApiLink, options);
    const genreJsonData = await genreData.json();
    setGenreTitleData(genreJsonData.genres);
    console.log("genre yu butsaaj baina", genreJsonData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, [id, page]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prePage = () => {
    if (page === 1) {
      setPage(1);
    }
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const pageNum = (num) => {
    setPage(num);
  };
  if (loading) {
    return (
      <div className="flex flex-col gap-[32px] mb-[32px]">
        <div className="w-[200px] h-[32px] bg-white rounded-[5px] mt-[56px]"></div>
        <div className="w-[1280px] flex flex-row justify-between">
          <div className="w-[378px] h-[350px] rounded-[5px] bg-white"></div>
          <div className="flex flex-col gap-[32px] w-[806px]">
            <div className="bg-white w-[280px] h-[32px] rounded-[5px]"></div>
            <div className="flex flex-wrap gap-[48px]">
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
              <div className="w-[165px] h-[331px] rounded-[5px] bg-white"></div>
            </div>
            <div className="w-[806px] items-end justify-end flex flex-row gap-[100px]">
              <div className="w-[114px] h-[24px] bg-white rounded-[5px]"></div>
              <div className="w-[88px] h-[24px] bg-white rounded-[5px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // console.log("this is genre data", genreData);
  // console.log("major id", id);

  return (
    <div className="w-[1280px] flex flex-col gap-[32px] mt-[52px] mb-[32px]">
      <p className="text-[black] text-[30px] font-semibold">Search filter</p>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-[20px]">
          <div>
            <p className="text-black text-[24px] font-semibold">Genres</p>
            <p className="text-black text-[16px] font-[300]">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex flex-wrap w-[378px] gap-[16px]">
            {genreTitleData.map((genres) => {
              return (
                <div className="h-[20px]" key={genres.id}>
                  <Link href={`/genres/${genres.id}`}>
                    <button
                      className="text-black min-w-[64px] h-[20px] text-[12px] 
                font-semibold flex flex-row border justify-center 
                items-center cursor-pointer rounded-[20px] gap-[8px] pr-[5px] pl-[10px]
                border-zinc-500"
                    >
                      {genres.name}
                      <GenresIcon />
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[1px] bg-zinc-300"></div>
        <div className="flex flex-col gap-[32px]">
          {genreTitleData.slice(0, 1).map((index) => {
            return (
              <p className="text-black text-[20px] font-semibold" key={index}>
                {totalResults} titles in{" "}
                {genreTitleData.find((search) => search.id === parseInt(id))
                  ?.name || ""}
              </p>
            );
          })}
          <div className="w-[806px] flex flex-wrap gap-[48px]">
            {genreData.map((movie, index) => {
              return (
                <div key={index}>
                  <GenreMovieCard
                    title={movie.title}
                    rating={movie.vote_average.toFixed(1)}
                    imageSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    upcomingMovieId={movie.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center h-[40px] justify-end w-[1280px]">
        <button
          className={`w-[114px] [h-40px] text-[16px] flex items-center justify-center cursor-pointer gap-[2px] ${
            page === 1 ? "text-zinc-300" : "text-black"
          }`}
          onClick={prePage}
        >
          {page === 1 ? <PrevNotWorkingIcon /> : <PrevIcon />}
          Previous
        </button>
        <div className="flex flex-row gap-[5px]">
          {Array.from({ length: 4 }, (_, i) => {
            const num = i + 1;

            return (
              <button
                key={num}
                onClick={() => pageNum(num)}
                className={`px-3 py-1 cursor-pointer rounded-md ${
                  page === num ? "bg-black text-white" : "text-black border"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
        <button
          className={`w-[88px] h-[40px] text-[16px] flex items-center justify-center cursor-pointer gap-[2px] ${
            page === 4 ? "text-zinc-300" : "text-black"
          }`}
          onClick={nextPage}
        >
          Next
          {page === 4 ? <NextNotWorkingIcon /> : <Next />}
        </button>
      </div>
    </div>
  );
};
