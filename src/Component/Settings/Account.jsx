import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import './Account.css';

const ProfileForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    userName: '',
    phone: '',
    bio: '',
    profileImage: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user-data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setInitialValues({
          name: data.name || '',
          email: data.email || '',
          userName: data.userName || '',
          phone: data.phone || '',
          bio: data.bio || '',
          profileImage: null,
        });
        setPreviewImage(data.profileImageURL || null);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        toast.error('Failed to load profile info');
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('userName', values.userName);
      formData.append('phone', values.phone);
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

  return (
    <div className="container">
      <div className="profile-card">
        <h2 className="title">Your Profile</h2>
        <p className="subtitle">Choose how you are displayed as a host or guest.</p>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, isSubmitting }) => (
            <Form>
              <div className="profile-pic-container">
                <div className="profile-pic" style={{ width: '100px', height: '100px' }}>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile"
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
                        setFieldValue('profileImage', file);
                        const reader = new FileReader();
                        reader.onloadend = () => setPreviewImage(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label htmlFor="profileImage" className="upload-btn">↑</label>
                </div>
                <p className="pic-label">Profile Picture</p>
              </div>

              <div className="form-group">
                <input
                  name="name"
                  className="input-field"
                  placeholder="Full Name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="Email"
                  value={values.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <input
                  name="userName"
                  className="input-field"
                  placeholder="Username"
                  value={values.userName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  name="phone"
                  className="input-field"
                  placeholder="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="bio"
                  className="input-field textarea"
                  placeholder="Share a little about your background and interests."
                  value={values.bio}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileForm;
