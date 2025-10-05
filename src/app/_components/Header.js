"use client";
import { useEffect, useState } from "react";
import { DownIcon } from "../_icons/downIcon";
import { SearchIcon } from "../_icons/searchIcon";
import { GenresIcon } from "../_icons/GenresIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ApiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const SearchApiLink =
  "https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const Header = () => {
  const router = useRouter();
  const [movieGenre, setMovieGenre] = useState([]);
  const [genreBtn, setGenreBtn] = useState(false);
  const [genreId, setGenreId] = useState();
  const genreSearchApiLink = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${1}`;
  // const [searchData, setSearchData] = useState();
  // const [genreData, setGenreData] = useState();

  const getdata = async () => {
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setMovieGenre(jsonData.genres);
    setGenreId(movieGenre.id);

    // const fetchSearchData = await fetch(SearchApiLink, options);
    // const jsonSearchData = await fetchSearchData.json();
    // console.log("this is search data", jsonSearchData);

    const genreSearchData = await fetch(genreSearchApiLink, options);
    const jsonGenreSearchData = await genreSearchData.json();
    
    console.log("this is genre search data", jsonGenreSearchData);
  };
  useEffect(() => {
    getdata();
  }, []);

  const handleGenre = () => {
    setGenreBtn(!genreBtn);
  };
  // console.log("this is movie genre", movieGenre);
  console.log("this is genre id", genreId);

  const goGenre = () => {
    router.push(`/genres/${genreId}`);
  };

  return (
    <div className="w-[1280px] h-[59px] flex flex-row justify-between items-center relative">
      <img src="Logo.png" alt="logo" className="w-[92px] h-[20px]" />
      <div className="flex gap-[12px]">
        <button
          className="flex items-center justify-center gap-[8px] w-[97px] h-[36px] text-black rounded-[5px] cursor-pointer text-[14px] border-1 border-zinc-200"
          onClick={handleGenre}
        >
          <DownIcon />
          Genre
        </button>
        {genreBtn === true ? (
          <div
            className="w-[577px] min-h-[300px] absolute bg-zinc-100 z-[99] flex items-center
         flex-col gap-[20px] justify-center mt-[40px] pt-[20px]"
          >
            <div className="flex flex-col gap-[20px]">
              <div>
                <p className="text-black text-[24px] font-semibold">Genres</p>
                <p className="text-black text-[16px] font-[340]">
                  See lists of movies by genre
                </p>
              </div>
              <div className="w-[537px] h-[1px] bg-zinc-300"></div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-[16px] pb-[20px]">
              {movieGenre.map((movieGenres, index) => {
                return (
                  <button
                    className="text-black min-w-[64px] h-[30px] text-[12px] 
                font-semibold flex flex-row border justify-center 
                items-center cursor-pointer rounded-[20px] gap-[8px] pr-[5px] pl-[10px]
                border-zinc-500"
                    key={index}
                    onClick={() => goGenre(movieGenres.id)}
                  >
                    {movieGenres.name}
                    <GenresIcon />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="w-[379px] h-[36px] border  rounded-[5px] flex items-center justify-center">
          <SearchIcon />
          <input
            className="w-[341px] h-[36px] rounded-[5px] text-black pl-[10px] text-[14px] inline-block focus:outline-none"
            placeholder="Search.."
          />
        </div>
      </div>
      <button>
        <img
          src="Modes.png"
          alt="lightMode"
          className="w-[36px] h-[36px] cursor-pointer"
        />
      </button>
    </div>
  );
};
