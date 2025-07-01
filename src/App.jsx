import React from 'react';
import './APP.css'
import {lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
const SignUp = lazy(()=>import('./Component/SignUp/SignUp'));
const LoginPage = lazy(()=>import('./Component/Login/Login'));
// const Dashboard = lazy(()=>import('./Component/Dashboard/dashboard'));
const CreateEventPage = lazy(()=>import('./Pages/CreateEventPage'));
const ForgetPassword = lazy(()=>import('./Component/Forget-Password/ForgetPassword'))
import Layout from './Component/Layout/Layout';
import Content from './Components/Content/Content'
import { AuthProvider } from "./Context/AuthContext";
import Settings from './Pages/Setting';
import Errorpage from './Pages/ErrorPage.jsx'
// import Stripe from './Components/Stripe.jsx'
import ProfilePage from './Pages/ProfilePage/ProfilePage.jsx';
import AboutTab from './Component/Settings/About.jsx';
import HelpTab from './Component/Settings/Help.jsx';
import BillingTab from './Component/Settings/Billing.jsx';
import SecurityTab from './Component/Settings/Security.jsx';
import PrivacyTab from './Component/Settings/Privacy.jsx';
import AccountTab from './Component/Settings/Account.jsx';
import NotificationsTab from './Component/Settings/notifications.jsx';
import Ticket from './Component/Tickets/Ticket.jsx'
import EditEventPage from './Pages/EditPage.jsx'
import Stripe from './Components/Stripe.jsx';
function App() {
  return (
    <Suspense
      fallback={
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
    >
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route index element={<Content />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/settings" element={<Settings />}>
                <Route path='about' element={<AboutTab/>}/>
                <Route path='help' element={<HelpTab/>}/>
                <Route path='billing' element={<BillingTab/>}/>
                <Route path='security' element={<SecurityTab/>}/>
                <Route path='privacy' element={<PrivacyTab/>}/>
                <Route path='account' element={<AccountTab/>}/>
                <Route path='notifications' element={<NotificationsTab/>}/>
              </Route>
              <Route path="/:userName" element={<ProfilePage />} />
              <Route path="/404" element={<Errorpage />}/>
              <Route path="/ticket/:id" element={<Ticket />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
               <Route path="/stripe" element={<Stripe />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
    </Suspense>
  );
}

export default App;
