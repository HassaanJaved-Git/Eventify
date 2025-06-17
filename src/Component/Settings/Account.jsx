import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function AccountTab() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", {
      state: { fromSettings: true }
    });
  };

  const delAccount = async () => {
    const token = localStorage.getItem("token");

    const userConfirmed  = window.confirm("Are you really want to delete account")
    if ( userConfirmed  ) {
      try {

        await axios.delete("http://localhost:5000/api/user/delete", {
          headers: {
            Authorization: `Bearer ${(token)}`
          }
        });
        localStorage.removeItem("token");
        logout();
      } catch {
        console.error("Error deleting account");
        alert("Failed to delete account. Please try again later.");
      }
    }
  }

  return (
    <div>
      <h4 className="mb-3">Profile Settings</h4>
      <p className="mb-3">Manage your profile information and preferences.</p>
      
      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>
      <hr />
      <button className="btn btn-danger mb-3"  onClick={delAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default AccountTab
