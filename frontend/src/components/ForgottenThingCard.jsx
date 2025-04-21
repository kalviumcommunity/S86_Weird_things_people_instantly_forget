import React from 'react';

function ForgottenThingCard({ title, category, isRemembered }) {
  return (
    <div className="forgotten-card">
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Status: {isRemembered ? "Remembered ✅" : "Still Forgotten ❌"}</p>
    </div>
  );
}

export default ForgottenThingCard;

