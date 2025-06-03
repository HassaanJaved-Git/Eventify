import React from 'react';
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
import GoogleOAuth from '../GoogleOAuth/GoogleOAuth';

import './SignUp.css'
const SignUp = () => {
    const navigate = useNavigate();

    const signUpSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').max(32, 'Password must be at most 32 characters').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[@$!%*?&]/, 'Password must contain at least one special character').required('Password is required'),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        axios.post('http://localhost:5000/api/user/register', values)
        .then((response) => {
            toast.success('User registered successfully!', { position: 'top-center' });
            resetForm();
            setTimeout(() => navigate('/username'), 1000);
            const { token, user } = response.data
            const { name, email } = user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify({ name, email }))
        })
        .catch ((error) => {
            console.error('Registration error:', error.response?.data || error.message);
            toast.error('Registration failed: ' + (error.response?.data?.message || error.message), { position: 'top-center', })
        })
        .finally (() => {
            setSubmitting(false);
        })
    };

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <ToastContainer position="top-center" autoClose={3000} theme="colored" />

            <div className="signup-login-background">
                <div className="container h-100 d-flex align-items-center justify-content-center">
                    <div className="card signup-login-card p-4">
                        <h2 className="text-center mb-4 signup-login-title"> Sign Up</h2>

                        <Formik
                            initialValues = {{ name: '', email: '', password: '' }}
                            validationSchema = {signUpSchema}
                            onSubmit = {handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-3 position-relative">
                                        <Field type="text" name="name" placeholder="Enter Name" className="form-control signup-login-input pe-5" />
                                        <FaUser className="icon" />
                                        <ErrorMessage name="name" component="div" className="text-danger mt-1 error-message" />
                                    </div>
                                    <div className="mb-3 position-relative">
                                        <Field type="email" name="email" placeholder="Enter Email" className="form-control signup-login-input pe-5" />
                                        <MdMarkEmailUnread className="icon" />
                                        <ErrorMessage name="email" component="div" className="text-danger mt-1 error-message" />
                                    </div>
                                    <div className="mb-3 position-relative">
                                        <Field type="password" name="password" placeholder="Enter Password" className="form-control signup-login-input pe-5" />
                                        <FaLock className='icon' />
                                        <ErrorMessage name="password" component="div" className="text-danger mt-1 error-message" />
                                    </div>
                                    <button type="submit" className="btn signup-login-button w-100" disabled={isSubmitting} >
                                        {isSubmitting ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'SignUp'
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
                                Already have an account? 
                                <button type="button" onClick={() => navigate('/login')} className="btn signup-login-link" >
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
