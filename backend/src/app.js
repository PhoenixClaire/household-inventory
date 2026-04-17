//the express app itself

const express = require("express");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

const allowedOrgins =  [
            "http://localhost:5173",
            "https://household-inventory-3xzg9972v-phoenixclaires-projects.vercel.app/"
        ]

app.use(
    cors({

        origin: function (origin, callback) {
            if(!origin || allowedOrgins.includes(origin)){
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS")); 
            }
        },
        
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
