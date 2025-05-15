const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/users");
const { protect } = require("../middlewares/auth");
const { restrictTo } = require("../middlewares/restrictTo");

router.post("/signup", signup);
router.post("/login", login);

// Example of a protected route only accessible by admin
router.get("/", protect, restrictTo("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome admin user" });
});

module.exports = router;
