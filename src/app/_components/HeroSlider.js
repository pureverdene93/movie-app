"use client";

import { RatingIcon } from "../_icons/ratingIcon";
import { PlayBtn } from "../_icons/playbtn";
import { NextIcon } from "../_icons/nextIcon";
import { useState, useEffect, useRef, useCallback } from "react";
import { PrevIcon } from "../_icons/PrevIcon";
import { Skeleton } from "@/components/ui/skeleton";

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

const HeroSliderSkeleton = () => {
  return (
    <div className="w-full max-w-[1440px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Skeleton className="w-full h-full absolute" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 lg:p-[44px] flex flex-col gap-3 md:gap-4">
        <Skeleton className="w-[80px] sm:w-[100px] h-[16px] sm:h-[20px]" />
        <Skeleton className="w-[200px] sm:w-[280px] md:w-[350px] h-[28px] sm:h-[36px] md:h-[40px]" />
        <Skeleton className="w-[100px] sm:w-[120px] h-[20px] sm:h-[24px]" />
        <Skeleton className="w-[250px] sm:w-[300px] md:w-[400px] h-[50px] sm:h-[60px]" />
        <Skeleton className="w-[130px] sm:w-[145px] h-[36px] sm:h-[40px]" />
      </div>
    </div>
  );
};

export const HeroSLider = () => {
  const [heroSliderData, setHeroSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderMovieTrailer, setSliderMovieTrailer] = useState(null);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };
    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  // Sync currentSlider with actual scroll position
  const handleScroll = useCallback(() => {
    if (sliderRef.current && slideWidth > 0) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentSlider(newIndex);
    }
  }, [slideWidth]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setHeroSliderData(jsonData.results);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getData();
  }, []);

  const heroSliderNextButton = () => {
    if (sliderRef.current && currentSlider < heroSliderData.length - 1) {
      const newIndex = currentSlider + 1;
      sliderRef.current.scrollTo({
        left: slideWidth * newIndex,
        behavior: "smooth",
      });
      setCurrentSlider(newIndex);
    }
    setSliderMovieTrailer(null);
  };

  const heroSliderPrevButton = () => {
    if (sliderRef.current && currentSlider > 0) {
      const newIndex = currentSlider - 1;
      sliderRef.current.scrollTo({
        left: slideWidth * newIndex,
        behavior: "smooth",
      });
      setCurrentSlider(newIndex);
    }
    setSliderMovieTrailer(null);
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
      setCurrentSlider(index);
    }
  };

  if (loading) {
    return <HeroSliderSkeleton />;
  }

  if (!loading && typeof heroSliderData === "undefined") {
    return (
      <div className="text-foreground text-[24px]">Something went wrong</div>
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
  };

  return (
    <div className="flex justify-center items-center flex-col relative w-full max-w-[1440px]">
      <div className="relative w-full">
        {/* Navigation Buttons - Always visible */}
        <button
          className={`absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all shadow-lg ${
            currentSlider === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={heroSliderPrevButton}
          disabled={currentSlider === 0}
          aria-label="Previous slide"
        >
          <PrevIcon />
        </button>

        <button
          className={`absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-white text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all shadow-lg ${
            currentSlider >= heroSliderData.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={heroSliderNextButton}
          disabled={currentSlider >= heroSliderData.length - 1}
          aria-label="Next slide"
        >
          <NextIcon />
        </button>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {heroSliderData.map((movie) => {
            return (
              <div
                className="w-full min-w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative flex items-end shrink-0 snap-start"
                key={movie.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="w-full h-full object-cover absolute inset-0"
                  alt={movie.title}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-[600px]">
                  <p className="text-xs sm:text-sm md:text-base text-white/80 mb-1 sm:mb-2">
                    Now Playing:
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-2 sm:mb-3 line-clamp-2">
                    {movie.title}
                  </h2>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white mb-3 sm:mb-4">
                    <RatingIcon />
                    <span className="text-sm sm:text-base font-medium">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm">/10</span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-5">
                    {movie.overview || "No overview available"}
                  </p>
                  <button
                    className="flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-black rounded-md text-sm sm:text-base font-medium cursor-pointer hover:bg-white/90 transition-colors"
                    onClick={() => trailerDisplay(movie.id)}
                  >
                    <PlayBtn />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4">
        {heroSliderData.slice(0, 10).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              currentSlider === index
                ? "bg-primary w-4 sm:w-6"
                : "bg-muted hover:bg-muted-foreground"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Trailer Modal - No aspect-ratio */}
      {sliderMovieTrailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-[900px]">
            <button
              onClick={() => setSliderMovieTrailer(null)}
              className="absolute -top-10 sm:-top-12 right-0 text-white cursor-pointer text-xl sm:text-2xl hover:opacity-70 transition-opacity"
              aria-label="Close trailer"
            >
              ✕
            </button>
            <iframe
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg"
              src={`https://www.youtube.com/embed/${sliderMovieTrailer}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
