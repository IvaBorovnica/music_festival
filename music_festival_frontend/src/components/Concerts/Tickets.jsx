import React from 'react';
import './Concerts.css';

// Sample data for user tickets
const ticketsData = [
  {
    id: 1,
    date: '2023-08-15',
    location: 'New York',
    band: 'Band X',
  },
  {
    id: 2,
    date: '2023-08-20',
    location: 'Los Angeles',
    band: 'Band Y',
  },
  // Add more tickets data as needed
];

const Tickets = () => {
  return (
    <div className="tickets">
      <h2>Your Tickets</h2>
      <ul className="ticket-list">
        {ticketsData.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <h3>{ticket.band}</h3>
            <p>Date: {ticket.date}</p>
            <p>Location: {ticket.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
