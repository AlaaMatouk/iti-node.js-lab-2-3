require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json()); // عشان نقدر نقرأ JSON من الـ body

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
