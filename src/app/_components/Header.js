"use client";
import { useEffect, useState } from "react";
import { DownIcon } from "../_icons/downIcon";
import { SearchIcon } from "../_icons/searchIcon";
import { GenresIcon } from "../_icons/GenresIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SmallestRatingIcon } from "../genres/_icons/smallestRatingIcon";
import { SeeMore } from "../_icons/SeeMoreIcon";
import { DarkModeIcon } from "../_icons/DarkModeIcon";
import { MajorLogoIcon } from "../_icons/MajorLogoIcon";
// import { Button } from "../../../@/components/ui/button";
// import { useRouter } from "next/navigation";

const ApiLink = "https://api.themoviedb.org/3/genre/movie/list?language=en";

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
  const [saveInputString, setSaveInputString] = useState("");
  const [searchData, setSearchData] = useState([]);

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${saveInputString}&language=en-US&page=${1}`;

  console.log("is input working", saveInputString);
  console.log("is search working", searchData);

  const movieSearch = (event) => {
    setSaveInputString(event.target.value);
  };

  const getdata = async () => {
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setMovieGenre(jsonData.genres);

    const searchData = await fetch(apiSearch, options);
    const jsonSearchData = await searchData.json();
    setSearchData(jsonSearchData.results);
    console.log("input string", saveInputString);
  };

  useEffect(() => {
    getdata();
  }, [saveInputString]);

  const handleGenre = () => {
    setGenreBtn(!genreBtn);
  };

  const goGenre = (id) => {
    router.push(`/genres/${id}`);
  };
  console.log();
  const handleSeeAllSearched = () => {
    router.push(`/search/movie?query=${saveInputString}&language=en-US&page=1`);
  };

  return (
    <div className="w-[1280px] h-[59px] flex flex-row justify-between items-center relative z-[100]">
      <Link href={"/"}>
        <button className="cursor-pointer">
          <MajorLogoIcon />
        </button>
      </Link>
      <div className="flex gap-[12px] relative">
        <button
          className="flex items-center justify-center gap-[8px] w-[97px] h-[36px] text-black
           rounded-[5px] cursor-pointer text-[14px] border-1 border-zinc-200"
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
                    className="text-black min-w-[64px] h-[20px] text-[12px] 
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
        <div
          className="w-[379px] h-[36px] border  rounded-[5px] flex items-center
         justify-center relative"
        >
          <SearchIcon />
          <input
            className="w-[341px] h-[36px] rounded-[5px] text-black
             pl-[10px] text-[14px] inline-block focus:outline-none"
            placeholder="Search.."
            type="search"
            onChange={movieSearch}
          />

          {saveInputString.length > 0 ? (
            <>
              {searchData.length > 0 ? (
                <>
                  <div
                    className="w-[577px] h-[690px] bg-white absolute mt-[730px]
             rounded-[5px] border border-zinc-300 flex flex-col
             overflow-scroll gap-[5px] items-center
             pt-[20px]"
                  >
                    {searchData.slice(0, 5).map((search, index) => {
                      return (
                        <div
                          className="w-[540px] h-[116px] flex flex-col gap-[5px]"
                          key={index}
                        >
                          <div className="flex flex-row gap-[16px]">
                            <img
                              className="w-[70px] h-[110px] object-cover rounded-[5px]"
                              src={`https://image.tmdb.org/t/p/original/${search.backdrop_path}`}
                            />
                            <div className="flex">
                              <div className="flex flex-col gap-[5px] w-[345px]">
                                <p className="text-black text-[15px] font-semibold">
                                  {search.title}
                                </p>
                                <p className="flex items-center text-[13px] text-zinc-300">
                                  <SmallestRatingIcon />
                                  <span className="text-black text-[14px] font-[400]">
                                    {search.vote_average?.toFixed(1)}
                                  </span>
                                  /10
                                </p>

                                <p className="text-[14px] text-black font-[400] ">
                                  {search.release_date}
                                </p>
                              </div>
                              <div className="flex items-end">
                                <Link href={`/movie-details/${search.id}`}>
                                  <button
                                    className="w-[120px] h-[36px] flex cursor-pointer
                             items-center flex-row
                             text-[14px] text-black justify-evenly"
                                  >
                                    See More <SeeMore />
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="h-[1px] bg-zinc-300"></div>
                        </div>
                      );
                    })}
                    <div className="w-[530px] flex justify-between items-center h-[55px] ">
                      <p
                        className="text-black text-[14px] flex text-start cursor-pointer"
                        onClick={handleSeeAllSearched}
                      >
                        See all results for "{saveInputString}"
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className="w-[577px] h-[95px] bg-white flex justify-center
                 items-center absolute rounded-[5px] border-zinc-300
                 text-black text-[14px] mt-[135px]"
                >
                  No results found.
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <button className="cursor-pointer">
        <DarkModeIcon />
      </button>
    </div>
  );
};
