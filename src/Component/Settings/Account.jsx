import React, { useState } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Account.css'; // Ensure this CSS file is created

// ProfileForm component
const ProfileForm = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    instagram: '',
    x: '',
    youtube: '',
    tiktok: '',
    linkedin: '',
    website: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
    toast.success('Profile saved successfully!');
  };

  return (
    <div className="container">
      <div className="profile-card" >
        <h2 className="title">Your Profile</h2>
        <p className="subtitle">Choose how you are displayed as a host or guest.</p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className="profile-pic-container">
              <div
                className="profile-pic"
                style={{ width: '100px', height: '100px' }} // Removed Bootstrap classes, using inline style
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                ) : (
                  <span className="text-white fs-1">😊</span>
                )}

                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <label
                  htmlFor="profileImage"
                  className="upload-btn"
                  style={{
                    bottom: '18px',
                    right: '10px',
                    transform: 'translate(50%, 50%)',
                    borderRadius: '50%',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  ↑
                </label>
              </div>
              <p className="pic-label">Profile Picture</p>
            </div>
            <div className="form-group">
              <Field
                name="firstName"
                className="input-field"
                placeholder="Full Name"
      
              />
            </div>
            <div className="form-group">
              <Field
                type="email"
                name="email"
                className="input-field"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <Field
                name="username"
                className="input-field"
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <Field
                name="bio"
                as="textarea"
                className="input-field textarea"
                placeholder="Share a little about your background and interests."
              />
            </div>
           
            <button type="submit" className="submit-btn">Save Changes</button>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

// AccountTab component
const AccountTab = () => {
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
    const userConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (userConfirmed) {
      try {
        await axios.delete("http://localhost:5000/api/user/delete", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem("token");
        logout();
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again later.");
      }
    }
  };

  return (
    <div className="account-container">
      <ProfileForm />
      <button className="btn btn-danger mb-3 mt-4" onClick={logout}>Logout</button>
      <hr />
      <button className="btn btn-danger mb-3" onClick={delAccount}>Delete Account</button>
    </div>
  );
};

export default AccountTab;