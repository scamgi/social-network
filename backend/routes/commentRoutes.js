const express = require("express");
const router = express.Router();
const {
  getCommentsOfPost,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:id", protect, getCommentsOfPost);
router.post("/", protect, createComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

module.exports = router;
