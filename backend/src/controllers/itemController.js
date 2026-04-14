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

        //save
        const newItem = await Item.create({
            name,
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



module.exports = { createItem, getAllItems}; 