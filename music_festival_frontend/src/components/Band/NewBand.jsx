import React, { useState } from 'react';
import axios from 'axios';

import './Band.css';
import { useNavigate } from 'react-router-dom';

const NewBand = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [formationYear, setYearFormed] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBandData = {
      name,
      website,
      formationYear,
    };

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post('http://localhost:8080/api/v1/bands', newBandData, config)
      .then((response) => {
        console.log('Band added successfully!', response.data);
        navigate('/bands');
      })
      .catch((error) => {
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
          <label htmlFor="website">Website:</label>
          <input type="text" id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter band website" />
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
