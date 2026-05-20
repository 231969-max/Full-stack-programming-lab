const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/weatherController");

// Supports both:
// GET /api/weather?city=London
// GET /api/weather/London
router.get("/", auth(), controller.getWeatherByCity);
router.get("/:city", auth(), controller.getWeatherByCity);

module.exports = router;
