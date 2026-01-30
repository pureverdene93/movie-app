"use client";
import "../../index.css";
import { useEffect, useState } from "react";
import { PlayBtn } from "@/app/_icons/playbtn";
import { useParams } from "next/navigation";
import { RatingIcon } from "@/app/_icons/ratingIcon";
import { CrewDetail } from "../_components/CrewDetail";
import { SimilarMovieCard } from "../_components/SimilarMoviesCard";
import { SeeMore } from "@/app/_icons/SeeMoreIcon";
import Link from "next/link";
import { MovieDetailSkeleton } from "@/components/ui/MovieCardSkeleton";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieDetailSection = () => {
  const param = useParams();
  const { id } = param;

  const [movieDetail, setMovieDetail] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieTeamDetailCrew, setMovieTeamDetailCrew] = useState([]);
  const [movieTeamDetailCast, setMovieTeamDetailCast] = useState([]);
  const [similarMovieData, setSimilarMovieData] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    if (!id) return;
    setLoader(true);
    const ApiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const movieTeam = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const similarMovieApiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setMovieDetail(jsonData);
    setMovieGenre(jsonData.genres || []);

    const teamData = await fetch(movieTeam, options);
    const teamJsonData = await teamData.json();
    setMovieTeamDetailCrew(teamJsonData.crew || []);
    setMovieTeamDetailCast(teamJsonData.cast || []);

    const similarMovieData = await fetch(similarMovieApiLink, options);
    const similarMovieJsonData = await similarMovieData.json();
    setSimilarMovieData(similarMovieJsonData.results || []);

    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  const handleTrailer = async () => {
    const trailerApi = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const trailerData = await fetch(trailerApi, options);
    const trailerJsonData = await trailerData.json();
    const findTrailerData = trailerJsonData.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );
    if (findTrailerData) {
      setTrailer(findTrailerData.key);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!id) {
    return <p className="text-foreground text-[24px]">Something went wrong</p>;
  }

  if (loader) {
    return <MovieDetailSkeleton />;
  }

  if (!loader && typeof movieDetail === "undefined") {
    return <div className="text-foreground text-[24px]">Something went wrong</div>;
  }

  const findDirector = movieTeamDetailCrew.find(
    (member) => member.department === "Directing"
  );
  const findWriter = movieTeamDetailCrew.find(
    (member) => member.department === "Writing"
  );

  return (
    <div className="flex flex-col mt-8 sm:mt-10 lg:mt-13 mb-16 sm:mb-20 lg:mb-24 gap-6 sm:gap-8 w-full max-w-[1080px] px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-foreground font-bold text-2xl sm:text-3xl lg:text-4xl">
              {movieDetail.title}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              {movieDetail.release_date} · {movieDetail.runtime} min
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Rating</p>
            <div className="flex flex-row items-center gap-1.5">
              <RatingIcon />
              <div className="flex flex-col">
                <p className="text-foreground">
                  {(movieDetail.vote_average ?? 0).toFixed(1)}
                  <span className="text-muted-foreground text-sm">/10</span>
                </p>
                <p className="text-muted-foreground text-xs">{movieDetail.vote_count}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
            className="w-full md:w-64 lg:w-72 aspect-[2/3] object-cover rounded-md"
            alt={movieDetail.title}
          />
          <div className="w-full md:flex-1 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[380px] relative z-0 flex items-end rounded-md overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
              className="w-full h-full object-cover absolute inset-0 z-[-1]"
              alt={movieDetail.title}
            />
            <div className="flex ml-4 sm:ml-6 mb-4 sm:mb-6 items-center gap-1.5">
              <button
                className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                onClick={() => handleTrailer(movieDetail.id)}
              >
                <PlayBtn />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {movieGenre.map((movie, index) => {
            return (
              <p
                className="text-foreground border-border border rounded-full h-6 flex
                justify-center items-center px-3 text-xs sm:text-sm font-semibold"
                key={index}
              >
                {movie.name}
              </p>
            );
          })}
        </div>
        <p className="text-sm sm:text-base text-muted-foreground font-light">
          {movieDetail.overview}
        </p>
        <CrewDetail
          job={"Director"}
          name={findDirector ? findDirector.name : "Unknown"}
        />
        <CrewDetail
          job={"Writers"}
          name={findWriter ? findWriter.name : "Unknown"}
        />
        <CrewDetail
          job={"Stars"}
          name={movieTeamDetailCast.slice(0, 3).map((movie) => movie.name).join(", ")}
        />
      </div>

      <div className="flex items-center justify-between flex-row">
        <p className="text-foreground text-lg sm:text-xl lg:text-2xl font-semibold">More like this</p>
        <Link href={`/similarMovieSection/${id}`}>
          <button className="text-foreground flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-70 transition-opacity text-sm sm:text-base">
            See more <SeeMore />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {similarMovieData.slice(0, 5).map((movie) => {
          return (
            <SimilarMovieCard
              key={movie.id}
              imageSrc={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              rating={movie.vote_average.toFixed(1)}
              title={movie.title}
              movieId={movie.id}
            />
          );
        })}
      </div>

      {trailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-[900px]">
            <button
              onClick={() => setTrailer(null)}
              className="absolute -top-10 sm:-top-12 right-0 text-white cursor-pointer text-xl sm:text-2xl hover:opacity-70 transition-opacity"
              aria-label="Close trailer"
            >
              ✕
            </button>
            <iframe
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
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
