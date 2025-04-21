import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ForgottenThings from './pages/ForgottenThings';
import AddForgottenThing from './pages/AddForgottenThing';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='home'>
      <h1>Welcome to the "Weird Things People Instantly Forget" App 🚀</h1>
      <p>This app highlights quirky things people often forget, and lets users interact with them!</p>
      <button onClick={() => navigate('/forgotten')}>View Forgotten Things</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgotten" element={<ForgottenThings />} />
        <Route path="/add-forgotten" element={<AddForgottenThing />} />
      </Routes>
    </Router>
  );
}

export default App;
