import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import UpcomingMovies from "./movies/UpcomingMovies"; // Add similar components for other categories
import PopularMovies from "./movies/PopularMovies";
import NowPlayingMovies from "./movies/NowPlayingMovies";
import TrendingMovies from "./movies/TrendingMovies";
import TrendingTvShows from "./tvshows/TrendingTvShows";
import UpcomingTvShows from "./tvshows/UpcomingTvShows";
import PopularTvShows from "./tvshows/PopularTvShows";
import TopRated from "./tvshows/NowPlayingTvShows";

const Home = () => {
  const [displayType, setDisplayType] = useState("movies");
  const [category, setCategory] = useState("trending");
  const [pageNo, setPageNo] = useState(1);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleNextPage = () => {
    setPageNo((prevPageNo) => prevPageNo + 1); // Increment the page number
  };

  console.log("Display type", displayType);
  console.log("Category", category);

  return (
    <>
      {isLoggedIn && (
        <div className="flex flex-col justify-center items-center h-auto gap-6 px-4 md:px-0">
          {/* Display Type Toggle (Movies/TV Shows) */}
          <div className="mt-4 text-xl md:text-2xl w-full max-w-xs font-semibold text-white bg-black rounded-lg shadow-md">
            <div className="flex">
              <button
                className={`flex-1 px-4 py-1 rounded-l-lg transition duration-300 ${
                  displayType === "movies"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setDisplayType("movies")}
              >
                Movies
              </button>
              <button
                className={`flex-1 px-4 py-1 rounded-r-lg transition duration-300 ${
                  displayType === "tvshows"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setDisplayType("tvshows")}
              >
                TV Shows
              </button>
            </div>
          </div>

          {/* Category Toggle */}
          <div className="text-xl md:text-2xl w-full max-w-xs font-semibold text-white bg-black rounded-lg shadow-md mb-8">
            <div className="flex justify-center">
              <button
                onClick={() => setCategory("trending")}
                className={`flex-1 px-4 py-2 rounded-l-lg transition duration-300 ${
                  category === "trending"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
              >
                {displayType === "movies" ? "Trending" : "Airing"}
              </button>
              <button
                onClick={() => setCategory("upcoming")}
                className={`flex-1 px-4 py-2 transition duration-300 ${
                  category === "upcoming"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setCategory("popular")}
                className={`flex-1 px-4 py-2 transition duration-300 ${
                  category === "popular"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setCategory("now_playing")}
                className={`flex-1 px-4 py-2 rounded-r-lg transition duration-300 ${
                  category === "now_playing"
                    ? "bg-red-500 text-white"
                    : "bg-black text-gray-300 hover:bg-gray-800"
                }`}
              >
                {displayType === "movies" ? "Now Playing" : "Top Rated"}
              </button>
            </div>
          </div>

          {/* Movies Section */}
          {displayType === "movies" && (
            <>
              {category === "trending" && <TrendingMovies pageNo={pageNo} />}
              {category === "upcoming" && <UpcomingMovies pageNo={pageNo} />}
              {category === "popular" && <PopularMovies pageNo={pageNo} />}
              {category === "now_playing" && <NowPlayingMovies pageNo={pageNo} />}
            </>
          )}

          {/* TV Shows Section */}
          {displayType === "tvshows" && (
            <>
              {category === "trending" && <TrendingTvShows pageNo={pageNo} />}
              {category === "upcoming" && <UpcomingTvShows pageNo={pageNo} />}
              {category === "popular" && <PopularTvShows pageNo={pageNo} />}
              {category === "now_playing" && <TopRated pageNo={pageNo} />}
            </>
          )}

          {/* Next Page Button */}
          <button
            onClick={handleNextPage}
            className="w-full max-w-xs font-bold text-xl md:text-2xl bg-black h-12 my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-600 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
