import React from "react";
import { Link } from "react-router-dom";

const ActorList = ({ actors }) => {
  if (!Array.isArray(actors) || actors.length === 0) {
    return <div className="text-center text-white">No actors available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {actors.map((actor) => (
        <div key={actor.id} className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
          <Link to={`/actor/${actor.id}`}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 flex items-center justify-center mb-4">
                <span>No Image</span>
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{actor.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ActorList;
