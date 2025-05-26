import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Component/SignUp/SignUp';
import LoginPage from './Component/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Ye line active karni hai */}
        <Route path="/" element={<SignUp />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
