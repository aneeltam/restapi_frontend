import React, { useState } from 'react';

// The help data
const helpData = [
  {
    id: 1,
    title: 'How to Search for Movies',
    description: `
      To search for movies, use the search bar on the Home page. 
      You can enter a movie title, genre, or keywords related to the plot and then press 'Enter'. 
      This app will provide you with a list of matching movies based on your input. 
      If you do not see the desired movie, try changing your search terms.
    `,
  },
  {
    id: 2,
    title: 'How to Add a Movie',
    description: `
      Go to the "Add New Movie" page using the top navigation bar. 
      Fill out all required fields, including the title, genre, release year, and description of the movie. 
      You can also upload a poster image in the form of a URL address.
      Once the fields are filled, click the "Add Movie" button to save the movie to the database.
    `,
  },
  {
    id: 3,
    title: 'How to Update a Movie',
    description: `
      To update an existing movie, locate the movie on the Home page and click the "Edit Movie" button. 
      You will be directed to a form where you can modify the movie details such as the title, genre, or poster. 
      Click on 'Update Movie' to update the movie in the database.
    `
  },
  {
    id: 4,
    title: 'How to Delete a Movie',
    description: `
      Go to the "Delete Movie" page using the top navigation bar. 
      Choose a movie you want to delete from the database, by cligking 'Delete Movie'. 
      Click on 'Delete movie' again, and you will have successfully removed a movie from the database.
    `
  }
];


function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHelp, setSelectedHelp] = useState('');
  // HandleSearch updates the searchTerm state whenever the user types in the search bar
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // HandleSelectChange updates the selectedHelp state when a category is selected from the dropdown
  const handleSelectChange = (e) => {
    setSelectedHelp(e.target.value);
  };
  // FilteredHelp filters the helpData array based on both the search term and the selected help category
  const filteredHelp = helpData.filter((help) => {
    const matchesSearch = searchTerm
      ? help.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        help.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesDropdown = selectedHelp
      ? help.title.toLowerCase().includes(selectedHelp.toLowerCase())
      : true;

    return matchesSearch && matchesDropdown;
  });

  return (
    <div className="help-page">
      <h2>Help & User Instructions</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for topics..."
        className="search-bar"
      />

      {/* Dropdown */}
      <select onChange={handleSelectChange} value={selectedHelp}>
        <option value="">Select a help topic</option>
        {helpData.map((help) => (
          <option key={help.id} value={help.title}>{help.title}</option>
        ))}
      </select>

      {/* Display filtered help topics */}
      <ul>
        {filteredHelp.map((help) => (
          <li key={help.id}>
            <h3>{help.title}</h3>
            <p>{help.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HelpPage;
