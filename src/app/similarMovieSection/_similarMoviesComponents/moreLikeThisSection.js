"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/_features/MovieCard";
import { PaginatedMovieSkeleton } from "@/components/ui/MovieCardSkeleton";
import { Pagination } from "@/components/ui/Pagination";

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

  const [similarData, setSimilarData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const similarMovieApiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;
    const data = await fetch(similarMovieApiLink, options);
    const jsonData = await data.json();
    setSimilarData(jsonData.results || []);
    setTotalPages(Math.min(jsonData.total_pages || 1, 500));
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <PaginatedMovieSkeleton />;
  }

  if (!loading && typeof similarData === "undefined") {
    return <div className="text-foreground text-2xl">Something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9 justify-center items-center w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-[1275px]">
        <div className="flex items-center justify-between flex-row">
          <p className="text-foreground text-lg sm:text-xl lg:text-2xl font-semibold">More like this</p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Page {page} of {totalPages}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[1275px]">
        {similarData.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              imageSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              upcomingMovieId={movie.id}
            />
          );
        })}
      </div>
      <div className="w-full max-w-[1275px]">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
};
