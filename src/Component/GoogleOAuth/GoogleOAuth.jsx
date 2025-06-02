import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleOAuth = () => {
    const navigate = useNavigate();

    const handleSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);

        axios.post("http://localhost:5000/api/auth/google", { token })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            const user = res.data.user;

            if(!user.userName){
                navigate("/username");
            }
            else{
                navigate('/')
            }

        })
        .catch((err) => {
            console.error(err);
            alert("Google login failed");
        });
    };

    return (
        <div className="text-center my-1">
            <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login Failed")} />
        </div>
    );
};

export default GoogleOAuth;
