import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForgottenThingCard from '../components/ForgottenThingCard';

function ForgottenThings() {
  const navigate = useNavigate();

  const dummyItems = [
    { id: 1, title: "Why they walked into a room", category: "Tasks" },
    { id: 2, title: "Where they left their keys", category: "Objects" },
    { id: 3, title: "Passwords they just changed", category: "Facts" },
    { id: 4, title: "That one thing they were supposed to get at the store", category: "Tasks" },
  ];

  return (
    <div className="home">
      <h1>🧠 Forgotten Things</h1>
      <div className="forgotten-things-container">
        {dummyItems.map((item) => (
          <ForgottenThingCard
            key={item.id}
            title={item.title}
            category={item.category}
          />
        ))}
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        🔙 Back to Home
      </button>
    </div>
  );
}

export default ForgottenThings;
