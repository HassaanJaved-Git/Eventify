import React from 'react';
import './Tickets.css'; // Ensure this CSS file is correctly linked

const Apps = () => {
  const TicketData = {
    title: 'Cyberfest 2025',
    date: 'May 3, 2025, 9:00 AM GMT+5',
    location: 'Lahore Garrison University, Main Campus, Sector C, DHA Phase 6, Lahore, Pakistan',
    attendee: 'Muhammad Hasan ...',
    status: 'Going',
    ticketType: '1x Standard'
  };

  return (
    <div className="app">
      <div className="container">
        <div className="ticket-card">
          <div className="ticket-header">
            <span className="ticket-label">TICKET</span>
          </div>
          
          <div className="ticket-content">
            <h1 className="event-title">{TicketData.title}</h1>
            
            <div className="event-details">
              <p className="event-date">{TicketData.date}</p>
              <p className="event-location">{TicketData.location}</p>
            </div>
            
            <div className="qr-section">
              <div className="qr-placeholder">
                {/* QR Code placeholder */}
                <div className="qr-grid">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div 
                      key={i} 
                      className={`qr-pixel ${Math.random() > 0.5 ? 'filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="guest-info">
              <div className="guest-details">
                <span className="guest-label">Guest</span>
                <span className="status-label">Status</span>
              </div>
              <div className="guest-status">
                <span className="guest-name">{TicketData.attendee}</span>
                <span className="status-going">{TicketData.status}</span>
              </div>
            </div>
            
            <div className="ticket-type">
              <span className="ticket-label-small">Ticket</span>
              <span className="ticket-quantity">{TicketData.ticketType}</span>
            </div>
            
            <div className="action-buttons">
              <button className="btn-directions">
                <span className="btn-icon">🗺️</span>
                Get Directions
              </button>
              <button className="btn-wallet">
                <span className="btn-icon">📱</span>
                Add to Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;