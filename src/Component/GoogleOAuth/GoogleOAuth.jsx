import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const GoogleOAuth = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      });

      toast.success("Login successful!", {
        position: "top-center",
      });

      const { token } = res.data;

      login(token);

      navigate("/");
    } catch (error) {
      console.error(
        "Google login error:",
        error.response?.data || error.message
      );
      toast.error(
        "Login failed: " + (error.response?.data?.message || error.message),
        {
          position: "top-center",
        }
      );
    }
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

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </>
  );
};

export default GoogleOAuth;
