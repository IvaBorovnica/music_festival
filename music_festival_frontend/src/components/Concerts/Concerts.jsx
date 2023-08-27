import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Concerts.css';
import { useNavigate } from 'react-router-dom'


const Concerts = ({ role }) => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({});
  const [concerts, setConcerts] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/concerts', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }, params: {
                size: 3,
                page: currentPage
            }
          });
          setTotalPages(response.data.totalPages);
          setConcerts(response.data.content)
          response.data.content.forEach((concert) => {

            const apiKey = '2d87539fd120faf52522d5a6f7c24bea';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${concert.location}&appid=${apiKey}`;
      
            axios
              .get(apiUrl)
              .then((response) => {
                setWeatherData((prevData) => ({
                  ...prevData,
                  [concert.id]: '' + response.data.weather[0].description,
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


  }, [currentPage]);

  function buyTicket(id){

    const ticketData = {
      concert: {
        id
      }
    };
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post('http://localhost:8080/api/v1/tickets', ticketData, config)
      .then((response) => {
        console.log('Ticket added successfully!', response.data);
        navigate('/tickets');
      })
      .catch((error) => {
        alert('Failed to add ticket: '+ error.response.data.body.detail);

      });
  }

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
};

const previousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
};

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
              {role === 'USER' && <button onClick={() => buyTicket(concert.id)}>Buy Ticket</button>}
              {role === 'ORGANIZER' && <button onClick={() => navigate(''+ concert.id)}>Setlist</button>}
            </li>
          );
        })}
      </ul>
      <div className="pagination">
                <button
                    onClick={previousPage}
                    disabled={currentPage === 0}
                    className="pagination-button"
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
    </div>
  );
  
};

export default Concerts;
