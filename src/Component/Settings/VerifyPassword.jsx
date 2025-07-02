import React, { useState } from 'react';
import axios from 'axios';

const VerifyPasswordWithOTP = ({ setShowPasswordOTPComponent }) => {
  const [oldPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
  if (!oldPassword.trim() || !newPassword.trim()) {
  setError("Please fill all fields");
  setMessage('');
  return;
}


    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/user/change-password',
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      console.error(err);
      setMessage('');
      setError(err.response?.data?.message || 'Error updating password');
    }
  };

  return (
    <div>
      <h3>Verify OTP & Change Password</h3>
      <input
        type="password"
        placeholder="Current Password"
        value={oldPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
          setError('');
        }}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          setError('');
        }}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button
        onClick={handleChangePassword}
        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Update Password
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={() => setShowPasswordOTPComponent(false)}
        style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Cancel
      </button>
    </div>
  );
};

export default VerifyPasswordWithOTP;
