import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // When the component loads or when the movie ID changes, run this effect
  useEffect(() => {
    // Fetch movie data from the server using the movie ID
    fetch(`https://restapimovieapp.onrender.com/api/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Fetch movie data from the server using the movie ID
    fetch(`https://restapimovieapp.onrender.com/api/delete/${id}`, {
      method: 'DELETE',
    })
      // Redirect to HomePage after deletion
      .then(() => {
        alert(`Movie ${movie.title} deleted successfully!`);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  // Redirect to HomePage if the user cancels
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="delete-movie-page">
      {loading && <p>Loading movie details...</p>}
      {error && <p className="error">Error: {error}</p>}

      {movie && (
        <div>
          <div className="movie-details">
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Plot:</strong> {movie.plot}</p>
          </div>

          <div className="delete-buttons">
            <button
              onClick={handleDelete}
              className="delete-button"
            >
              Delete Movie
            </button>
            <button
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteMoviePage;
