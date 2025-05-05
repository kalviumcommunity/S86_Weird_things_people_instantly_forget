import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ForgottenThings from './pages/ForgottenThings';
import AddForgottenThing from './pages/AddForgottenThing';
import Signup from './pages/Signup';
import Login from './pages/Login';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='home'>
      <h1>Welcome to the "Weird Things People Instantly Forget" App 🚀</h1>
      <p>This app highlights quirky things people often forget, and lets users interact with them!</p>
      <button onClick={() => navigate('/forgotten')}>View Forgotten Things</button>
      {!localStorage.getItem('token') && (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotten" element={<ForgottenThings />} />
        <Route path="/add-forgotten" element={<AddForgottenThing />} />
      </Routes>
    </Router>
  );
}

export default App;