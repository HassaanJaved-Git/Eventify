import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ setShowOTPComponent }) => {
  const [otp, setOtp] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/user/change-email',
        { otp, newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setMessage('');
      setError(err.response?.data?.message || 'Error updating email');
    }
  };

  return (
    <div>
      <h3>Verify OTP</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="email"
        placeholder="Enter new email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleChangeEmail} style={{ padding: '10px 20px' }}>
        Update Email
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setShowOTPComponent(false)} style={{ marginTop: '10px' }}>
        Cancel
      </button>
    </div>
  );
};

export default VerifyOTP;
