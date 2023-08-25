import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Concerts.css';
import { useNavigate } from 'react-router-dom'


const Concerts = ({ role }) => {
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
          // console.log(response)
          setConcerts(response.data)
          response.data.forEach((concert) => {

            const apiKey = '2d87539fd120faf52522d5a6f7c24bea';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${concert.location}&appid=${apiKey}`;
      
            axios
              .get(apiUrl)
              .then((response) => {
                // alert(JSON.stringify(response.data.weather));
                // alert(response.data)
                setWeatherData((prevData) => ({
                  ...prevData,
                  [concert.id]: response.data.weather[0].description,
                }));
              })
              .catch((error) => {
                console.error(`Error fetching weather data for ${concert.location}:`, error);
              });
          });
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
    fetchData();


  }, []);

  function buyTicket(){

  }

  return (
    <div className="concerts">
      <h2>List of Concerts</h2>
      <ul className="concert-list">
        {concerts?.map((concert) => {
          const weatherDescription = weatherData[concert.id] || 'N/A';
          return (
            // <li key={concert.id} className="concert-item" onClick={() => navigate('/concert/' + concert.id)}>
            <li key={concert.id} className="concert-item">
              <h3>{concert.bandName}</h3>
              <p>Location: {concert.location}</p>
              <p>Band: {concert.band.name}</p>
              <p>Weather: {weatherDescription}</p>
              <button onClick={() => buyTicket(concert.id)}>Buy Ticket</button>
              {role === 'ORGANIZER' && <button onClick={() => navigate(''+ concert.id)}>Setlist</button>}
            </li>
          );
        })}
      </ul>
    </div>
  );
  
};

export default Concerts;
