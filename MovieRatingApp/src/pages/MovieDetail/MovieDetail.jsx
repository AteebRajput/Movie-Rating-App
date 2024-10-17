import { useMutation, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { rateMovie } from "./rateMovie";
import { useState } from "react";

const MovieDetail = ({ movieId, onClose }) => {
  const [rating, setRating] = useState(0); // State to store user input rating
  const [userRating, setUserRating] = useState(null); // State to store user's submitted rating

  // Mutation to handle rating the movie
  const { mutate: submitRating, isSuccess } = useMutation({
    mutationFn: ({ movieId, rating }) => rateMovie(movieId, rating),
    onSuccess: () => {
      setUserRating(rating); // Update UI with user rating
    },
    onError: (error) => {
      console.error("Error submitting rating: ", error);
      // Optionally show an error message to the user
    },
  });

  // Fetch movie details
  const { data: detail, isLoading, isError } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      if (!movieId) return;

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjNjNmIxOGUwYzgwODliMDIwYTI4NDQ4NmNjMjkzNSIsIm5iZiI6MTcyODQxNjQzMC45MTQwNTcsInN1YiI6IjY3MDE4ZmEzNzgzMGMxMzAxZTdkMTFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qOwavNucDf54bGPMCzG4BEc5BTNiinCIYB9Cb-QHtTY`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json(); // Return the movie details data
    },
    enabled: !!movieId, // Only run query if movieId is valid
  });

  // Handle rating submission
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && rating <= 10) {
      submitRating({ movieId, rating }); // Trigger mutation with movieId and rating
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching movie details</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-sm font-roboto">
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-gray-700 text-white p-6 md:p-8 rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white hover:text-red-500"
        >
          &times;
        </button>

        {/* Left side: Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
            alt={detail.title}
            className="w-full h-auto md:w-96 rounded-md"
          />
        </div>

        {/* Right side: Movie details */}
        <div className="flex-grow">
          <h2 className="text-2xl md:text-3xl font-bold font-akaya">{detail.title}</h2>
          <h4 className="text-lg mb-4 font-akaya">{detail.tagline}</h4>
          <p className="mb-4">{detail.overview}</p>
          <p>
            <strong>Genre:</strong>{" "}
            <span>{detail.genres.map((genre) => genre.name).join(", ")}</span>
          </p>

          <p>
            <strong>Release Date:</strong> {detail.release_date}
          </p>
          <p>
            <strong>Revenue:</strong> $
            {(detail.revenue / 1000000).toFixed(2).toLocaleString()} million
          </p>

          <p>
            <strong>Rating:</strong> {detail.vote_average}/10
          </p>

          {/* User Rating */}
          {isSuccess || userRating ? (
            <p>
              <strong>Your Rating:</strong> {userRating}/10
            </p>
          ) : (
            <form onSubmit={handleRatingSubmit} className="flex items-center">
              <label htmlFor="rating" className="mr-2">Rate this movie (1-10): </label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="10"
                className="w-16 p-1 align-middle items-center justify-center text-black rounded-md"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-black rounded text-white"
              >
                Rate
              </button>
            </form>
          )}

          {/* Production Companies */}
          <div className="mt-4">
            <strong>Production Companies:</strong>
            <div className="flex flex-wrap mt-2">
              {detail.production_companies.map((company) => (
                <div key={company.id} className="flex items-center mb-4 mr-4">
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="w-12 h-auto mr-2"
                    />
                  )}
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieDetail.propTypes = {
  movieId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetail;
