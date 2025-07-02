import React, { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ setShowOTPComponent }) => {
  const [otp, setOtp] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = async () => {
    // ✅ Basic validation
    if (!otp || !newEmail) {
      setError("Please enter both OTP and new email");
      setMessage('');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/user/change-email',
        { otp, newEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
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
        onChange={(e) => {
          setOtp(e.target.value);
          setError('');
        }}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <input
        type="email"
        placeholder="Enter new email"
        value={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
          setError('');
        }}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <button
        onClick={handleChangeEmail}
        style={{
          padding: '10px 20px',
          marginRight: '10px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Update Email
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={() => setShowOTPComponent(false)}
        style={{
          marginTop: '50px',
          padding: '10px 20px',
          backgroundColor: 'grey',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default VerifyOTP;
