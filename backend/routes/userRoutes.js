const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

// 🚀 Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// 🚀 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Email and password required" });

    const user = await userSchema.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Set email cookie (HTTP Only, 1-day expiry)
    res.cookie("username", user.username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production", // secure flag in production
      sameSite: "lax",
    });

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// 🚀 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("username", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ msg: "Logged out and cookie cleared" });
});

// 🚀 Get All Users
router.get("/userlist", async (_req, res) => {
  try {
    const users = await userSchema.find().select('_id username email');
    res.status(200).json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// 🚀 Update User
router.put("/update/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    const updates = { username };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userSchema.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// 🚀 Delete User
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await userSchema.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;
