const Post = require("../models/post.js");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("createdBy", "name email");
    // Add a flag to indicate if the post was created by the logged-in user
    const modifiedPosts = posts.map((post) => {
      const postObj = post.toObject();
      postObj.isMine =
        post.createdBy._id.toString() === req.user._id.toString();
      return postObj;
    });
    res.status(200).json({
      status: "success",
      results: modifiedPosts.length,
      data: modifiedPosts,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    const postObj = post.toObject();
    postObj.isMine = post.createdBy._id.toString() === req.user._id.toString();

    res.status(200).json({ status: "success", data: postObj });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      createdBy: req.user._id,
    });

    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this post" });
    }

    const { title, content } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();

    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (
      post.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this post" });
    }

    await post.remove();

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};
