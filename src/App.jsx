import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './Component/SignUp/SignUp';
import LoginPage from './Component/Login/Login';
import Dashboard from './Component/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/signUp" element = {<SignUp />} />
          <Route path = "/login" element = {<LoginPage />} />
          <Route path = "/" element = {<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;