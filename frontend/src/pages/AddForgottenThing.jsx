import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function AddForgottenThing() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required.';
    } else if (title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters.';
    }

    if (!category.trim()) {
      errors.category = 'Category is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (!validateInputs()) return;

    const newItem = { title, category, isRemembered };

    try {
      await axios.post('http://localhost:5000/api/items', newItem);
      setSuccess('Item added successfully!');
      setTimeout(() => navigate('/forgotten'), 1500);
    } catch (err) {
      setFieldErrors({ form: err.response?.data?.error || 'Failed to add item. Please try again.' });
    }
  };

  return (
    <div className="add-forgotten-thing">
      <h1>Add Forgotten Thing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          {fieldErrors.title && <p style={{ color: 'red', margin: '4px 0' }}>{fieldErrors.title}</p>}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Category</label>
          {fieldErrors.category && <p style={{ color: 'red', margin: '4px 0' }}>{fieldErrors.category}</p>}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

        {fieldErrors.form && <p style={{ color: 'red' }}>{fieldErrors.form}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button className="btn-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddForgottenThing;
