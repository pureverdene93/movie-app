"use client";
import { RatingIconSmall } from "../_icons/RatingIconSmall";
import { useRouter } from "next/navigation";

export const MovieCard = (props) => {
  const { title, rating, imageSrc, upcomingMovieId } = props;

  // console.log("upcoming movie id", upcomingMovieId);

  const router = useRouter();

  const handleMovieDetail = () => {
    router.push(`/movie-details/${upcomingMovieId}`);
  };

  return (
    <div
      className="w-[230px] h-[439px] bg-white rounded-[5px] flex flex-col gap-[8px]  hover:bg-zinc-300
    max-sm:w-[157px] max-sm:h-[309px] max-sm:gap-[2px]"
    >
      <button className="cursor-pointer">
        <img
          src={imageSrc}
          alt="Image Not Found"
          className="object-cover w-[230px] h-[340px] rounded-[5px]
          max-sm:w-[157px] max-sm:h-[233px]"
          onClick={handleMovieDetail}
        />
      </button>
      <div className="ml-[8px] flex flex-col gap-[5px] max-sm:gap-[1px]">
        <p className="flex text-[14px] text-black items-center">
          <span className="mr-[5px]">
            <RatingIconSmall />
          </span>
          10 <span className="text-zinc-400 text-[13px] ">/{rating}</span>
        </p>
        <p className="text-black text-[16px] font-[350] max-sm:text-[13px] max-sm:font-[400]">
          {title}
        </p>
      </div>
    </div>
  );
};
