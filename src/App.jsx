import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

import MyNavbar from './Component/Navber/Navbar';
import SignUp from './Component/SignUp/SignUp';
import LoginPage from './Component/Login/Login';
import Dashboard from './Component/Dashboard/dashboard';
import UserName from './Component/UserName/UserName'

import CreateEventPage from './Pages/CreateEventPage';

import { AuthProvider } from "./Context/AuthContext";
import Settings from './Pages/Setting';

// import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <MyNavbar />
          <Routes>
            <Route path="/*" element={"404"}/>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/username' element={<UserName />}/>
            <Route path="/create-event" element={<CreateEventPage />} />
             <Route path="/settings" element={<Settings />} />
                  {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
