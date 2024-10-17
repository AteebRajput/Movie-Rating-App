import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import MovieDetail from "../../MovieDetail/MovieDetail"; // Ensure this file exists
import TvShowsDetail from "../../TvShowDetail/TvShowDetail";

const UpcomingTvShows = ({ pageNo }) => {
  // Fetching upcoming TV shows using useQuery
  const [selectedTvShowId, setSelectedTvShow] = useState(null);
  console.log("In the Upcoming");

  const {
    data: upcomingTvShows,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["upcomingTvShows", pageNo],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${pageNo}&api_key=${import.meta.env.VITE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming TV shows");
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

  const handleTvShowClick = (id) => {
    setSelectedTvShow(id); // Update the state with the selected TV show's ID
  };

  const onClose = () => {
    setSelectedTvShow(null); // Close the TV show detail view
  };

  return (
    <div className="flex flex-col items-center font-ptsans">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full px-4">
        {upcomingTvShows?.results?.map((tvShow) => (
          <div
            key={tvShow.id}
            onClick={() => handleTvShowClick(tvShow.id)} // Pass TV show ID on click
            className="p-4 bg-black text-white rounded-2xl transition transform hover:scale-105 hover:shadow-lg hover:bg-gray-800"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.original_name}
              className="w-full h-auto mb-2 rounded-md"
            />
            <h3 className="text-xl md:text-2xl font-bold font-akaya pb-2">
              {tvShow.original_name}
            </h3>
            <p className="text-sm md:text-md font-roboto tracking-tight">
              {tvShow.overview}
            </p>
            <p className="pt-2">
              <span className="text-md md:text-xl font-semibold">
                Release Date: <span>{tvShow.first_air_date}</span>
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Conditionally render TvShowsDetail if a TV show is selected */}
      {selectedTvShowId && (
        <TvShowsDetail tvShowId={selectedTvShowId} onClose={onClose} />
      )}
    </div>
  );
};

UpcomingTvShows.propTypes = {
  pageNo: PropTypes.number.isRequired,
};

export default UpcomingTvShows;
