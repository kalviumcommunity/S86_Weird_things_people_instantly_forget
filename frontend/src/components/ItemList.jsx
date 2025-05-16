import React, { useEffect, useState } from "react";
import ForgottenThingCard from "./ForgottenThingCard";
import axios from "axios";
import ItemForm from "./ItemForm.jsx";

function ItemList() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleFormSubmit = (newItem) => {
    if (editItem) {
      // Edit mode
      setItems((prev) =>
        prev.map((item) => (item._id === newItem._id ? newItem : item))
      );
      setEditItem(null);
    } else {
      // New item
      setItems((prev) => [newItem, ...prev]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Forgotten Things</h2>
      <ItemForm onSubmit={handleFormSubmit} editItem={editItem} />
      <div className="item-list">
        {items.map((item) => (
          <ForgottenThingCard
            key={item._id}
            title={item.title}
            category={item.category}
            isRemembered={item.isRemembered}
            createdBy={item.created_by}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
