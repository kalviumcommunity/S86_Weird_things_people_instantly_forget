import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AddForgotten = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    isRemembered: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const itemToEdit = location.state?.item;

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to add or edit forgotten things.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (itemToEdit) {
        // Update an existing item
        await axios.put(
          `http://localhost:5000/api/items/${itemToEdit._id}`,
          formData,
          config
        );
        setSuccess("Item updated successfully.");
      } else {
        // Add a new item
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const itemData = {
          ...formData,
          created_by: userData.userId
        };
        
        await axios.post("http://localhost:5000/api/items", itemData, config);
        setSuccess("Item added successfully.");
      }

      // Redirect after successful operation
      setTimeout(() => navigate("/forgotten"), 1500);
    } catch (err) {
      setError("Error saving item: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title,
        category: itemToEdit.category,
        isRemembered: itemToEdit.isRemembered,
      });
    }
  }, [itemToEdit]);

  return (
    <div className="add-forgotten-page">
      <h1>{itemToEdit ? "Edit Forgotten Thing" : "Add Forgotten Thing"}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
        />
        <label>
          <input
            type="checkbox"
            name="isRemembered"
            checked={formData.isRemembered}
            onChange={handleInputChange}
          />
          Remembered
        </label>
        <button type="submit">{itemToEdit ? "Update" : "Add"} Item</button>
      </form>
    </div>
  );
};

export default AddForgotten;