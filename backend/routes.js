const express = require("express");
const router = express.Router();
const controller = require("../controllers/itemcontroller");

router.post("/items", controller.createItem);
router.get("/items", controller.getAllItems);
router.get("/items/:id", controller.getItemById);
router.put("/items/:id", controller.updateItem);
router.delete("/items/:id", controller.deleteItem);

module.exports = router;
