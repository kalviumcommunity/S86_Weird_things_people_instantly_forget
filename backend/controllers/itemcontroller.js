const Item = require("../models/item");

// CREATE
exports.createItem = async (req, res) => {
  try {
    const { title, category, isRemembered } = req.body;

    // Basic validation
    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required" });
    }

    const newItem = await Item.create({
      title,
      category,
      isRemembered: isRemembered || false,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateItem = async (req, res) => {
  try {
    const { title, category, isRemembered } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, category, isRemembered },
      { new: true, runValidators: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
