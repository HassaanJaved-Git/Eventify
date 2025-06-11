import {React,useState,useEffect} from 'react'
import '../../Allcss/Header.css'
import user from '../../assets/user.png'
import logo from '../../assets/webLogo.png'

const Header = () => {

  const [time,updateTime] = useState({
    hours:'00',
    minutes:'00',
    seconds:'00'
  }) 

// console.log('timeeeeee',hour,m)

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
        <span className="text-white webLogo me-4 fs-5"><img src={logo} alt="logo" /></span>

        <a href="#" className="nav-link text-white d-flex align-items-center me-4">
          <i className="bi bi-ticket-perforated-fill me-1"></i> Events
        </a>

        <a href="#" className="nav-link text-white d-flex align-items-center me-4">
          <i className="bi bi-calendar-event me-1"></i> Calendars
        </a>

        <a href="#" className="nav-link text-white d-flex align-items-center">
          <i className="bi bi-compass me-1"></i> Discover
        </a>
      </div>


      <div className="d-flex align-items-center">
        <span className="text-white me-3">{time.hours} : {time.minutes} : {time.seconds}</span>

        <a href="#" className="btn btn-outline-light btn-sm me-3">Create Event</a>
        <a href="#" className="btn btn-sm me-3"><img className='w-7' src={user} alt="" /></a>


      </div>
    </div>
    </>
  )
}

export default Header
