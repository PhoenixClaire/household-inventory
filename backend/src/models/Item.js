const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Item name is required"],
            trim: true,
        },
        normalizedName:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity cannot be negative"],
        },
        unit: {
            type: String,
            default: "pcs",
            trim: true,
        },
        threshold: {
            type: Number,
            required: [true, "Threshold is required"],
            min: [0, "Threshold cannot be negative"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Item", itemSchema);