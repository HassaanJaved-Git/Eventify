import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { AuthContext } from "../../Context/AuthContext"; 
import GoogleOAuth from '../GoogleOAuth/GoogleOAuth';

import './Login.css';
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email or Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post('http://localhost:5000/api/user/login', values)
      .then((response) => {
        toast.success('Login successful!', { position: 'top-center' });
        resetForm();
        
        const { token, user } = response.data;
        const { name, userName, email } = user;

        login(token, { name, userName, email });

        setTimeout(() => navigate('/'), 1000);
      })
      .catch(error => {
        console.error('Login error:', error.response?.data || error.message);
        toast.error('Login failed: ' + (error.response?.data?.message || error.message), {
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
        <title>Login - Eventify</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="signup-login-background">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="card login-card p-4">
            <h2 className="text-center mb-4 login-title">Login</h2>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
            
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3 position-relative">
                    <Field type="text" name="email" placeholder="Enter Email or Username" className="form-control signup-login-input pe-5" />
                    <MdMarkEmailUnread className="icon" />
                    <ErrorMessage name="email" component="div" className="text-danger mt-1 error-message" />
                  </div>
                  <div className="mb-3 position-relative">
                    <Field type="password" name="password" placeholder="Enter Password" className="form-control signup-login-input pe-5" />
                    <FaLock className='icon' />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger mt-1 error-message"
                    />
                    <button
                      type="button"
                      className='forgetpas btn btn-link'
                      onClick={() => navigate('/')}
                    >
                      Forget password
                    </button>
                  </div>
                  <button type="submit" className="btn signup-login-button w-100" disabled={isSubmitting} >
                    {isSubmitting ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      'Login'
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-center my-3">
              OR
            </div>

            <GoogleOAuth />

            <div className="text-center mt-3">
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="btn login-link"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
