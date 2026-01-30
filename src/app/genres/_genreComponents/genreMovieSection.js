"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GenreMovieCard } from "./genreMovieCard";
import { GenresIcon } from "@/app/_icons/GenresIcon";
import Link from "next/link";
import { GenreSectionSkeleton } from "@/components/ui/MovieCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";

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
  const genreNameApiLink =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const [genreData, setGenreData] = useState([]);
  const [genreTitleData, setGenreTitleData] = useState([]);
  const [totalResults, setTotalResults] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const genreSearchApiLink = `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${id}&page=${page}`;
    const data = await fetch(genreSearchApiLink, options);
    const jsonData = await data.json();
    setGenreData(jsonData.results);
    setTotalResults(jsonData.total_results);
    setTotalPages(Math.min(jsonData.total_pages, 500));

    const genreData = await fetch(genreNameApiLink, options);
    const genreJsonData = await genreData.json();
    setGenreTitleData(genreJsonData.genres);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setPage(1);
  }, [id]);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <GenreSectionSkeleton />;
  }

  const currentGenreName = genreTitleData.find((g) => g.id === parseInt(id))?.name || "";

  return (
    <div className="w-full max-w-[1280px] flex flex-col gap-6 sm:gap-8 mt-8 sm:mt-10 lg:mt-13 mb-8 px-4 sm:px-6 lg:px-0">
      <p className="text-foreground text-2xl sm:text-[28px] lg:text-[30px] font-semibold">Search filter</p>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex flex-col gap-5 lg:w-[380px]">
          <div>
            <p className="text-foreground text-xl sm:text-2xl font-semibold">Genres</p>
            <p className="text-muted-foreground text-sm sm:text-base font-light">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {genreTitleData.map((genres) => {
              const isActive = genres.id === parseInt(id);
              return (
                <Link href={`/genres/${genres.id}`} key={genres.id}>
                  <button
                    className={`text-xs sm:text-sm font-semibold flex flex-row border justify-center
                    items-center cursor-pointer rounded-full gap-1.5 py-1 px-2.5 sm:px-3
                    transition-colors ${isActive ? "bg-primary text-primary-foreground border-primary" : "text-foreground border-border hover:bg-accent"}`}
                  >
                    {genres.name}
                    <GenresIcon />
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-full h-px lg:w-px lg:h-auto bg-border"></div>
        <div className="flex flex-col gap-6 sm:gap-8 flex-1">
          <p className="text-foreground text-base sm:text-lg lg:text-xl font-semibold">
            {totalResults} titles in {currentGenreName}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {genreData.map((movie, index) => {
              return (
                <GenreMovieCard
                  key={index}
                  title={movie.title}
                  rating={movie.vote_average.toFixed(1)}
                  imageSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  upcomingMovieId={movie.id}
                />
              );
            })}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
};
