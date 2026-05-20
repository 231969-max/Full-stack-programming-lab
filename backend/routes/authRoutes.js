const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

/* REGISTER USER */
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            role: role || "user"
        });

        // Hide password in response
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({
            message: "User registered successfully",
            user: userObj
        });
    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
});

/* LOGIN USER */
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }
        
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h" // Extended from 15m for convenient manual test/reviewing!
            }
        );
        
        res.json({
            accessToken: token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
});

/* GET ALL USERS (ADMIN ONLY) */
router.get("/users", auth("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error retrieving users", error: error.message });
    }
});

module.exports = router;
