import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Concerts.css';
import { useNavigate } from 'react-router-dom'


const Concerts = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({});
  const [concerts, setConcerts] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/concerts', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log(response)
          setConcerts(response.data)
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
    fetchData();

    concerts?.forEach((concert) => {
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
        {concerts?.map((concert) => (
          <li key={concert.id} className="concert-item" onClick={() => navigate('/concert/' + concert.id)}>
            <h3>{concert.bandName}</h3>
            <p>Location: {concert.location}</p>
            <p>Band: {concert.band.name}</p>
            {/* {weatherData[concert.id] && <p>Weather: {weatherData[concert.id]}</p>} */}
            <p>Weather: {weatherData[concert.id]}</p>
            <button>Buy Ticket</button>
          </li>
        ))}
      </ul>
      {/* <button className="add-concert-button">Add New Concert</button> */}
    </div>
  );
};

export default Concerts;
