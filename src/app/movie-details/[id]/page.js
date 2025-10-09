"use client";
import "../../index.css";
import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";
import { PlayBtn } from "@/app/_icons/playbtn";
import { useParams } from "next/navigation";
import { RatingIcon } from "@/app/_icons/ratingIcon";
import { CrewDetail } from "../_components/CrewDetail";
import { SimilarMovieCard } from "../_components/SimilarMoviesCard";
import { SeeMore } from "@/app/_icons/SeeMoreIcon";
import Link from "next/link";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const param = useParams();
  const { id } = param;
  if (!id) {
    return <p className="text-[100px]">Something went Wrong</p>;
  }
  // console.log("this is params", param);

  const ApiLink = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const movieTeam = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const similarMovieApiLink = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const trailerApi = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const [movieDetail, setMovieDetail] = useState({});
  const [movieGenre, setMovieGenre] = useState([]);
  const [movieTeamDetailCrew, setMovieTeamDetailCrew] = useState([]);
  const [movieTeamDetailCast, setMovieTeamDetailCast] = useState([]);
  const [similarMovieData, setSimilarMovieData] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const getData = async () => {
    const data = await fetch(ApiLink, options);
    const jsonData = await data.json();
    setMovieDetail(jsonData);
    setMovieGenre(jsonData.genres);

    const teamData = await fetch(movieTeam, options);
    const teamJsonData = await teamData.json();
    setMovieTeamDetailCrew(teamJsonData.crew);
    setMovieTeamDetailCast(teamJsonData.cast);

    const similarMovieData = await fetch(similarMovieApiLink, options);
    const similarMovieJsonData = await similarMovieData.json();
    setSimilarMovieData(similarMovieJsonData.results);

    // console.log("this is movie detail", jsonData.genres);
  };

  const handleTrailer = async () => {
    const trailerData = await fetch(trailerApi, options);
    const trailerJsonData = await trailerData.json();
    const findTrailerData = trailerJsonData.results.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );
    if (findTrailerData) {
      setTrailer(findTrailerData.key);
    } else {
      <div>Trailer </div>;
    }
    // console.log("this is trailer data", findTrailerData);
    // console.log("what is this", trailer);
  };

  console.log("this is similar movies data", similarMovieData);

  const findDirector = movieTeamDetailCrew.find(
    (member) => member.department === "Directing"
  );
  const findWriter = movieTeamDetailCrew.find(
    (member) => member.department === "Writing"
  );

  // console.log("director", findDirector);
  // console.log("writter", findWriter);
  // console.log("stars", movieTeamDetailCast);

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="back">
      <Header />
      <div className="flex flex-col mt-[52px] mb-[100px] gap-[32px] w-[1080px]">
        <div className=" flex flex-col gap-[40px]">
          <div className=" h-[72px] flex items-center justify-between">
            <div>
              <p className="text-black font-[700] text-[36px]">
                {movieDetail.title}
              </p>
              <p className="text-black">
                {movieDetail.release_date} {movieDetail.runtime}
              </p>
            </div>
            <div>
              <p className="text-black">Rating</p>
              <div className="flex flex-row items-center gap-[5px]">
                <RatingIcon />
                <div className="flex flex-col">
                  <p className="text-black">
                    {(movieDetail.vote_average ?? 0).toFixed(1)}
                    <span className="text-zinc-500 text-[14px]">/10</span>
                  </p>
                  <p className="text-black">{movieDetail.vote_count}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[32px]">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
              className="w-[290px] h-[428px] object-cover"
            />
            <div className="w-[760px] h-[428px] relative z-[0] flex items-end">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
                className="w-full h-full object-cover absolute z-[-1]"
              />
              <div className="flex ml-[24px] mb-[24px] items-center gap-[5px]">
                <button
                  className="cursor-pointer w-[40px] h-[40px] rounded-[100%] bg-white flex items-center justify-center "
                  onClick={() => handleTrailer(movieDetail.id)}
                >
                  <PlayBtn />
                </button>

                <p>Play Trailer </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[12px]">
            {movieGenre.map((movie, index) => {
              return (
                <p
                  className="text-black border-zinc-300 border rounded-[10px] h-[20px] flex
               justify-center items-center min-w-[50px] pl-[10px] pr-[10px] text-[12px]
               font-semibold"
                  key={index}
                >
                  {movie.name}
                </p>
              );
            })}
          </div>
          <p className="text-[16px] text-black font-[300]">
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
            name={movieTeamDetailCast.slice(0, 1).map((movie) => {
              return movie.name;
            })}
          />
        </div>
        <div className="flex items-center justify-between flex-row">
          <p className="text-black text-[24px] font-semibold">More like this</p>
          <Link href={`/similarMovieSection/${id}`}>
            <button className="text-black flex items-center gap-[14px] cursor-pointer">
              See more <SeeMore />
            </button>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-[10px]">
          {similarMovieData.slice(0, 5).map((movie) => {
            return (
              <div key={movie.id}>
                <SimilarMovieCard
                  imageSrc={` https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  rating={movie.vote_average.toFixed(1)}
                  title={movie.title}
                  movieId={movie.id}
                />
              </div>
            );
          })}
        </div>
        {trailer && (
          <iframe
            className="youtubeTrailerDetails"
            src={`https://www.youtube.com/embed/${trailer}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <Footer />
    </div>
  );
}
