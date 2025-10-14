"use client";

import { RatingIcon } from "../_icons/ratingIcon";
import { PlayBtn } from "../_icons/playbtn";
import { NextIcon } from "../_icons/nextIcon";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { PrevIcon } from "../_icons/PrevIcon";
import { PlayBtnLight } from "../_icons/PlayBtnLight";
import { Slice } from "lucide-react";

const ApiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const HeroSLider = () => {
  const [heroSliderData, setHeroSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderMovieTrailer, setSliderMovieTrailer] = useState(null);
  const [currentSlider, setCurrentSlider] = useState(0);
  // const [saveInputData, setSaveInputData] = useState("");
  // const [error, setError] = useState(null);

  const sliderRef = useRef(null);
  const slideWidth = 1440;

  const getData = async () => {
    setLoading(true);
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setHeroSliderData(jsonData.results);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, []);

  const heroSliderNextButton = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
      setCurrentSlider((prev) => prev + 1);
    }
    setSliderMovieTrailer(null);
  };

  const heroSliderPrevButton = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -slideWidth,
        behavior: "smooth",
      });
      setCurrentSlider((prev) => prev - 1);
    }
    setSliderMovieTrailer(null);
  };

  // console.log("This is hero slider data", heroSliderData);

  if (loading) {
    return (
      <div className="w-[1440px] h-[600px] bg-white animate-spin text-[100px] flex items-center justify-center">
        Loading hiijiin
      </div>
    );
  }
  if (!loading && typeof heroSliderData === "undefined") {
    return (
      <div className="text-black text-[100px]">...something wrong test</div>
    );
  }

  const trailerDisplay = async (id) => {
    const trailerPlay = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const trailerData = await trailerPlay.json();
    const youtubeTrailer = trailerData.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (youtubeTrailer) {
      setSliderMovieTrailer(youtubeTrailer.key);
    } else {
      setSliderMovieTrailer(null);
    }
    // console.log(youtubeTrailer);
  };

  console.log("this is slider movie trailer", sliderMovieTrailer);

  // const movie = heroSliderData(heroSliderNext);
  // console.log(movie);

  return (
    <div
      className="flex justify-center items-center flex-col relative w-[1440px]
    max-sm:w-[375px] "
    >
      <div
        className="flex flex-row  overflow-hidden relative w-[1440px]
      max-sm:w-[375px] max-sm:flex-col"
      >
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory max-sm:h-[500px]"
        >
          {heroSliderData.map((movie) => {
            return (
              <div
                className="w-[1440px] aspect-[1440/625] relative z-[16] flex items-center justify-between  shrink-0 snap-start
                max-sm:w-[375px] max-sm:h-[475px] max-sm:flex-col "
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="aspect-[1440/625]  object-cover absolute z-[-1] shrink-0
                  max-sm:w-[375px] max-sm:h-[246px] max-sm:relative"
                  alt="HeroSlider"
                />

                <div className="flex flex-row items-center ml-[44px] max-sm:ml-[0]">
                  {currentSlider > 0 && (
                    <button
                      className="absolute w-[40px] h-[40px] bg-white text-black rounded-[100%] flex items-center justify-center cursor-pointer mr-[44px]
                      max-sm:hidden"
                      onClick={heroSliderPrevButton}
                    >
                      <PrevIcon />
                    </button>
                  )}
                  <div className="ml-[70px] max-sm:ml-0">
                    <div className="flex flex-col ">
                      <p className="text-[16px] text-white max-sm:text-black max-sm:text-[14px]">
                        Now Playing:
                      </p>
                      <p className="text-[36px] text-white w-[400px] max-sm:text-black max-sm:text-[24px] max-sm:w-[337px]">
                        {movie.title}
                      </p>
                      <p className="flex items-center gap-[5px] text-white max-sm:text-black">
                        <RatingIcon /> {movie.vote_average.toFixed(1)}
                        <span className="text-zinc-400">/10</span>
                      </p>
                    </div>
                    <div className="flex flex-col gap-[16px] text-[14px]">
                      <p className="w-[400px] text-white max-sm:text-black max-sm:w-[337px]">
                        {String(movie.overview).length > 120
                          ? String(movie.overview).slice(0, 120) + "..."
                          : String(movie.overview) || "No overview here"}
                      </p>

                      <button
                        className="w-[145px] h-[40px] flex items-center 
                        justify-evenly rounded-[5px] bg-white text-black text-[16px] cursor-pointer
                        max-sm:bg-black max-sm:text-white max-sm:text-[14px]"
                        onClick={() => trailerDisplay(movie.id)}
                      >
                        <PlayBtn /> Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="w-[40px] h-[40px] bg-white text-black rounded-[100%] flex items-center justify-center cursor-pointer mr-[44px]
                  max-sm:hidden"
                  onClick={heroSliderNextButton}
                >
                  <NextIcon />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {sliderMovieTrailer && (
        <>
          {/* <button
            className="text-white text-[20px]"
            onClick={() => setSliderMovieTrailer(null)}
          >
            X
          </button> */}
          <iframe
            className="youtubeTrailer"
            src={`https://www.youtube.com/embed/${sliderMovieTrailer}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  );
};
