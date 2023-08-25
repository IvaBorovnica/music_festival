import React from 'react';
import './Concerts.css';
import axios from 'axios';
import { useState, useEffect} from 'react'

const Tickets = () => {
  const [tickets, setTickets] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/v1/bands', {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });
          console.log(response)
          setTickets(response.data)
      } catch (error) {
          console.error('Login failed:', error);
          throw error;
      }
  }
    fetchData();
    console.log(tickets)
}, []);

function buyTicket( id ) {
  const token = localStorage.getItem('token');

    // Set the token as a header in the Axios request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the POST request using Axios with the token in the headers
    axios.post('http://localhost:8080/api/v1/tickets', { id }, config)
      .then((response) => {
        // Handle the successful addition here, such as displaying a success message or redirecting to another page
        console.log('Ticket added successfully!', response.data);

        // Redirect to '/bands' upon successful addition
        // window.location.href = '/bands';
      })
      .catch((error) => {
        // Handle addition errors here, such as displaying an error message
        console.error('Failed to add ticket:', error);
      });
}

  return (
    <div className="tickets">
      <h2>Your Tickets</h2>
      <ul className="ticket-list">
        {tickets?.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h3>{ticket.band}</h3>
            <p>Date: {ticket.date}</p>
            <p>Location: {ticket.location}</p>
            <button onClick={() => buyTicket(ticket.id)}>Buy ticket</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
