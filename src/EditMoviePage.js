import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditMoviePage() {
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    plot: '',
    poster: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the movie details using the GET /api/:id endpoint
  useEffect(() => {
    fetch(`https://restapimovieapp.onrender.com/api/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        return response.json();
      })
      .then((data) => {
        setMovieData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Handle the form submission to update the movie
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sends a PUT request to update a movie on the server
    fetch(`https://restapimovieapp.onrender.com/api/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
      .then((response) => response.json())
      .then(() => {
        // Redirect to HomePage after updating
        alert('Movie updated successfully!');
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Updates the movieData state when an input field changes, by using the field's name and value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="edit-movie-page">
      <h1>Edit Movie</h1>

      {loading && <p>Loading movie details...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && (
        <form onSubmit={handleSubmit} className="add-movie-form">
          <input
            type="text"
            placeholder="Title"
            value={movieData.title}
            onChange={handleChange}
            name="title"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={movieData.genre}
            onChange={handleChange}
            name="genre"
            required
          />
          <input
            type="number"
            placeholder="Release Year"
            value={movieData.releaseYear}
            onChange={handleChange}
            name="releaseYear"
            required
          />
          <textarea
            placeholder="Plot"
            value={movieData.plot}
            onChange={handleChange}
            name="plot"
            required
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={movieData.poster}
            onChange={handleChange}
            name="poster"
            required
          />
          <button type="submit">Update Movie</button>
        </form>
      )}
    </div>
  );
}

export default EditMoviePage;
