import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemForm({ onSubmit, editItem }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setCategory(editItem.category);
      setIsRemembered(editItem.isRemembered);
    } else {
      setTitle("");
      setCategory("");
      setIsRemembered(false);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editItem) {
        response = await axios.put(`/api/items/${editItem._id}`, {
          title,
          category,
          isRemembered,
        });
      } else {
        // Replace "userId" with actual user ID from auth/session
        response = await axios.post("/api/items", {
          title,
          category,
          isRemembered,
          created_by: "userId", // optional if handled by middleware
        });
      }

      onSubmit(response.data);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isRemembered}
          onChange={() => setIsRemembered(!isRemembered)}
        />{" "}
        Remembered
      </label>
      <button type="submit">{editItem ? "Update" : "Add"} Item</button>
    </form>
  );
}

export default ItemForm;
