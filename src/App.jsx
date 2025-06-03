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

import Content from './Components/Content/Content'
import Footer from './Components/Footer/Footer'
import MyNavbar from './Component/Navber/Navbar';
import UserName from './Component/UserName/UserName'

import { AuthProvider } from "./Context/AuthContext";
import Settings from './Pages/Setting';

// import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <Suspense fallback={<div className='loadDiv'>Loading...</div>} >
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <MyNavbar />
          <Routes>
            <Route path="/*" element={"404"}/>
            <Route path="/" element={<layout>
              <Content />
              <Footer />
            </layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/username' element={<UserName />}/>
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
             <Route path="/settings" element={<Settings />} />
                  {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </Suspense>
  );
}

export default App;