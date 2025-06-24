import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaUserTie, FaLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import './SignUp.css';
import debounce from 'lodash.debounce';
import GoogleOAuth from '../GoogleOAuth/GoogleOAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checking, setChecking] = useState(false);
  const [watchedUsername, setWatchedUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // Debounced username check
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

  // Reactively check username on change
  useEffect(() => {
    const currentCheck = watchedUsername.trim();
    if (currentCheck.length >= 3) {
      checkUsername(currentCheck);
    } else {
      setUsernameAvailable(null);
    }
  }, [watchedUsername, checkUsername]);

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    userName: Yup.string()
      .min(3, 'At least 3 characters')
      .max(20, 'Max 20 characters')
      .matches(/^[a-zA-Z0-9_.-]+$/, 'Invalid characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'At least 8 characters')
      .max(32, 'At most 32 characters')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[@$!%*?&]/, 'At least one special character')
      .required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (usernameAvailable === false) {
      toast.error('Username is already taken.', { position: 'top-center' });
      setSubmitting(false);
      return;
    }
    axios.post('http://localhost:5000/api/user/register', values)
      .then((response) => {
        toast.success('User registered successfully!', {
          position: 'top-center',
        });
        resetForm();
        const { token } = response.data;
        localStorage.setItem('token', token);
        setTimeout(() => navigate('/'), 1000);
      })
      .catch((error) => {
        console.error('Registration error:', error.response?.data || error.message);
        toast.error('Registration failed: ' + (error.response?.data?.message || error.message), {
          position: 'top-center',
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

            <div className="signup-login-background">
                <div className="col-12 h-100 d-flex align-items-center justify-content-center">
                    <div className="card signup-login-card p-4">
                        <h2 className="text-center mb-4 text-white signup-login-title"> Sign Up</h2>

            <Formik
              initialValues={{ name: '', email: '', userName: '', password: '' }}
              validationSchema={signUpSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, handleChange }) => (
                <Form>
                  <div className="mb-3 position-relative">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control signup-login-input pe-5"
                    />
                    <FaUser className="icon" />
                    <ErrorMessage name="name" component="div" className="text-danger mt-1 error-message" />
                  </div>

                  <div className="mb-3 position-relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control signup-login-input pe-5"
                    />
                    <MdMarkEmailUnread className="icon" />
                    <ErrorMessage name="email" component="div" className="text-danger mt-1 error-message" />
                  </div>

                  <div className="mb-3 position-relative">
                    <Field
                      type="text"
                      name="userName"
                      placeholder="Enter Username"
                      className="form-control signup-login-input pe-5"
                      onChange={(e) => {
                        handleChange(e);
                        setWatchedUsername(e.target.value);
                      }}
                    />
                    <FaUserTie className="icon" />
                    <ErrorMessage name="userName" component="div" className="text-danger mt-1 error-message" />
                    {checking && <div className="text-info mt-1">Checking availability...</div>}
                    {usernameAvailable === false && <div className="text-danger mt-1">Username is taken</div>}
                    {usernameAvailable === true && <div className="text-success mt-1">Username is available</div>}
                  </div>

                  <div className="mb-3 position-relative">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="form-control signup-login-input pe-5"
                    />
                    <FaLock className="icon" />
                    <ErrorMessage name="password" component="div" className="text-danger mt-1 error-message" />
                  </div>

                  <button type="submit" className="btn signup-login-button w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'SignUp'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center my-1">OR</div>

            <GoogleOAuth />

            <div className="text-center mt-3">
              <p>
                Already have an account?
                <button type="button" onClick={() => navigate('/login')} className="btn btn-link">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
