import { useState } from "react";
import PropTypes from "prop-types";
import MovieDetail from "../MovieDetail/MovieDetail";

const Movies = ({ data, isLoading }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null); // State to store the selected movie's ID

  if (isLoading) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  // Function to handle movie card click
  const handleMovieClick = (id) => {
    setSelectedMovieId(id); // Update the state with the selected movie's ID
  };

  const onClose = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="flex flex-col items-center font-ptsans">
      {/* Grid of movie cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {data?.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)} // Pass movie ID on click
            className="p-4 bg-black text-white rounded-2xl transition transform hover:scale-105 hover:shadow-lg hover:bg-gray-800 cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-2 rounded-md"
            />
            <h3 className="text-lg md:text-2xl font-bold font-akaya pb-2">{movie.title}</h3>
            <p className="text-sm md:text-md font-roboto tracking-tight">{movie.overview}</p>
            <p className="pt-2">
              <span className="text-sm md:text-xl font-semibold">
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

// Props validation using PropTypes
Movies.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ),
  isLoading: PropTypes.bool.isRequired,
};

export default Movies;
