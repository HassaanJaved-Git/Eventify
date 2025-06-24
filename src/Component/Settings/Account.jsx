import React, { useCallback, useState, useEffect, useContext } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import defaultUserPic from '../../assets/user.png'; // Default user image
import isEqual from 'lodash/isEqual';
import debounce from 'lodash.debounce';

import 'react-toastify/dist/ReactToastify.css';
import './Account.css';

import { AuthContext } from "../../Context/AuthContext";

const ProfileForm = () => {
  const { refreshUserData } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState({
    name: '',   
    userName: '',
    bio: '',
    profileImageURL: ''}
  );
  const [loading, setLoading] = useState(true);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checking, setChecking] = useState(false);
  const [watchedUsername, setWatchedUsername] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/user-data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = response.data;

      setUserData({
        name: data.name || '',
        userName: data.userName || '',
        bio: data.bio || '',
        profileImageURL: data.profileImageURL || defaultUserPic // Default image path
      });

      setPreviewImage(data.profileImageURL);

    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error('Failed to load user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      setChecking(true);
      try {
        const res = await axios.post('http://localhost:5000/api/user/check-username', {
          userName: username,
        });
        if (username === watchedUsername) {
        setUsernameAvailable(res.data.available);
      }
      } catch (err) {
        console.error("Check username error", err);
        setUsernameAvailable(false);
      } finally {
        setChecking(false);
      }
    }, 500),
    [watchedUsername]
  );

  useEffect(() => {
    const currentCheck = watchedUsername.trim();
    if (currentCheck.length >= 3) {
      checkUsername(currentCheck);
    } else {
      setUsernameAvailable(null);
    }
  }, [watchedUsername, checkUsername]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, initialValues }) => {
    const clonedInitial = { ...initialValues };
    const clonedCurrent = { ...values }; // Ignore profileImageURL in comparison

    delete clonedInitial.profileImageURL;
    delete clonedCurrent.profileImage;

    const nothingChanged = isEqual(clonedInitial, clonedCurrent);

    if (nothingChanged && !values.profileImage) {
      toast.info('No changes to update.');
      setSubmitting(false);
      return;
    }
    if (usernameAvailable === false) {
      toast.error('Username is already taken.', { position: 'top-center' });
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData()
      formData.append('name', values.name);
      formData.append('userName', values.userName);
      formData.append('bio', values.bio);
      if (values.profileImage) {
        formData.append('profileImage', values.profileImage);
      }

      await axios.post('http://localhost:5000/api/user/edit-user', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully');
      refreshUserData();
      fetchUserData();
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !userData) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
      <div className="container">    
        <div className="profile-card">
          <h2 className="title">Your Profile</h2>
          <p className="subtitle">Choose how you are displayed as a host or guest.</p>
          <Formik initialValues={userData} onSubmit={handleSubmit} enableReinitialize={true}>
            
            {({ setFieldValue, handleChange, dirty, values }) => {
              const imageChanged = !!values.profileImage;

              return (
              <Form>
                <div className="profile-pic-container">
                  <div className="profile-pic" style={{ width: '100px', height: '100px' }}  >
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
                          setFieldValue('profileImage', file);
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
                    name="name"
                    className="input-field"
                    placeholder="Full Name"
          
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="userName"
                    className="input-field"
                    placeholder="UserName"
                    onChange={(e) => {
                        handleChange(e);
                        setWatchedUsername(e.target.value);
                    }}
                  />
                  <ErrorMessage name="userName" component="div" className="text-danger mt-1 error-message" />
                  {checking && <div className="text-info mt-1">Checking availability...</div>}
                  {usernameAvailable === false && <div className="text-danger mt-1">Username is taken</div>}
                  {usernameAvailable === true && <div className="text-success mt-1">Username is available</div>}
                </div>
                <div className="form-group">
                  <Field
                    name="bio"
                    as="textarea"
                    className="input-field textarea"
                    placeholder="Share a little about your background and interests."
                  />
                </div>
              
                <button type="submit" disabled={!dirty && !imageChanged} className="submit-btn">Save Changes</button>
              </Form> 
              )
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

// AccountTab component
const AccountTab = () => {
  
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout  = () => {
    logout();
    navigate('/login');
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
      <p>Wanna Logout</p>
      <button className="btn btn-danger mb-3 mt-4" onClick={handleLogout}>Logout</button>
      <hr />
      <p>Wanna Del your Acc</p>
      <button className="btn btn-danger mb-3" onClick={delAccount}>Delete Account</button>
    </div>
  );
};

export default AccountTab;