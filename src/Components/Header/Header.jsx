import {React, useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Allcss/Header.css'
import defaultUserPic from '../../assets/user.png'
import logo from '../../assets/webLogo.png'

import { AuthContext } from '../../Context/AuthContext';

const Header = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();
  // const [userName, setUserName] = useState('');
  // const [ profileImageURL, setProfileImageURL ] = useState('');
  // const [token, setToken] = useState(localStorage.getItem('token'));

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newToken = localStorage.getItem('token');
  //     setToken(newToken);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   // Optional: You can trigger setToken from login/logout too if both are in React
  //   return () => window.removeEventListener('storage', handleStorageChange);
  // }, []);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     if (!token) {
  //       setUserName('');
  //       setProfileImageURL('');
  //       return;
  //     }

  //     try {
  //       const res = await axios.get('http://localhost:5000/api/user/get-Name-Email-UserName-ProfilePic', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });

  //       setUserName(res.data.userName);
  //       setProfileImageURL(res.data.profileImageURL);
  //     } catch (err) {
  //       console.error('Error fetching user info:', err);
  //     }
  //   };

  //   fetchUserInfo();
  // }, [token]);

  const createEvent = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { fromCreateEvent: true } });
    } else {
      navigate("/create-event");
    }
  };

  const [time,updateTime] = useState({
    hours:'00',
    minutes:'00',
    seconds:'00'
  }) 

useEffect(() => {
    
    const intervalId = setInterval(() => {
      const now = new Date();
      updateTime({
        hours: now.getHours().toString().padStart(2, '0'), 
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds().toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="navbar navbar-expand-lg px-4 d-flex justify-content-between header">
      
        <div className="d-flex align-items-center">
          <span className="text-white webLogo me-4 fs-5" onClick={() => navigate('/')}><img src={logo} alt="logo" /></span>
            <h2 className="text-white">
              <button type="button" onClick={() => navigate('/')}>
                EVENTIFY
              </button>
            </h2>
        </div>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">{time.hours} : {time.minutes} : {time.seconds}</span>

          <button type="button" className="btn btn-outline-light btn-sm me-3" onClick={createEvent}>
            Create Event
          </button>
          {!isLoggedIn  ? (
              <button type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/login')}>
                Login
              </button>
          ) : (
            <>
              <button  type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/settings/account')}>
                Settings
              </button>
              <button type="button" className="btn btn-sm me-3" onClick={() => navigate(`/${user?.userName}`)}>
                <img className="w-7 rounded-circle" src={user?.profileImageURL || defaultUserPic} alt="User profile" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
