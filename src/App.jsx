import React from 'react';
import './APP.css'
import {lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const SignUp = lazy(()=>import('./Component/SignUp/SignUp'));
const LoginPage = lazy(()=>import('./Component/Login/Login'));
const Dashboard = lazy(()=>import('./Component/Dashboard/dashboard'));
const CreateEventPage = lazy(()=>import('./Pages/CreateEventPage'));
const ForgetPassword = lazy(()=>import('./Component/Forget-Password/ForgetPassword'))

// import Content from './Components/Content/Content'
// import Footer from './Components/Footer/Footer'
import MyNavbar from './Component/Navber/Navbar';
import UserName from './Component/UserName/UserName'

import { AuthProvider } from "./Context/AuthContext";
// import Settings from '../src/Pages/Setting';

import ProfilePage from './Pages/ProfilePage';
import Settings from './Pages/Setting'

import './App.css'
import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer'
// import tailwindcss from 'tailwindcss'
import Header from "./Components/Header/Header"

function App() {
  return (
    <>
        <Header />
        <Content />
        <Footer />
    
    <BrowserRouter>
      <AuthProvider>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                     <Route path="/settings" element={<Settings />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </>
  );

}
export default App;
