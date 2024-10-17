import { useQuery } from "@tanstack/react-query";
import { getRatedMovies } from "./query"; // Ensure correct import of getRatedMovies
import { useState } from "react";
import MovieDetail from "../MovieDetail/MovieDetail";

export default function Rated() {
  const [selectedMovieId, setSelectedMovieId] = useState(null); 
  const { data: ratedMovies, isLoading, isError, error } = useQuery({
    queryKey: ["rated"],
    queryFn: getRatedMovies(import.meta.env.VITE_API_KEY), // Directly pass the function here
  });

  if (isLoading) {
    return <div>Loading rated movies...</div>; // Display a loading message or spinner
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  const handleMovieClick = (id) => {
    console.log(`Movie clicked: ${id}`);
    setSelectedMovieId(id);
    // Add navigation or more actions here
  };
  

  const onClose = () =>{
    setSelectedMovieId(null)
  }

  return (
    <div className="flex flex-col mt-4 items-center font-ptsans">
      {/* Grid of movie cards */}
      <div className="grid grid-cols-4 mb-12 gap-4" >
        {ratedMovies?.results?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)} // Pass movie ID on click
            className="p-4 bg-black text-white rounded-2xl transition transform hover:scale-105 hover:shadow-lg hover:bg-gray-800"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded-md"
            />
            <h3 className="text-3xl font-bold font-akaya pb-2">{movie.title}</h3>
            <p className="text-md font-roboto tracking-tight">{movie.overview}</p>
            <p className="pt-2">
              <span className="text-xl font-semibold">
                Release Date: <span>{movie.release_date}</span>
              </span>
            </p>
            <p className="text-xl font-semibold">Your Rating: <span>{movie.rating}</span></p>
            <p className="text-xl font-semibold">Total Rating: <span>{movie.vote_average}</span></p>
          </div>
        ))}
      </div>
      {selectedMovieId && <MovieDetail movieId={selectedMovieId} onClose={onClose}/>}
    </div>
  );
}
