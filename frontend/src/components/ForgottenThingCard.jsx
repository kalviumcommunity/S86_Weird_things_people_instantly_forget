import React from 'react';

function ForgottenThingCard({
  title,
  category,
  isRemembered,
  createdBy,
  onEdit,
  onDelete
}) {
  // Ensure the createdBy object is valid and fall back to "Unknown" if not
  const createdByName = createdBy && createdBy.username ? createdBy.username : 'Unknown';

  return (
    <div className="forgotten-card">
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Status: {isRemembered ? "Remembered ✅" : "Still Forgotten ❌"}</p>
      <p>Created by: {createdByName}</p>

      <div className="card-buttons">
        {/* Attach the functions to the buttons */}
        <button className="card-button edit-button" onClick={onEdit}>✏️ Edit</button>
        <button className="card-button delete-button" onClick={onDelete}>🗑 Delete</button>
      </div>
    </div>
  );
}

export default ForgottenThingCard;
