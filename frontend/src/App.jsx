import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../src/Component/SignUp/SignUp/SignUp';
import LoginPage from '../src/Component/Login/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<SignUp />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
