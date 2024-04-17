const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPostsByUserId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const posts = await Post.find({ user: id });
  res.status(200).json(posts);
});

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getMyPosts = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const posts = await Post.find({ user: id });
  res.status(200).json(posts);
});

// @desc    Set post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.image) {
    res.status(400);
    throw new Error("Please add a image url field");
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a description field");
  }

  const post = await Post.create({
    image: req.body.image,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the post user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPostsByUserId,
  getMyPosts,
  createPost,
  updatePost,
  deletePost,
};
