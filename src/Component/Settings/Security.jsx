import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyOTP from './VerifyOTP';
import ChangePasswordForm from './ChangePasswordForm';

const SecurityTab = () => {
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpType, setOtpType] = useState('');
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
          withCredentials: true,
        }
      );

      if (response.data.message === 'OTP sent successfully') {
        setOtpType('email');
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', borderRadius: '4px', backgroundColor: 'white', height: 'auto' }}>
      {showOTPComponent ? (
        <VerifyOTP setShowOTPComponent={setShowOTPComponent} otpType="email" email={email} />
      ) : showPasswordForm ? (
        <ChangePasswordForm email={email} setShowPasswordForm={setShowPasswordForm} />
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
            onClick={handleSendOTP}
            disabled={loading}
            style={{ padding: '10px 20px', marginTop: '50px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Sending OTP...' : 'Change Email'}
          </button>
          <button
            onClick={() => setShowPasswordForm(true)}
            style={{ padding: '10px 20px', marginTop: '50px', marginLeft: '10px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Change Password
          </button>
        </>
      )}
    </div>
  );
};

export default SecurityTab;
