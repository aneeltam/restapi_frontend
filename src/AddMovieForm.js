import React, { useState, useEffect } from 'react';

function AddMovieForm({ onAddMovie, initialMovie }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [plot, setPlot] = useState('');
  const [poster, setPoster] = useState('');

  // Pre-fill the form fields if an initialMovie is provided (for editing)
  useEffect(() => {
    if (initialMovie) {
      setTitle(initialMovie.title);
      setGenre(initialMovie.genre);
      setReleaseYear(initialMovie.releaseYear);
      setPlot(initialMovie.plot);
      setPoster(initialMovie.poster);
    }
  }, [initialMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = { title, genre, releaseYear, plot, poster };

    // Call the function passed as a prop to handle movie addition or update
    onAddMovie(movieData);

    // Reset form fields after submit if it's a new movie
    if (!initialMovie) {
      setTitle('');
      setGenre('');
      setReleaseYear('');
      setPlot('');
      setPoster('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />
      <textarea
        placeholder="Plot"
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Poster URL"
        value={poster}
        onChange={(e) => setPoster(e.target.value)}
        required
      />
      <button type="submit">{initialMovie ? 'Update Movie' : 'Add Movie'}</button>
    </form>
  );
}

export default AddMovieForm;
