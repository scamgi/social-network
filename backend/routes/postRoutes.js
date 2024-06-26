const express = require("express");
const router = express.Router();
const {
  getPostsByUserId,
  createPost,
  getMyPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:id", protect, getPostsByUserId);
router.get("/", protect, getMyPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;
