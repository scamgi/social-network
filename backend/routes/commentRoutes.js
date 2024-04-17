const express = require("express");
const router = express.Router();
const {
  getCommentsOfPost,
  createComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.get("/:id", protect, getCommentsOfPost);
router.post("/", protect, createComment);

module.exports = router;
