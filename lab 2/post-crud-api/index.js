const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/posts", postRoutes);

// Connect to DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
