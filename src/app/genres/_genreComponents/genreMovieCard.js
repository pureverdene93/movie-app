"use client";
import { useRouter } from "next/navigation";
import { SmallestRatingIcon } from "../_icons/smallestRatingIcon";

export const GenreMovieCard = (props) => {
  const { title, rating, imageSrc, upcomingMovieId } = props;

  const router = useRouter();

  const handleMovieDetail = () => {
    router.push(`/movie-details/${upcomingMovieId}`);
  };

  return (
    <div
      className="w-full h-auto bg-card rounded-md flex flex-col gap-1 sm:gap-2 hover:bg-accent transition-colors cursor-pointer"
      onClick={handleMovieDetail}
    >
      <img
        src={imageSrc}
        alt={title}
        className="object-cover w-full aspect-[2/3] rounded-md"
      />
      <div className="px-2 pb-2 flex flex-col gap-1">
        <p className="flex text-xs sm:text-sm text-foreground items-center">
          <span className="mr-1">
            <SmallestRatingIcon />
          </span>
          {rating}<span className="text-muted-foreground text-xs">/10</span>
        </p>
        <p className="text-foreground text-sm sm:text-base font-normal line-clamp-2">{title}</p>
      </div>
    </div>
  );
};
