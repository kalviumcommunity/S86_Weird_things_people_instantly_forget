import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForgottenThings from './pages/ForgottenThings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgotten" element={<ForgottenThings />} />
      </Routes>
    </Router>
  );
}

export default App;
