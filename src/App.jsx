import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';

import MyNavbar from './Component/Navber/Navbar';
import SignUp from './Component/SignUp/SignUp';
import LoginPage from './Component/Login/Login';
import Dashboard from './Component/Dashboard/dashboard';

import { AuthProvider } from "./Component/Context/AuthContext";
import CreateEventPage from './Pages/CreateEventPage';

// import ProfilePage from './Pages/ProfilePage';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/create-event" element={<CreateEventPage />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
