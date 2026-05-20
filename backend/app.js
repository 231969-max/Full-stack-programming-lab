const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

/* Middleware */
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

/* Database Connection */
connectDB();

/* Routes */
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

// Base route for connectivity tests
app.get("/", (req, res) => {
    res.json({ message: "Lab 13 RESTful API Server is operational!" });
});

module.exports = app;
