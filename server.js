const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const port = 5000;
const app = express();

// Set the strictQuery option to false
mongoose.set("strictQuery", false);

// Middleware to parse request bodies as JSON
app.use(express.json());
app.use(cors());
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    //admin routes
    app.use("/admin", require("./routes/adminRoutes"));
    //article routes
    app.use("/article",require("./routes/articleRouter"));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
