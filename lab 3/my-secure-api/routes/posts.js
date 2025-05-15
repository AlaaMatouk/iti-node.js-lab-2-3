const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const { protect } = require("../middlewares/auth");
const { restrictTo } = require("../middlewares/restrictTo");

router.use(protect);

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);

module.exports = router;
