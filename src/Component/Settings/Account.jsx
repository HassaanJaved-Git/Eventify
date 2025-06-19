import React, { useState, useEffect } from 'react'; // Added useState import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import defaultUserPic from '../../assets/user.png'; // Default user image
import './Account.css';

const ProfileForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [userData, setUserData] = useState(  {name: '',   
  userName: '',
  bio: '',
  profileImageURL: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchUserData();
  }, []);

  const handleSubmit = async (values, {setSubmitting}) => {
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
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !userData) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container">
      <div className="profile-card">
        <h2 className="title">Your Profile</h2>
        <p className="subtitle">Choose how you are displayed as a host or guest.</p>
        <Formik initialValues={userData} onSubmit={handleSubmit} enableReinitialize={true}>
          
          {({ setFieldValue }) => (
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
          )}
        </Formik>
      </div>
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
      <p>Wanna Logout</p>
      <button className="btn btn-danger mb-3 mt-4" onClick={logout}>Logout</button>
      <hr />
      <p>Wanna Del your Acc</p>
      <button className="btn btn-danger mb-3" onClick={delAccount}>Delete Account</button>
    </div>
  );
};

export default AccountTab;