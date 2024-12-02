import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DeleteMovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all movies
  useEffect(() => {
    fetch('https://restapimovieapp.onrender.com/api/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="delete-movie-list">
      <h2>Delete Movies</h2>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-item" key={movie._id}>
              <img className="movie-poster" src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <Link to={`/delete-movie/${movie._id}`} className="delete-button">
                Delete Movie
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteMovieList;
