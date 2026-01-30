"use client";
import { useEffect, useState } from "react";
import { DownIcon } from "../_icons/downIcon";
import { SearchIcon } from "../_icons/searchIcon";
import { GenresIcon } from "../_icons/GenresIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SmallestRatingIcon } from "../genres/_icons/smallestRatingIcon";
import { SeeMore } from "../_icons/SeeMoreIcon";
import { MajorLogoIcon } from "../_icons/MajorLogoIcon";
import { ModeToggle } from "./toggleButton";
import { Search, Menu, X } from "lucide-react";

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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${saveInputString}&language=en-US&page=${1}`;

  const movieSearch = (event) => {
    setSaveInputString(event.target.value);
    setGenreBtn(false);
  };

  const getdata = async () => {
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setMovieGenre(jsonData.genres);

    if (saveInputString.length > 0) {
      const searchData = await fetch(apiSearch, options);
      const jsonSearchData = await searchData.json();
      setSearchData(jsonSearchData.results || []);
    }
  };

  useEffect(() => {
    getdata();
  }, [saveInputString]);

  const handleGenre = () => {
    setGenreBtn(!genreBtn);
    setSaveInputString("");
  };

  const goGenre = (id) => {
    router.push(`/genres/${id}`);
    setGenreBtn(false);
  };

  const handleSeeAllSearched = () => {
    router.push(`/search/movie?query=${saveInputString}&language=en-US&page=1`);
    setSaveInputString("");
    setMobileSearchOpen(false);
  };

  return (
    <div className="w-full max-w-[1280px] h-[59px] flex flex-row justify-between items-center relative z-[100] px-4 sm:px-6 lg:px-0">
      {/* Desktop Logo - hidden on mobile/tablet */}
      <Link href={"/"} className="hidden lg:block">
        <button className="cursor-pointer">
          <MajorLogoIcon />
        </button>
      </Link>

      {/* Desktop Navigation - hidden on mobile/tablet */}
      <div className="hidden lg:flex gap-3 relative">
        <button
          className="flex items-center justify-center gap-2 w-24 h-9 text-foreground rounded-md cursor-pointer text-sm border border-border hover:bg-accent transition-colors"
          onClick={handleGenre}
        >
          <DownIcon />
          Genre
        </button>

        {genreBtn && (
          <div className="w-[500px] xl:w-[577px] min-h-[300px] absolute bg-popover border border-border z-[99] flex items-center flex-col gap-5 justify-center mt-10 pt-5 rounded-lg shadow-lg">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-foreground text-xl xl:text-2xl font-semibold">Genres</p>
                <p className="text-muted-foreground text-sm xl:text-base">
                  See lists of movies by genre
                </p>
              </div>
              <div className="w-full h-px bg-border"></div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3 xl:gap-4 pb-5 px-4">
              {movieGenre.map((movieGenres, index) => {
                return (
                  <button
                    className="text-foreground min-w-16 h-5 text-xs font-semibold flex flex-row border border-border justify-center items-center cursor-pointer rounded-full gap-2 pr-1.5 pl-2.5 hover:bg-accent transition-colors"
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
        )}

        <div className="w-[280px] xl:w-[379px] h-9 border border-border rounded-md flex items-center justify-center relative bg-background">
          <SearchIcon />
          <input
            className="w-full h-9 rounded-md text-foreground bg-transparent pl-2.5 text-sm inline-block focus:outline-none placeholder:text-muted-foreground"
            placeholder="Search.."
            type="search"
            value={saveInputString}
            onChange={movieSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter" && saveInputString.trim().length > 0) {
                handleSeeAllSearched();
              }
            }}
          />

          {saveInputString.length > 0 && (
            <>
              {searchData.length > 0 ? (
                <div className="w-[450px] xl:w-[577px] max-h-[690px] bg-popover border border-border absolute top-full mt-2 rounded-md flex flex-col overflow-y-auto gap-1 items-center pt-5 shadow-lg">
                  {searchData.slice(0, 5).map((search, index) => {
                    return (
                      <div
                        className="w-[420px] xl:w-[540px] flex flex-col gap-1"
                        key={index}
                      >
                        <div className="flex flex-row gap-4">
                          <img
                            className="w-16 xl:w-[70px] h-24 xl:h-[110px] object-cover rounded-md"
                            src={`https://image.tmdb.org/t/p/original/${search.backdrop_path}`}
                            alt={search.title}
                          />
                          <div className="flex flex-1">
                            <div className="flex flex-col gap-1 flex-1">
                              <p className="text-foreground text-sm xl:text-[15px] font-semibold">
                                {search.title}
                              </p>
                              <p className="flex items-center text-xs xl:text-[13px] text-muted-foreground">
                                <SmallestRatingIcon />
                                <span className="text-foreground text-sm font-normal">
                                  {search.vote_average?.toFixed(1)}
                                </span>
                                /10
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {search.release_date}
                              </p>
                            </div>
                            <div className="flex items-end">
                              <Link href={`/movie-details/${search.id}`}>
                                <button className="w-28 h-9 flex cursor-pointer items-center flex-row text-sm text-foreground justify-evenly hover:bg-accent rounded transition-colors">
                                  See More <SeeMore />
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="h-px bg-border my-2"></div>
                      </div>
                    );
                  })}
                  <div className="w-full px-4 flex justify-between items-center h-14">
                    <p
                      className="text-foreground text-sm flex text-start cursor-pointer hover:underline"
                      onClick={handleSeeAllSearched}
                    >
                      See all results for &ldquo;{saveInputString}&rdquo;
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-[450px] xl:w-[577px] h-24 bg-popover border border-border flex justify-center items-center absolute top-full mt-2 rounded-md text-muted-foreground text-sm shadow-lg">
                  No results found.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Navigation - visible on mobile and tablet */}
      <div className="flex lg:hidden items-center justify-between w-full">
        <Link href={"/"}>
          <MajorLogoIcon />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
          >
            {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <button
            onClick={handleGenre}
            className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
          >
            <Menu size={20} />
          </button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile/Tablet Genre Menu */}
      {genreBtn && (
        <div className="lg:hidden fixed inset-0 bg-background z-[200] flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-foreground text-lg font-semibold">Genres</p>
            <button
              onClick={() => setGenreBtn(false)}
              className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-muted-foreground text-sm mb-4">See lists of movies by genre</p>
          <div className="flex flex-wrap gap-2">
            {movieGenre.map((movieGenres, index) => (
              <button
                className="text-foreground text-xs font-medium flex flex-row border border-border justify-center items-center cursor-pointer rounded-full gap-1 py-1.5 px-3 hover:bg-accent transition-colors"
                key={index}
                onClick={() => goGenre(movieGenres.id)}
              >
                {movieGenres.name}
                <GenresIcon />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile/Tablet Search Overlay */}
      {mobileSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-background z-[200] flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-foreground font-semibold">Search</p>
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 text-foreground hover:bg-accent rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center border border-border rounded-lg px-3 bg-card">
            <Search size={20} className="text-muted-foreground" />
            <input
              className="flex-1 h-11 bg-transparent pl-3 text-foreground focus:outline-none placeholder:text-muted-foreground"
              placeholder="Search movies..."
              type="search"
              value={saveInputString}
              onChange={movieSearch}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && saveInputString.trim().length > 0) {
                  handleSeeAllSearched();
                }
              }}
            />
          </div>

          {saveInputString.length > 0 && searchData.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 overflow-y-auto">
              {searchData.slice(0, 10).map((search, index) => (
                <Link
                  href={`/movie-details/${search.id}`}
                  key={index}
                  onClick={() => setMobileSearchOpen(false)}
                >
                  <div className="flex gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                    <img
                      className="w-12 sm:w-14 h-18 sm:h-20 object-cover rounded"
                      src={`https://image.tmdb.org/t/p/w200/${search.poster_path}`}
                      alt={search.title}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-foreground font-medium text-sm">{search.title}</p>
                      <p className="text-muted-foreground text-xs">{search.release_date}</p>
                      <p className="text-muted-foreground text-xs">
                        ⭐ {search.vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <button
                className="text-primary text-sm py-2 hover:underline"
                onClick={handleSeeAllSearched}
              >
                See all results
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop Mode Toggle - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <ModeToggle />
      </div>
    </div>
  );
};
