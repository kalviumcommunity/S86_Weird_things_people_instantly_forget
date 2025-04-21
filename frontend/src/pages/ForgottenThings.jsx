import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgottenThingCard from '../components/ForgottenThingCard';

function ForgottenThings() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <h1>🧠 Forgotten Things</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="forgotten-things-container">
          {items.map((item) => (
            <ForgottenThingCard
              key={item._id}
              title={item.title}
              category={item.category}
              isRemembered={item.isRemembered}
            />
          ))}
        </div>
      )}

      <button className="add-button" onClick={() => navigate('/add-forgotten')}>
        ➕ Add Forgotten Thing
      </button>
        <br />
      <button className="back-button" onClick={() => navigate('/')}>
        🔙 Back to Home
      </button>
    </div>
  );
}

export default ForgottenThings;
