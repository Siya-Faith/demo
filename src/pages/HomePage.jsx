
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import { getMovies } from "../api/MovieApI";
import './HomePage';

const category = {
  movie: "movie",
  tv: "tv",
};

const movieType = {
  popular: "popular",
  top_rated: "top_rated",
};

const tvType = {
  popular: "popular",
  top_rated: "top_rated",
};

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getMovies(
          `${category.movie}/${movieType.popular}`
        );
        setTrendingMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await getMovies(
          `${category.movie}/${movieType.top_rated}`
        );
        setTopRatedMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    const fetchTrendingTV = async () => {
      try {
        const response = await getMovies(`${category.tv}/${tvType.popular}`);
        setTrendingTV(response.data.results || []);
      } catch (error) {
        console.error("Error fetching trending TV shows:", error);
      }
    };

    const fetchTopRatedTV = async () => {
      try {
        const response = await getMovies(`${category.tv}/${tvType.top_rated}`);
        setTopRatedTV(response.data.results || []);
      } catch (error) {
        console.error("Error fetching top rated TV shows:", error);
      }
    };

    fetchTrendingMovies();
    fetchTopRatedMovies();
    fetchTrendingTV();
    fetchTopRatedTV();
  }, []);

  return (
    <div className="container">
      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending Movies</h2>
          <Link to="/movie" className="small">
            View more
          </Link>
        </div>
        <MovieList movies={trendingMovies} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Top Rated Movies</h2>
          <Link to="/movie" className="small">
            View more
          </Link>
        </div>
        <MovieList movies={topRatedMovies} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Trending TV</h2>
          <Link to="/tv" className="small">
            View more
          </Link>
        </div>
        <MovieList movies={trendingTV} />
      </div>

      <div className="section mb-3">
        <div className="section__header mb-2">
          <h2>Top Rated TV</h2>
          <Link to="/tv" className="small">
            View more
          </Link>
        </div>
        <MovieList movies={topRatedTV} />
      </div>
    </div>
  );
};

export default HomePage;

