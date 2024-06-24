// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../api/MovieApI";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [genres, setGenres] = useState([]);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenresToggle = () => setIsGenresOpen(!isGenresOpen);
  const handleMoviesToggle = () => setIsMoviesOpen(!isMoviesOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Movie Website</Link>
        </div>

        <div className="flex space-x-4">
          <div className="relative">
            <button className="text-white" onClick={handleGenresToggle}>
              Genres
            </button>
            {isGenresOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-lg">
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/movies?genre=${genre.id}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsGenresOpen(false)}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button className="text-white" onClick={handleMoviesToggle}>
              Movies
            </button>

            {isMoviesOpen && (
              <div className="absolute bg-white text-black mt-1 rounded shadow-lg">
                {[
                  "Top Rated",
                  "Popular",
                  "Latest",
                  "Now Playing",
                  "Upcoming",
                ].map((category) => (
                  <Link
                    key={category}
                    to={`/movies?category=${category
                      .toLowerCase()
                      .replace(" ", "_")}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsMoviesOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/actors" className="text-white">
            Actors
          </Link>
        </div>
        <SearchBox />
      </div>
    </nav>
  );
};

export default Navbar;
