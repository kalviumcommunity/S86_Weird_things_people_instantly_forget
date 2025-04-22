import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForgottenThingCard from '../components/ForgottenThingCard';

function ForgottenThings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', isRemembered: false });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      setError("Error fetching items.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(prev => prev.filter(item => item._id !== id));
      setSuccess("Item deleted successfully.");
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setEditForm({ title: item.title, category: item.category, isRemembered: item.isRemembered });
    setError('');
    setSuccess('');
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/items/${id}`, editForm);
      setItems(prev => prev.map(item => item._id === id ? res.data : item));
      setEditingItemId(null);
      setSuccess("Item updated successfully.");
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  return (
    <div className="home">
      <h1>🧠 Forgotten Things</h1>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="forgotten-things-container">
          {items.map(item => (
            <div key={item._id} className="forgotten-card">
              {editingItemId === item._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    placeholder="Category"
                  />
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="isRemembered"
                      checked={editForm.isRemembered}
                      onChange={handleEditChange}
                    />
                    Remembered?
                  </label>
                  <button className="card-button edit-button" onClick={() => handleUpdate(item._id)}>✅ Save</button>
                  <button className="card-button delete-button" onClick={() => setEditingItemId(null)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p>Category: {item.category}</p>
                  <p>Status: {item.isRemembered ? "Remembered ✅" : "Still Forgotten ❌"}</p>
                  <div>
                    <button className="card-button edit-button" onClick={() => handleEditClick(item)}>✏️ Edit</button>
                    <button className="card-button delete-button" onClick={() => handleDelete(item._id)}>🗑 Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="add-button" onClick={() => window.location.href = '/add-forgotten'}>
        ➕ Add Forgotten Thing
      </button>
      <br />
      <button className="back-button" onClick={() => window.location.href = '/'}>
        🔙 Back to Home
      </button>
    </div>
  );
}

export default ForgottenThings;
