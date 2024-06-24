import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../api/api";

const SingleMoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await getMovieDetails(id);
        setMovie(movieResponse.data);

        const trailerResponse = await getMovieTrailer(id);
        const trailerData = trailerResponse.data.results.find(
          (video) => video.type === "Trailer"
        );
        setTrailer(trailerData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1 className="movie-title">{movie.title}</h1>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="poster-image"
        />
      </div>
      {trailer && (
        <div className="movie-trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="movie-details">
        <p><strong>Rating:</strong> {movie.vote_average}</p>
        <p><strong>Length:</strong> {movie.runtime} minutes</p>
        {movie.credits && movie.credits.crew && (
          <p><strong>Director:</strong> {movie.credits.crew.find((member) => member.job === "Director")?.name}</p>
        )}
      </div>
      <h2 className="lead-actors-title">Lead Actors</h2>
      <div className="lead-actors">
        {movie.credits && movie.credits.cast && movie.credits.cast.map((actor) => (
          <div key={actor.id} className="actor-card">
            <Link to={`/actor/${actor.id}`}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className="actor-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h3 className="actor-name">{actor.name}</h3>
              <p className="actor-character">as {actor.character}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleMoviePage;
