import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOTP from './VerifyOTP';

const SecurityTab = () => {
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/get-Name-Email-UserName-ProfilePic', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching email:", err);
        setError("Failed to fetch email");
      }
    };
    fetchEmail();
  }, []);

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/user/send-OTP-with-Token',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.message === 'OTP sent successfully') {
        setShowOTPComponent(true);
      } else {
        setError(response.data.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Request Error:', err);
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      {showOTPComponent ? (
        <VerifyOTP setShowOTPComponent={setShowOTPComponent} />
      ) : (
        <>
          <h2>Change Email</h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              disabled
              style={{ width: '100%', padding: '8px', margin: '8px 0' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            onClick={handleSendOTP}
            disabled={loading}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            {loading ? 'Sending OTP...' : 'Change Email'}
          </button>
        </>
      )}
    </div>
  );
};

export default SecurityTab;

