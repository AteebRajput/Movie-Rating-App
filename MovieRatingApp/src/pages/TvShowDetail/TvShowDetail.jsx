import { useMutation, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { rateTvShow } from "./rateTvShow"; // Ensure this function is defined elsewhere
import { useState } from "react";

const TvShowsDetail = ({ tvShowId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  console.log(tvShowId);
  

  // For Rating
  const { mutate: submitRating } = useMutation({
    mutationKey: ["rating", tvShowId],
    mutationFn: ({ id, rating }) => rateTvShow(id, rating),
    onSuccess: () => {
      setUserRating(rating);
    },
    onError: (error) => {
      console.error("Error submitting rating: ", error);
    },
  });

  // Fetch TV show details
  const { data: detail, isLoading, isError } = useQuery({
    queryKey: ["tvshow", tvShowId],
    queryFn: async () => {
      if (!tvShowId) return;

      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjNjNmIxOGUwYzgwODliMDIwYTI4NDQ4NmNjMjkzNSIsIm5iZiI6MTcyOTE4NDA5Mi40NzU0MjEsInN1YiI6IjY3MDE4ZmEzNzgzMGMxMzAxZTdkMTFlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tOeWyjj5-S5Jt4e6EXAAGSka-wWGX9R28OgnIr1v3iE`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    enabled: !!tvShowId,
  });

  // Handle rating submission
  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && rating <= 10) {
      submitRating({ id: tvShowId, rating });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching TV show details</div>;
  }

  // Ensure detail is defined before rendering
  if (!detail) {
    return <div className="text-red-500">No details available</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 backdrop-blur-sm font-roboto">
      <div className="relative flex flex-row w-full max-w-4xl bg-gray-700 text-white p-8 rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-white hover:text-red-500"
        >
          &times;
        </button>

        {/* Left side: Image */}
        <div className="flex-shrink-0 mr-8">
          <img
            src={detail.poster_path ? `https://image.tmdb.org/t/p/w500${detail.poster_path}` : 'default_image_url_here'}
            alt={detail.original_name}
            className="w-96 h-auto rounded-md"
          />
        </div>

        {/* Right side: TV show details */}
        <div className="flex-grow max-h-[75vh] overflow-y-auto pr-4">
          <h2 className="text-3xl font-bold font-akaya">{detail.name}</h2>
          <h4 className="text-lg mb-4 font-akaya">{detail.tagline}</h4>
          <p className="mb-4">{detail.overview}</p>

          <p>
            <strong>Genre:</strong>{" "}
            <span>{detail.genres.map((genre) => genre.name).join(", ")}</span>
          </p>

          <p>
            <strong>First Air Date:</strong> {detail.first_air_date}
          </p>
          <p>
            <strong>Last Air Date:</strong> {detail.last_air_date}
          </p>
          <p>
            <strong>Type:</strong> {detail.type}
          </p>

          <p>
            <strong>Rating:</strong> {detail.vote_average}/10
          </p>

          {/* User Rating */}
          {userRating ? (
            <p>
              <strong>Your Rating:</strong> {userRating}/10
            </p>
          ) : (
            <form onSubmit={handleRatingSubmit}>
              <label htmlFor="rating">Rate this show (1-10): </label>
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

          {/* Display total number of seasons */}
          <p>
            <strong>Total Seasons:</strong> {detail.number_of_seasons}
          </p>

          {/* Display each season's details */}
          <div className="mt-2">
            <ul>
              {detail.seasons.map((season) => (
                <li key={season.id} className="mt-2">
                  <strong>{season.name}</strong> (Air Date: {season.air_date}) -{" "}
                  {season.episode_count} episodes
                  <p>{season.overview}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                    alt={`${season.name} poster`}
                    className="mt-2 w-32 rounded-md"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


TvShowsDetail.propTypes = {
  tvShowId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TvShowsDetail;
