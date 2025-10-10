"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_features/MovieCard";
import { MovieType } from "@/app/_features/MovieType";
import { NextNotWorkingIcon } from "@/app/_icons/NextNotWorking";
import { Next } from "@/app/seeMoreUpcoming/_icons/Next";
import { PrevNotWorkingIcon } from "@/app/_icons/prevNotWorkingIcon";
import { PrevIcon } from "@/app/_icons/PrevIcon";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MoreLikeThisSection = () => {
  const param = useParams();
  const { id } = param;
  console.log(id);

  const [similarData, setSimilarData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const similarMovieApiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;

  const getData = async () => {
    const data = await fetch(similarMovieApiLink, options);
    const jsonData = await data.json();
    setSimilarData(jsonData.results);
    setTotalPages(jsonData.total_pages);
    console.log(jsonData.results);
  };

  useEffect(() => {
    getData();
  }, [id, page]);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prePage = () => {
    if (page === 1) {
      setPage(page);
    }
    if (page > 1) {
      setPage(page - 1);
    }
    if (page === totalPages) {
      setPage(page);
    }
  };
  const pageNum = (num) => {
    setPage(num);
  };

  return (
    <div className="w-[1280px] flex gap-[32px] flex-col">
      <MovieType title={"More like this"} />
      <div className="flex flex-wrap justify-between w-full  gap-[32px]">
        {similarData.map((movie) => {
          return (
            <div key={movie.id}>
              <MovieCard
                title={movie.title}
                rating={movie.vote_average.toFixed(1)}
                imageSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                upcomingMovieId={movie.id}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-row items-center justify-end">
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
