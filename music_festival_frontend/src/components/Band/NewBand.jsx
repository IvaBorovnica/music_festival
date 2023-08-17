import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

import './Band.css';

const NewBand = () => {
  const [name, setName] = useState('');
  const [formationYear, setYearFormed] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a data object containing the new band information
    const newBandData = {
      name,
      website,
      formationYear,
    };

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Set the token as a header in the Axios request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios with the token in the headers
    axios.post('http://localhost:8080/api/v1/bands', newBandData, config)
      .then((response) => {
        // Handle the successful addition here, such as displaying a success message or redirecting to another page
        console.log('Band added successfully!', response.data);

        // Redirect to '/bands' upon successful addition
        // window.location.href = '/bands';
      })
      .catch((error) => {
        // Handle addition errors here, such as displaying an error message
        console.error('Failed to add band:', error);
      });
  };

  return (
    <div className="new-band">
      <h2>Add a New Band</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter band name" />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Website:</label>
          <input type="text" id="genre" name="genre" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter band genre" />
        </div>
        <div className="form-group">
          <label htmlFor="yearFormed">Year Formed:</label>
          <input type="number" id="yearFormed" name="yearFormed" value={formationYear} onChange={(e) => setYearFormed(e.target.value)} placeholder="Enter year formed" />
        </div>
        <button type="submit">Add Band</button>
      </form>
    </div>
  );
}

export default NewBand;
