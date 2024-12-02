import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all movies from the API when the component mounts
    fetch('https://restapimovieapp.onrender.com/api/getall')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        // Save the fetched movie data to state
        setMoviesData(data);
        setFilteredMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter movies based on the search term entered by the user
    setFilteredMovies(
      moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.plot.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie._id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  // Re-run this effect when the searchTerm or moviesData changes
  }, [searchTerm, moviesData]);

  return (
    <div className="home-page">
      <h1>Christmas Movie App</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p className="tip">
        Search for Christmas movies by Title, Genre, Plot, or Movie ID
      </p>

      {/* Loading state */}
      {loading && <p>Loading movies...</p>}

      {/* Error state */}
      {error && <p className="error">{`Error: ${error}`}</p>}

      {/* Movie list */}
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default HomePage;
