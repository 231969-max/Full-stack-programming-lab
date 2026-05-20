const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/newsController");

// Supports both:
// GET /api/news?country=us
// GET /api/news/us
router.get("/", auth(), controller.getTopHeadlines);
router.get("/:country", auth(), controller.getTopHeadlines);

module.exports = router;
