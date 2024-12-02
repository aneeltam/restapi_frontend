import React from 'react';
import AddMovieForm from './AddMovieForm';

function AddMoviePage() {
  const handleAddMovie = (movieData) => {
    fetch('https://restapimovieapp.onrender.com/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Movie added successfully!');
      })
      .catch((error) => {
        console.error('Error adding movie:', error);
      });
  };

  return (
    <div className="add-movie-page">
      <h1>Add a New Movie</h1>
      <AddMovieForm onAddMovie={handleAddMovie} />
    </div>
  );
}

export default AddMoviePage;
