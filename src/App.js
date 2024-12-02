import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AddMoviePage from './AddMoviePage';
import HelpPage from './HelpPage';
import EditMoviePage from './EditMoviePage';
import DeleteMoviePage from './DeleteMoviePage';
import DeleteMovieList from './DeleteMovieList';

function App() {
  return (
    <div className="app">
      {/* Navigation bar */}
      <nav className="header">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add-movie">Add New Movie</Link>
          <Link to="/delete-movie-list">Delete Movie</Link>
          <Link to="/help">Help</Link>
        </div>
      </nav>

      {/* Content */}
      <div className="top-navigation">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-movie" element={<AddMoviePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          <Route path="/delete-movie-list" element={<DeleteMovieList />} />  
          <Route path="/delete-movie/:id" element={<DeleteMoviePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
