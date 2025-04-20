import { useNavigate } from 'react-router-dom';

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

export default Home;
