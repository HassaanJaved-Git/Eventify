import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserTie } from "react-icons/fa";
import debounce from 'lodash.debounce';

const UserName = () => {
    const navigate = useNavigate();

    // const { values } = useFormikContext();

    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [checking, setChecking] = useState(false);

    const token = localStorage.getItem("token");

    const userNameSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, 'At least 3 characters')
            .max(20, 'Max 20 characters')
            .matches(/^[a-zA-Z0-9_.-]+$/, 'Invalid characters')
            .required('Required'),
    });

    const checkUsername = useCallback(
        debounce(async (username) => {
            try {
                setChecking(true);
                const res = await axios.post("http://localhost:5000/api/user/check-username", 
                    { userName: username }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsernameAvailable(res.data.available); 
            } catch (err) {
                console.error("Check username error", err);
                setUsernameAvailable(false);
            } finally {
                setChecking(false);
            }
        }, 500),
        []
    );

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const trimmedValues = { userName: values.userName.trim() };
        axios.post('http://localhost:5000/api/user/username', 
            trimmedValues, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success('UserName set successfully!', { position: 'top-center' });
                resetForm();
                setTimeout(() => navigate('/'), 1000);
            })
            .catch((error) => {
                console.error('Setting UserName error:', error.response?.data || error.message);
                toast.error('Setting UserName failed: ' + (error.response?.data?.message || error.message), { position: 'top-center' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div>
            <Helmet>
                <title>UserName</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
            </Helmet>
            <ToastContainer position="top-center" autoClose={3000} theme="colored" />

            <div className="signup-login-background">
                <div className="container h-100 d-flex align-items-center justify-content-center">
                    <div className="card signup-login-card p-4">
                        <h2 className="text-center mb-4 signup-login-title">Set UserName</h2>

                        <Formik
                            initialValues={{ userName: '' }}
                            validationSchema={userNameSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, values, handleChange }) => {
                                useEffect(() => {
                                    if (values.userName.trim().length >= 3) {
                                        checkUsername(values.userName);
                                    } else {
                                        setUsernameAvailable(null);
                                    }
                                }, [values.userName]);

                                return (
                                    <Form>
                                        <div className="mb-3 position-relative">
                                            <Field
                                                type="text"
                                                name="userName"
                                                placeholder="Enter Username"
                                                className="form-control signup-login-input pe-5"
                                                onChange={handleChange}
                                            />
                                            <FaUserTie className="icon" />
                                            <ErrorMessage name="userName" component="div" className="text-danger mt-1 error-message" />

                                            {checking && <div className="text-info mt-1">Checking availability...</div>}
                                            {usernameAvailable === false && <div className="text-danger mt-1">Username is taken</div>}
                                            {usernameAvailable === true && <div className="text-success mt-1">Username is available</div>}
                                        </div>

                                        <button type="submit" className="btn signup-login-button w-100" disabled={isSubmitting || checking || usernameAvailable === false}>
                                            {isSubmitting ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                'SignUp'
                                            )}
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserName;