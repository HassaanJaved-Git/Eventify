import React, { useState } from 'react';
import axios from 'axios';

const ChangePasswordForm = ({ email, setShowPasswordForm }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      return setError("Both fields are required");
    }

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/user/change-password',
        { email, oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessage(res.data.message);
      setError('');
    } catch (err) {
      console.error("Change password error:", err);
      setError(err.response?.data?.message || "Error changing password");
      setMessage('');
    }
  };

  return (
    <div>
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Enter old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />

      <button
        onClick={handleChangePassword}
        style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Update Password
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={() => setShowPasswordForm(false)}
        style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ChangePasswordForm;
