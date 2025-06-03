import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import '../Login/Login.css'

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const sendOtpSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const resetPasswordSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').max(32, 'Password must be at most 32 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[@$!%*?&]/, 'Password must contain at least one special character').required('Password is required'),
  });

  const handleSendOtp = (values, { setSubmitting }) => {
    setLoading(true);

    axios.post('http://localhost:5000/api/user/send-OTP-without-Token', 
      { email: values.email },
      { withCredentials: true }
    )
    .then(() => {
      toast.success('OTP has been sent to your email.');
      setEmailState(values.email);
      setStep(2);
    })
    .catch(() => {
      toast.error('Failed to send OTP. Please try again.');
    })
    .finally(() => {
      setLoading(false);
      setSubmitting(false);
    });
  };

  const handleSavePassword = (values, { setSubmitting }) => {
    setLoading(true);

    axios.post('http://localhost:5000/api/user/reset-password', {
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword,
      },
      { withCredentials: true }
    )
    .then(() => {
      toast.success('Your password has been reset successfully!');
      navigate('/login'); 
    })
    .catch(() => {
      toast.error('Failed to reset password. Please check OTP and try again.');
    })
    .finally(() => {
      setLoading(false);
      setSubmitting(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password - Eventify</title>
      </Helmet>
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />

      <div className="signup-login-background">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="card login-card p-4">
            <h2 className="text-center mb-4 login-title">Forgot Password</h2>

            {step === 1 && (
              <Formik initialValues={{ email: '' }} validationSchema={sendOtpSchema} onSubmit={handleSendOtp} >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="email" name="email" id="email" disabled={loading} placeholder="Email" className="form-control signup-login-input" />
                      <ErrorMessage name="email" component="div" className="form-text text-danger" />
                    </div>

                    <button type="submit" className="btn signup-login-button w-100" disabled={isSubmitting || loading} >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            {step === 2 && (
              <Formik initialValues={{ email: emailState, otp: '', newPassword: '' }} validationSchema={resetPasswordSchema} onSubmit={handleSavePassword} >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <Field type="text" name="otp" id="otp" disabled={loading} placeholder="Enter OTP" className="form-control" />
                      <ErrorMessage name="otp" component="div" className="form-text text-danger" />
                    </div>

                    <div className="mb-3">
                      <Field type="password" name="newPassword" id="newPassword" disabled={loading} placeholder="Enter Password" className="form-control" />
                      <ErrorMessage name="newPassword" component="div" className="form-text text-danger" />
                    </div>

                    <button type="submit" className="btn btn-success w-100" disabled={isSubmitting || loading} >
                      {loading ? 'Saving Password...' : 'Save Password'}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
