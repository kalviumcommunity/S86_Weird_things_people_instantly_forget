import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Ensure this CSS is imported

function AddForgottenThing() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { title, category, isRemembered };

    axios.post('http://localhost:5000/api/items', newItem)
      .then((response) => {
        console.log('Item added:', response.data);
        navigate('/forgotten');  // Redirect to the ForgottenThings page after successful submission
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  return (
    <div className="add-forgotten-thing">
      <h1>Add Forgotten Thing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="checkbox-container">
          <label>Is Remembered?</label>
          <input
            type="checkbox"
            checked={isRemembered}
            onChange={(e) => setIsRemembered(e.target.checked)}
          />
        </div>
        <button className='btn-submit' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddForgottenThing;
