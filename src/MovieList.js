import React from 'react';
import { Link } from 'react-router-dom';

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div className="movie-item" key={movie._id}>
          {/* Movie Poster */}
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster"
          />

          {/* Movie Details */}
          <div className="movie-details">
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Plot:</strong> {movie.plot}</p>
            <p><strong>ID:</strong> {movie._id}</p>
          </div>

          {/* Edit Button */}
          <Link
            to={`/edit-movie/${movie._id}`}
            className="edit-movie-button"
          >
            Edit Movie
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
