"use client";
import { useRouter } from "next/navigation";
import { RatingIconSmall } from "@/app/_icons/RatingIconSmall";
import { SmallestRatingIcon } from "../_icons/smallestRatingIcon";

export const GenreMovieCard = (props) => {
  const { title, rating, imageSrc, upcomingMovieId } = props;

  // console.log("upcoming movie id", upcomingMovieId);

  const router = useRouter();

  const handleMovieDetail = () => {
    router.push(`/movie-details/${upcomingMovieId}`);
  };

  return (
    <div className="w-[165px] h-[331px] bg-white rounded-[5px] flex flex-col gap-[8px]">
      <button className="cursor-pointer">
        <img
          src={imageSrc}
          alt="Image Not Found"
          className="object-cover w-[165px] h-[244px] rounded-[5px]"
          onClick={handleMovieDetail}
        />
      </button>
      <div className="ml-[8px] flex flex-col gap-[5px]">
        <p className="flex text-[14px] text-black items-center">
          <span className="mr-[5px]">
            <SmallestRatingIcon />
          </span>
          10 <span className="text-zinc-400 text-[13px] ">/{rating}</span>
        </p>
        <p className="text-black text-[14px] font-[350] ">{title}</p>
      </div>
    </div>
  );
};
