import {React,useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import '../../Allcss/Header.css'
import user from '../../assets/user.png'
import logo from '../../assets/webLogo.png'


const Header = () => {
  const navigate = useNavigate();


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

        
          <h2 className="text-white">EVENTIFY</h2>

      </div>


      <div className="d-flex align-items-center">
        <span className="text-white me-3">{time.hours} : {time.minutes} : {time.seconds}</span>

        <button type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/create-event')}>
  Create Event
</button>
<button type="button" className="btn btn-outline-light btn-sm me-3" onClick={() => navigate('/login')}>
  Login
</button>
<button type="button" className="btn btn-sm me-3" onClick={() => navigate('/profile')}>
  <img className="w-7" src={user} alt="User profile" />
</button>


      </div>
    </div>
    </>
  )
}

export default Header
