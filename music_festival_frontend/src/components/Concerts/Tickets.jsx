import React, { useState, useEffect } from 'react';
import './Tickets.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tickets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    };
    fetchData();
  }, []);

  const [expandedTicketId, setExpandedTicketId] = useState(null);

  const handleToggleSetlist = (ticketId) => {
    if (expandedTicketId === ticketId) {
      setExpandedTicketId(null);
    } else {
      setExpandedTicketId(ticketId);
    }
  };

  return (
    <div className="tickets-container">
      <div className="tickets">
        <h2>Your Tickets</h2>
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              <h3>{ticket.concert.band.name}</h3>
              <p>Date: {ticket.concert.time}</p>
              <p>Location: {ticket.concert.location}</p>
              <p>Price: {ticket.price}</p>
              <button onClick={() => handleToggleSetlist(ticket.id)}>
                {expandedTicketId === ticket.id ? 'Hide Setlist' : 'Show Setlist'}
              </button>
              {expandedTicketId === ticket.id && (
                <ul className="setlist-list">
                  {ticket.concert.setlist.map((setlistSong) => (
                    <li key={setlistSong.id} className="setlist-item">
                      <p>{setlistSong.title}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tickets;
