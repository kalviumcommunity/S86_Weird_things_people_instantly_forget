import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ForgottenThingCard from '../components/ForgottenThingCard';
import { useNavigate } from 'react-router-dom';

function ForgottenThings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    isRemembered: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users/userlist');
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Error fetching users: ' + err.message);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const url = selectedUserId
        ? `http://localhost:5000/api/items/user/${selectedUserId}`
        : 'http://localhost:5000/api/items';
      const res = await axios.get(url);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError('Error fetching items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to delete items.');
        return;
      }
      
      await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Item deleted successfully.');
      setError('');
      fetchItems();
    } catch (err) {
      setError('Error deleting item: ' + err.message);
      setSuccess('');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      isRemembered: item.isRemembered,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: '',
      isRemembered: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to update items.');
        return;
      }

      await axios.put(
        `http://localhost:5000/api/items/${editingItem._id}`, 
        formData,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setSuccess('Item updated successfully.');
      setError('');
      setEditingItem(null);
      setFormData({
        title: '',
        category: '',
        isRemembered: false,
      });
      fetchItems();
    } catch (err) {
      setError('Error updating item: ' + err.message);
      setSuccess('');
    }
  };

  return (
    <div className="home">
      <h1>🧠 Forgotten Things</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id}>
                {editingItem && editingItem._id === item._id ? (
                  <form onSubmit={handleUpdate}>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Category"
                      required
                    />
                    <label>
                      <input
                        type="checkbox"
                        name="isRemembered"
                        checked={formData.isRemembered}
                        onChange={handleChange}
                      />
                      Remembered
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <ForgottenThingCard
                    title={item.title}
                    category={item.category}
                    isRemembered={item.isRemembered}
                    createdBy={item.created_by}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item._id)}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No items found for the selected user.</p>
          )}
        </div>
      )}

      <button className="add-button" onClick={() => navigate('/add-forgotten')}>
        ➕ Add Forgotten Thing
      </button>
    </div>
  );
}

export default ForgottenThings;