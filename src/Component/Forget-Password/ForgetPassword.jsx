import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Simulate API call helper (replace with real fetch/axios)
  const fakeApiCall = (response, delay = 1500) =>
    new Promise((resolve) => setTimeout(() => resolve(response), delay));

  // Step 1: Send OTP
  const handleSendOtp = async (values, { setSubmitting }) => {
    setLoading(true);
    setApiError('');
    setSuccessMessage('');
    try {
      // Replace this with your real API call to send OTP
      // Example: await axios.post('/api/send-otp', { email: values.email });
      await fakeApiCall({ success: true });

      setSuccessMessage('OTP has been sent to your email.');
      setStep(2);
    } catch (error) {
      setApiError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Step 2: Verify OTP and save new password
  const handleSavePassword = async (values, { setSubmitting }) => {
    setLoading(true);
    setApiError('');
    setSuccessMessage('');
    try {
      // Replace this with your real API call to verify OTP & save password
      // Example: await axios.post('/api/reset-password', { email: values.email, otp: values.otp, newPassword: values.newPassword });
      await fakeApiCall({ success: true });

      setSuccessMessage('Your password has been reset successfully!');
      setStep(1); // Optionally reset to step 1 or redirect user
    } catch (error) {
      setApiError('Failed to reset password. Please check OTP and try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card p-4">
        <h2 className="mb-4 text-center text-light">Forgot Password</h2>

        {step === 1 && (
          <Formik
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={handleSendOtp}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label  text-light">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    disabled={loading}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="form-text text-danger"
                  />
                </div>

                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <Formik
            initialValues={{ otp: '', newPassword: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.otp) {
                errors.otp = 'OTP is required';
              }
              if (!values.newPassword) {
                errors.newPassword = 'New password is required';
              } else if (values.newPassword.length < 6) {
                errors.newPassword = 'Password must be at least 6 characters';
              }
              return errors;
            }}
            onSubmit={handleSavePassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label  text-light">
                    Enter OTP
                  </label>
                  <Field
                    type="text"
                    name="otp"
                    id="otp"
                    disabled={loading}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="form-text text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label  text-light">
                    New Password
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    disabled={loading}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="form-text text-danger"
                  />
                </div>

                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Saving Password...' : 'Save Password'}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
