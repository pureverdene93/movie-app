"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const MovieCardSkeleton = ({ count = 10 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full h-auto rounded-md flex flex-col gap-1 sm:gap-2"
        >
          <Skeleton className="w-full aspect-[2/3] rounded-md" />
          <div className="px-2 flex flex-col gap-1">
            <Skeleton className="w-14 h-3 sm:h-4" />
            <Skeleton className="w-3/4 h-4 sm:h-5" />
          </div>
        </div>
      ))}
    </>
  );
};

export const GenreMovieCardSkeleton = ({ count = 20 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full h-auto rounded-md flex flex-col gap-2"
        >
          <Skeleton className="w-full aspect-[2/3] rounded-md" />
          <div className="flex flex-col gap-1">
            <Skeleton className="w-12 h-3" />
            <Skeleton className="w-3/4 h-4" />
          </div>
        </div>
      ))}
    </>
  );
};

export const MovieSectionSkeleton = ({ showSeeMore = true }) => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9 items-center w-full px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1275px] flex items-center justify-between">
        <Skeleton className="w-32 sm:w-40 lg:w-60 h-6 sm:h-7 lg:h-8 rounded-md" />
        {showSeeMore && <Skeleton className="w-20 sm:w-28 lg:w-40 h-6 sm:h-7 lg:h-8 rounded-md" />}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[1275px]">
        <MovieCardSkeleton count={10} />
      </div>
    </div>
  );
};

export const PaginatedMovieSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9 items-center w-full px-4 sm:px-6 lg:px-0">
      <div className="w-full max-w-[1275px] flex items-center justify-start">
        <Skeleton className="w-40 sm:w-52 lg:w-60 h-6 sm:h-7 lg:h-8 rounded-md" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-[1275px]">
        <MovieCardSkeleton count={20} />
      </div>
      <div className="w-full max-w-[1275px] flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 lg:gap-5">
        <Skeleton className="w-24 sm:w-28 h-9 sm:h-10 rounded-md" />
        <div className="flex gap-1 sm:gap-2">
          <Skeleton className="w-9 sm:w-10 h-9 sm:h-10 rounded-md" />
          <Skeleton className="w-9 sm:w-10 h-9 sm:h-10 rounded-md" />
          <Skeleton className="w-9 sm:w-10 h-9 sm:h-10 rounded-md" />
        </div>
        <Skeleton className="w-20 sm:w-24 h-9 sm:h-10 rounded-md" />
      </div>
    </div>
  );
};

export const MovieDetailSkeleton = () => {
  return (
    <div className="w-full max-w-[1080px] mt-8 sm:mt-10 lg:mt-13 mb-16 sm:mb-20 lg:mb-24 gap-6 sm:gap-8 flex flex-col px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-48 sm:w-64 lg:w-80 h-7 sm:h-8 rounded-md" />
          <Skeleton className="w-20 sm:w-24 h-5 rounded-md" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="w-16 sm:w-20 h-4 rounded-md" />
          <Skeleton className="w-10 sm:w-12 h-4 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8">
        <Skeleton className="w-full md:w-72 lg:w-72 aspect-[2/3] rounded-md" />
        <Skeleton className="w-full md:flex-1 aspect-video rounded-md" />
      </div>
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Skeleton className="w-14 sm:w-16 h-5 sm:h-6 rounded-full" />
          <Skeleton className="w-18 sm:w-20 h-5 sm:h-6 rounded-full" />
          <Skeleton className="w-16 sm:w-18 h-5 sm:h-6 rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 sm:h-5 w-full rounded-md" />
          <Skeleton className="h-4 sm:h-5 w-3/4 rounded-md" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 lg:gap-40">
          <Skeleton className="h-5 w-16 sm:w-18 rounded-md" />
          <Skeleton className="h-5 w-28 sm:w-32 rounded-md" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16 lg:gap-36">
          <Skeleton className="h-5 w-28 sm:w-32 rounded-md" />
          <Skeleton className="h-5 w-40 sm:w-52 rounded-md" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <Skeleton className="w-32 sm:w-48 lg:w-60 h-6 sm:h-7 rounded-md" />
        <Skeleton className="w-24 sm:w-36 lg:w-48 h-6 sm:h-7 rounded-md" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-[2/3] rounded-md" />
            <Skeleton className="w-3/4 h-4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const GenreSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 mb-8 w-full px-4 sm:px-6 lg:px-0">
      <Skeleton className="w-40 sm:w-48 h-7 sm:h-8 rounded-md mt-10 sm:mt-12 lg:mt-14" />
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row gap-6 lg:gap-8">
        <Skeleton className="w-full lg:w-96 aspect-square lg:aspect-[3/4] rounded-md" />
        <div className="flex flex-col gap-6 sm:gap-8 flex-1">
          <Skeleton className="w-48 sm:w-64 lg:w-72 h-6 sm:h-8 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <GenreMovieCardSkeleton count={8} />
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-5">
            <Skeleton className="w-24 sm:w-28 h-9 sm:h-10 rounded-md" />
            <Skeleton className="w-20 sm:w-24 h-9 sm:h-10 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className="mt-10 sm:mt-12 lg:mt-13 flex flex-col gap-6 sm:gap-8 mb-8 w-full px-4 sm:px-6 lg:px-0">
      <Skeleton className="w-40 sm:w-48 h-8 sm:h-9 rounded-md" />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex flex-col gap-6 sm:gap-8 flex-1">
          <Skeleton className="w-48 sm:w-64 lg:w-72 h-6 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <GenreMovieCardSkeleton count={12} />
          </div>
        </div>
        <Skeleton className="w-px h-px lg:h-96 hidden lg:block" />
        <div className="flex flex-col gap-4 sm:gap-5 w-full lg:w-96">
          <Skeleton className="w-32 sm:w-36 h-6 rounded-md" />
          <Skeleton className="w-24 sm:w-28 h-4 rounded-md" />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-16 sm:w-20 h-5 sm:h-6 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
