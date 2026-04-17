//the express app itself

const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://household-inventory.vercel.app",
        ]
    })
);

app.use(express.json());

//start
app.get("/", (req, res) => {
    res.status(200).json({
        message: "App is running",
    });
});

//connect app to item routes
app.use("/api/items", itemRoutes); 


module.exports = app; //export app
