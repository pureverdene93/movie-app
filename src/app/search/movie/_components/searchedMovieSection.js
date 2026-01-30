"use client";
import { GenreMovieCard } from "@/app/genres/_genreComponents/genreMovieCard";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GenresIcon } from "@/app/_icons/GenresIcon";
import { SearchSkeleton } from "@/components/ui/MovieCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";

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
  const genreApi = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [searchResults, setSearchResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [genreTitleData, setGenreTitleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const apiSearch = `https://api.themoviedb.org/3/search/movie?query=${getSearchParams}&language=en-US&page=${page}`;
    const data = await fetch(apiSearch, options);
    const jsonData = await data.json();
    setSearchData(jsonData.results);
    setSearchResults(jsonData.total_results);
    setTotalPages(Math.min(jsonData.total_pages, 500));

    const genreData = await fetch(genreApi, options);
    const genreJsonData = await genreData.json();
    setGenreTitleData(genreJsonData.genres);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setPage(1);
  }, [getSearchParams]);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getSearchParams, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <SearchSkeleton />;
  }

  return (
    <div className="mt-8 sm:mt-10 lg:mt-13 flex flex-col gap-6 sm:gap-8 mb-8 w-full max-w-[1280px] px-4 sm:px-6 lg:px-0">
      <p className="text-2xl sm:text-[28px] lg:text-[30px] text-foreground font-semibold">
        Search results
      </p>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex flex-col gap-6 sm:gap-8 flex-1">
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
            {searchResults} results for &ldquo;{getSearchParams}&rdquo;
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {searchData.map((search, index) => {
              return (
                <GenreMovieCard
                  key={index}
                  title={search.title}
                  rating={search.vote_average?.toFixed(1)}
                  imageSrc={`https://image.tmdb.org/t/p/original${search.poster_path}`}
                  upcomingMovieId={search.id}
                />
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              maxVisiblePages={5}
            />
          )}
        </div>
        <div className="w-full h-px lg:w-px lg:h-auto bg-border"></div>
        <div className="flex flex-col gap-5 lg:w-96">
          <div>
            <p className="text-foreground text-xl sm:text-2xl font-semibold">
              Search by genre
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {genreTitleData.map((genres) => {
              return (
                <Link href={`/genres/${genres.id}`} key={genres.id}>
                  <button
                    className="text-foreground text-xs sm:text-sm font-semibold flex flex-row border border-border justify-center
                    items-center cursor-pointer rounded-full gap-1.5 py-1 px-2.5 sm:px-3 hover:bg-accent transition-colors"
                  >
                    {genres.name}
                    <GenresIcon />
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
