const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

// @desc    Get comments of a post
// @route   GET /api/comments
// @access  Private
const getCommentsOfPost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const comments = await Comment.find({ post: id });
  res.status(200).json(comments);
});

// @desc    Set comment
// @route   POST /api/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  if (!req.body.post) {
    res.status(400);
    throw new Error("Please add post field");
  }

  const post = await Comment.create({
    text: req.body.text,
    post: req.body.post,
    user: req.user.id,
  });

  res.status(200).json(post);
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the comment user
  if (comment.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedComment);
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
  getCommentsOfPost,
  createComment,
  updateComment,
  deletePost,
};
