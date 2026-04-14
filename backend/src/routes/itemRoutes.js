const express = require("express");
const { createItem, getAllItems, getShoppingList, updateItem, deleteItem } = require("../controllers/itemController");

const router = express.Router();

router.get("/shopping-list", getShoppingList);
router.post("/", createItem);
router.get("/", getAllItems);
router.put("/:id", updateItem);
router.delete("/:id",deleteItem); 

module.exports = router; 