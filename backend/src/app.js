//the express app itself

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//start
app.get("/", (req, res) => {
    res.status(200).json({
        message: "App is running",
    });
});

module.exports = app; //export app
