const Item = require("../models/Item");
const getStockStatus = require("../utils/getStockStatus");

//adds an item into the inventory
const createItem = async(req, res) => {
    try{

        //get the data from the body [what user wants to create]
        const {
            name,
            quantity,
            unit,
            threshold
        } = req.body; 

        const normalizedName = name?.trim().toLowerCase();

        const existingItem = await Item.findOne({ normalizedName }); 

        if(existingItem){
            return res.status(409).json({
                message: "Item already exists in inventory."
            });
        }

        //save
        const newItem = await Item.create({
            name: name.trim(),
            normalizedName,
            quantity,
            unit,
            threshold
        });
        
        //return OK status and saved item [attributes and stock status]
        return res.status(201).json({
            item:{
                ...newItem.toObject(),
                stockStatus: getStockStatus(newItem.quantity, newItem.threshold),
            },
            message: "Item created successfully"
        });
    } catch (error){
        return res.status(400).json({
            message: "Failed to create item",
            error: error.message,
        });
    }
};

//get all items in inventory
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();

        const itemWithStatus = items.map((item) => ({
            ...item.toObject(),
            stockStatus: getStockStatus(item.quantity, item.threshold),
        }));

        return res.status(200).json({
            message: "Items fetched successfully",
            items: itemWithStatus,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch items",
            error: error.message,
        });
    }
};

//add item to the shopping list if <= threshold or == 0
const getShoppingList = async (req, res) => {
    try {
        const items = await Item.find();

        const shoppingList = items
            .filter((item) => item.quantity === 0 || item.quantity <= item.threshold)
            .map((item) => ({
                ...item.toObject(),
                stockStatus: getStockStatus(item.quantity, item.threshold),
                quantityToBuy: item.threshold + 1 - item.quantity,
            }));

            return res.status(200).json({
                message: "Shopping list fetched successfully",
                items: shoppingList,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch shopping list",
            error: error.message,
        });
    }
};

//update items 
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            quantity,
            unit,
            threshold
        } = req.body || {};

        const normalizedName = name?.trim().toLowerCase();

        const duplicateItem = await Item.findOne({
            normalizedName,
            _id: { $ne: id },
        });

        if(duplicateItem){
            return res.status(409).json({
                message: "Another item with this name already exists."
            });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                normalizedName,
                quantity,
                unit,
                threshold,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if(!updatedItem){
            return res.status(404).json({
                message: "Item not found",
            });
        }

        return res.status(200).json({
            message: "Item updated successfully",
            item: {
                ...updatedItem.toObject(),
                stockStatus: getStockStatus(updatedItem.quantity, updatedItem.threshold),
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to update item",
            error: error.message,
        });
    }
};

//delete items 
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);

        if(!deletedItem){
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json({
            message: "Item deleted successfully",
            item: deletedItem,
        });

    } catch (error) {
        return res.status(400).json({
            message: "Failed to delete item",
            error: error.message,
        });
    }
};

module.exports = { createItem, getAllItems, getShoppingList, updateItem, deleteItem}; 