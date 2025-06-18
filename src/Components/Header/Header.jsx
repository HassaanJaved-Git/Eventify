import {React, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../Allcss/Header.css'
import axios from 'axios';
import defaultUserPic from '../../assets/user.png'
import logo from '../../assets/webLogo.png'

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [ profileImageURL, setProfileImageURL ] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserName = async (token) => {
      try {
        if (token) {
          const response = await axios.get('http://localhost:5000/api/user/get-Name-UserName-ProfilePic', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserName(response.data.userName);
          setProfileImageURL(response.data.profileImageURL);
        }
      } catch (error) {
        console.error('Error fetching userName:', error.response?.data || error.message);
      }
    };

    fetchUserName(token);
  }, [] );

  const createEvent  = () => {
    if (!token) {
      navigate('/login', {
        state: { fromCreateEvent: true }
      });
    } else {
      navigate('/create-event');
    }
  }

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
          {!token ? (
              <button type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/login')}>
                Login
              </button>
          ) : (
            <>
              <button  type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/settings/account')}>
                Settings
              </button>
              <button type="button" className="btn btn-sm me-3" onClick={() => navigate(`/${userName}`)}>
                <img className="w-7 rounded-circle" src={profileImageURL || defaultUserPic } alt="User profile" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
