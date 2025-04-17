import React from 'react';

function ForgottenThingCard({ title, category }) {
  return (
    <div className="forgotten-card">
      <h3>{title}</h3>
      <p>Category: {category}</p>
    </div>
  );
}

export default ForgottenThingCard;
