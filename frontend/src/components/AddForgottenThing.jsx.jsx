import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddForgottenThing() {
  const navigate = useNavigate();

  // State to store the new forgotten thing data
  const [newForgottenThing, setNewForgottenThing] = useState({
    title: '',
    category: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewForgottenThing({
      ...newForgottenThing,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission and add the item
    alert(`New forgotten thing added: "${newForgottenThing.title}"`);

    // Navigate back to the forgotten things page
    navigate('/forgotten');
  };

  return (
    <div className="add-forgotten-thing-form">
      <h1>📝 Add Forgotten Thing</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newForgottenThing.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={newForgottenThing.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Tasks">Tasks</option>
            <option value="Objects">Objects</option>
            <option value="Facts">Facts</option>
          </select>
        </label>
        <button type="submit">Add Forgotten Thing</button>
      </form>
    </div>
  );
}

export default AddForgottenThing;
