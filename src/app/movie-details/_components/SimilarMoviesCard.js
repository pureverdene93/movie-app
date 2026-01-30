"use client";
import { RatingIconSmall } from "@/app/_icons/RatingIconSmall";
import Link from "next/link";

export const SimilarMovieCard = (props) => {
  const { imageSrc, rating, title, movieId } = props;

  return (
    <Link href={`/movie-details/${movieId}`} className="block">
      <div className="w-full h-auto bg-card rounded-md flex flex-col gap-1 sm:gap-2 hover:bg-accent transition-colors cursor-pointer">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-full aspect-[2/3] rounded-md"
        />
        <div className="px-2 pb-2 flex flex-col gap-1">
          <p className="flex text-xs sm:text-sm text-foreground items-center">
            <span className="mr-1">
              <RatingIconSmall />
            </span>
            {rating}<span className="text-muted-foreground text-xs">/10</span>
          </p>
          <p className="text-foreground text-sm sm:text-base font-normal line-clamp-2">{title}</p>
        </div>
      </div>
    </Link>
  );
};
