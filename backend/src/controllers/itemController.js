const Item = require("../models/Item");
const getStockStatus = require("../utils/getStockStatus");

//adds an item into the list
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

module.exports = { createItem }; 