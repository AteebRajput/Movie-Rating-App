import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import MovieDetail from "../../MovieDetail/MovieDetail"; // Ensure this file exists

const TrendingMovies = ({ pageNo }) => {
  // Fetching trending movies using useQuery
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const { data: trendingMovies, isLoading, error } = useQuery({
    queryKey: ["trendingMovies", pageNo],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}&api_key=${import.meta.env.VITE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      return response.json();
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleMovieClick = (id) => {
    setSelectedMovieId(id); // Update the state with the selected movie's ID
  };

  const onClose = () => {
    setSelectedMovieId(null); // Close the movie detail view
  };

  return (
    <div className="flex flex-col items-center font-ptsans">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full px-4">
        {trendingMovies?.results?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)} // Pass movie ID on click
            className="p-4 bg-black text-white rounded-2xl transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-800"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded-md"
            />
            <h3 className="text-lg md:text-xl font-bold font-akaya pb-2">{movie.title}</h3>
            <p className="text-sm md:text-md font-roboto tracking-tight">{movie.overview}</p>
            <p className="pt-2">
              <span className="text-sm md:text-md font-semibold">
                Release Date: <span>{movie.release_date}</span>
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Conditionally render MovieDetail if a movie is selected */}
      {selectedMovieId && <MovieDetail movieId={selectedMovieId} onClose={onClose} />}
    </div>
  );
};

TrendingMovies.propTypes = {
  pageNo: PropTypes.number.isRequired,
};

export default TrendingMovies;
