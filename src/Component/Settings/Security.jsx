import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOTP from './VerifyOTP';
import VerifyPassword from './VerifyPassword';

const SecurityTab = () => {
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [showPasswordOTPComponent, setShowPasswordOTPComponent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/get-Name-Email-UserName-ProfilePic', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching email:", err);
        setError("Failed to fetch email");
      }
    };
    fetchEmail();
  }, []);

  const handleSendOTPForEmail = async () => {
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
        'http://localhost:5000/api/user/change-password',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
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

  // ✅ Just show password change component (no OTP)
  const handleSendOTPForPassword = () => {
    setShowPasswordOTPComponent(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', borderRadius: '4px', backgroundColor: 'rgba(11, 11, 11, 0.1)', minHeight: '50vh' }}>
      {showOTPComponent ? (
        <VerifyOTP setShowOTPComponent={setShowOTPComponent} />
      ) : showPasswordOTPComponent ? (
        <VerifyPassword setShowPasswordOTPComponent={setShowPasswordOTPComponent} />
      ) : (
        <>
          <h2>Security Settings</h2>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              disabled
              style={{ width: '100%', padding: '8px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            onClick={handleSendOTPForEmail}
            disabled={loading}
            style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Sending OTP...' : 'Change Email'}
          </button>

          <button
            onClick={handleSendOTPForPassword}
            style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
};

export default SecurityTab;
