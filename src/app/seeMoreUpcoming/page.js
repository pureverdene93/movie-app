"use client";
import "../index.css";
import { Header } from "../_components/Header";
import { Footer } from "../_components/Footer";
import { UpcomingMovieSection } from "./_components/UpcomigMovieSection";

// const ApiLink =
//   "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
//   },
// };

export default function Home() {
  // const getData = async () => {
  //   const data = await fetch(ApiLink, options);
  //   const jsonData = await data.json();
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div className="back">
      <Header />
      <UpcomingMovieSection />
      <Footer />
    </div>
  );
}
