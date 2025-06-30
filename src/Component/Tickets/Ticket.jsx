import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Tickets.css';
import axios from 'axios';

const Ticket = () => {
  const { id: ticketId } = useParams();
  console.log("ticketId======>", ticketId)
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
          const token = localStorage.getItem("token")
      try {
        const response = await axios.get(`http://localhost:5000/api/ticket/get-ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
       );
        setTicketData(response.data.ticket);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch ticket:", err);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) return <div>Loading...</div>;
  if (!ticketData) return <div>Ticket not found</div>;

  const { event, user, qrCode, location } = ticketData;

  return (

  <div style={{ fontFamily: 'Segoe UI, Roboto, sans-serif', background: '#f5f7fa', padding: '20px' }}>
    <div style={{
      maxWidth: '400px',
      margin: 'auto',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        background: '#f8f9fa',
        padding: '12px 24px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#6c757d',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>TICKET</span>
      </div>

      <div style={{ padding: '24px' }}>
        <h1 style={{ fontSize: '24px', color: '#212529', marginBottom: '16px' }}>{event.title}</h1>
        <p style={{ fontSize: '14px', color: '#495057', marginBottom: '4px' }}><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '20px' }}><strong>Location:</strong> 
  {`${event.location.address}, ${event.location.city}, ${event.location.state}, ${event.location.zipCode}, ${event.location.country}`}</p>

        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <img src={qrCode} alt="QR Code" style={{ width: '120px', height: '120px', border: '2px solid #e9ecef', borderRadius: '8px', padding: '4px' }} />
          <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '8px' }}>Scan this QR at entry</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>
            <span>Guest</span>
            <span>Status</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '6px'
          }}>
            <span style={{ fontSize: '16px', color: '#212529' }}>{user.name}</span>
            <span style={{
              fontSize: '14px',
              color: '#28a745',
              fontWeight: '600',
              background: '#d4edda',
              padding: '4px 12px',
              borderRadius: '12px',
              border: '1px solid #c3e6cb'
            }}>Going</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
          <span style={{
            display: 'block',
            fontSize: '12px',
            color: '#6c757d',
            fontWeight: '500',
            textTransform: 'uppercase'
          }}>Ticket</span>
          <span style={{ fontSize: '16px', color: '#212529' }}>1x Standard</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={`https://maps.google.com?q=${encodeURIComponent(event.location)}`} target="_blank" rel="noreferrer" style={{
            flex: 1,
            textAlign: 'center',
            padding: '12px 16px',
            background: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600'
          }}>🗺️ Get Directions</a>
          <button style={{
            flex: 1,
            textAlign: 'center',
            padding: '12px 16px',
            background: '#212529',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>📱 Add to Wallet</button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Ticket;
