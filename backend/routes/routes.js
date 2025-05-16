const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/items", authMiddleware, itemController.createItem);
router.put("/items/:id", authMiddleware, itemController.updateItem);
router.delete("/items/:id", authMiddleware, itemController.deleteItem);

// Public routes
router.get("/items", itemController.getAllItems);
router.get("/items/:id", itemController.getItemById);
router.get("/items/user/:userId", itemController.getItemsByUser);

module.exports = router;