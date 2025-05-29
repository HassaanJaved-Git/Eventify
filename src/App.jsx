import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './Component/SignUp/SignUp';
import LoginPage from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Profile from './Component/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/signUp" element = {<SignUp />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path = "/" element = {<Dashboard/>}/>
          <Route path = "*" element = {<h1>404 Not Found</h1>} />
          <Route path = "/:username" element = {<Profile/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;