"use client";

import { GenresIcon } from "@/app/_icons/GenresIcon";
import Link from "next/link";

export const GenreComponent = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div>
        <p className="text-black text-[24px] font-semibold">Genres</p>
        <p className="text-black text-[16px] font-[300]">
          See lists of movies by genre
        </p>
      </div>
      <div className="flex flex-wrap w-[378px] gap-[16px]">
        {genreTitleData.map((genres) => {
          return (
            <div className="h-[20px]" key={genres.id}>
              <Link href={`/genres/${genres.id}`}>
                <button
                  className="text-black min-w-[64px] h-[20px] text-[12px] 
                font-semibold flex flex-row border justify-center 
                items-center cursor-pointer rounded-[20px] gap-[8px] pr-[5px] pl-[10px]
                border-zinc-500"
                >
                  {genres.name}
                  <GenresIcon />
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
