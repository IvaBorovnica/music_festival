import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Concerts.css';
import { useNavigate } from 'react-router-dom'

const concertsData = [
  {
    id: 1,
    location: 'New York',
    bandName: 'Band X',
    date: '2023-08-15',
  },
  {
    id: 2,
    location: 'Los Angeles',
    bandName: 'Band Y',
    date: '2023-08-20',
  },
  // Add more concerts data as needed
];

const Concerts = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    // Fetch weather data for concerts happening in less than 7 days
    const today = new Date();
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const concertsWithin7Days = concertsData.filter(
      (concert) => new Date(concert.date) <= sevenDaysLater
    );

    concertsWithin7Days.forEach((concert) => {
      const apiKey = '2d87539fd120faf52522d5a6f7c24bea';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${concert.location}&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData((prevData) => ({
            ...prevData,
            [concert.id]: response.data.weather[0].description,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching weather data for ${concert.location}:`, error);
        });
    });
  }, []);

  return (
    <div className="concerts">
      <h2>List of Concerts</h2>
      <ul className="concert-list">
        {concertsData.map((concert) => (
          <li key={concert.id} className="concert-item" onClick={() => navigate('/concert/' + concert.id)}>
            <h3>{concert.bandName}</h3>
            <p>Location: {concert.location}</p>
            <p>Date: {concert.date}</p>
            {weatherData[concert.id] && <p>Weather: {weatherData[concert.id]}</p>}
            <button>Buy Ticket</button>
          </li>
        ))}
      </ul>
      <button className="add-concert-button">Add New Concert</button>
    </div>
  );
};

export default Concerts;
