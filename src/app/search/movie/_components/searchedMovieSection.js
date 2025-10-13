"use client";
import { GenreMovieCard } from "@/app/genres/_genreComponents/genreMovieCard";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { GenresIcon } from "@/app/_icons/GenresIcon";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const SearchedMovieSection = () => {
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("query");
  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${getSearchParams}&language=en-US&page=${1}`;
  const genreApi = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  console.log("what is this", getSearchParams);
  const [searchData, setSearchData] = useState([]);
  const [searchResults, setSearchResults] = useState(0);
  const [genreTitleData, setGenreTitleData] = useState([]);

  const getData = async () => {
    const data = await fetch(apiSearch, options);
    const jsonData = await data.json();
    setSearchData(jsonData.results);
    setSearchResults(jsonData.total_results);
    console.log("search data is here", jsonData);

    const genreData = await fetch(genreApi, options);
    const genreJsonData = await genreData.json();
    setGenreTitleData(genreJsonData.genres);
  };
  useEffect(() => {
    getData();
  }, [getSearchParams]);

  return (
    <div className="mt-[52px] flex flex-col gap-[32px] mb-[32px]">
      <p className="w-[1280px] text-[30px] text-black font-semibold">
        Search results
      </p>
      <div className="flex flex-row gap-[35px]">
        <div className="flex flex-col gap-[32px] w-[804px]">
          <p className="text-[20px] font-semibold text-black">
            {searchResults} results for "{getSearchParams}"
          </p>
          <div className="flex flex-wrap gap-[48px]">
            {searchData.map((search, index) => {
              return (
                <div key={index}>
                  <GenreMovieCard
                    title={search.title}
                    rating={search.vote_average?.toFixed(1)}
                    imageSrc={`https://image.tmdb.org/t/p/original${search.backdrop_path}`}
                    upcomingMovieId={search.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[1px] bg-zinc-300"></div>
        <div className="flex flex-col gap-[20px]">
          <div>
            <p className="text-black text-[24px] font-semibold">
              Search by genre
            </p>
            <p className="text-black text-[16px]">
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
                border-zinc-500 hover:bg-zinc-300"
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
      </div>
    </div>
  );
};
