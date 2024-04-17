const express = require("express");
const router = express.Router();
const {
  getPostsByUserId,
  createPost,
  getMyPosts,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

router.get("/:id", protect, getPostsByUserId);
router.get("/", protect, getMyPosts);
router.post("/", protect, createPost);

module.exports = router;
