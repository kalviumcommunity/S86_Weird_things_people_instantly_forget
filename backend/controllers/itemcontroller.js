const mongoose = require("mongoose");
const Item = require("../models/item");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create Item
exports.createItem = async (req, res) => {
  try {
    const { title, category, isRemembered, created_by } = req.body;

    if (!title || !category || !created_by) {
      return res.status(400).json({ error: "Title, category, and creator are required" });
    }

    const userExists = await User.findById(created_by);
    if (!userExists) {
      return res.status(404).json({ error: "Creator user not found" });
    }

    const newItem = new Item({
      title,
      category,
      isRemembered: !!isRemembered,
      created_by,
    });

    await newItem.save();
    const populatedItem = await Item.findById(newItem._id).populate("created_by", "username email");

    res.status(201).json(populatedItem);
  } catch (err) {
    console.error("Create item error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get All Items
exports.getAllItems = async (_req, res) => {
  try {
    const items = await Item.find().populate("created_by", "username email");
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID format" });
  }

  try {
    const item = await Item.findById(id).populate("created_by", "username email");
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Items by User
exports.getItemsByUser = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  try {
    const items = await Item.find({ created_by: userId }).populate("created_by", "username email");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, category, isRemembered } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID format" });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { title, category, isRemembered },
      { new: true, runValidators: true }
    ).populate("created_by", "username email");

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID format" });
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};