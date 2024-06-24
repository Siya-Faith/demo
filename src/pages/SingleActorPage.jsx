import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorDetails, getActorMovieCredits } from "../api/api";

const SingleActorPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const actorResponse = await getActorDetails(id);
        setActor(actorResponse.data);

        const creditsResponse = await getActorMovieCredits(id);
        setCredits(creditsResponse.data.cast);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (!actor) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <h1 className="actor-name">{actor.name}</h1>
      <div className="actor-details">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className="actor-image"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        <div>
          <p><strong>Gender:</strong> {actor.gender === 1 ? "Female" : "Male"}</p>
          <p><strong>Popularity:</strong> {actor.popularity}</p>
          <p><strong>Birthday:</strong> {actor.birthday}</p>
          <p><strong>Biography:</strong> {actor.biography}</p>
        </div>
      </div>
      <h2 className="movies-title">Movies</h2>
      <div className="movies-grid">
        {credits.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-character">{movie.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleActorPage;
