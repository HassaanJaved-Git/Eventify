import React from 'react';
import './Tickets.css';

const TicketCard = ({ eventName, date, location, attendee, status, ticketType }) => {
  return (
    <div className="ticket-card">
      <h5>{eventName}</h5>
      <p>{date}</p>
      <p>{location}</p>
      <div className="qr-code-placeholder"></div> {/* Placeholder for QR code */}
      <div className="ticket-details">
        <p>Guest: {attendee}</p>
        <p>Status: <span className={status.toLowerCase()}>{status}</span></p>
        <p>{ticketType}</p>
      </div>
      <div className="ticket-actions">
        <button className="btn btn-dark">Get Directions</button>
        <button className="btn btn-outline-dark">Add to Wallet</button>
      </div>
    </div>
  );
};

export default TicketCard;