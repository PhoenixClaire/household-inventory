const { default: mongoose } = require("mongoose");

//starts the server
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/household-inventory";

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });