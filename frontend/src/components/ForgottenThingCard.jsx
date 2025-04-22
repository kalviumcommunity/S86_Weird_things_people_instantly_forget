import React from 'react';

function ForgottenThingCard({
  title,
  category,
  isRemembered,
  onEdit,
  onDelete,
}) {
  return (
    <div className="forgotten-card">
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Status: {isRemembered ? "Remembered ✅" : "Still Forgotten ❌"}</p>

      <div>
        <button
          className="card-button edit-button"
          onClick={onEdit}
        >
          ✏️ Edit
        </button>
        <button
          className="card-button delete-button"
          onClick={onDelete}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ForgottenThingCard;
