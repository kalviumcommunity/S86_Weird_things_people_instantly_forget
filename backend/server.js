const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware to parse incoming JSON
app.use(express.json());

// Route Setup
const itemRoutes = require("./routes");
app.use("/api", itemRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Health Check Route
app.get("/ping", (req, res) => {
  res.json({ message: "Pong! Server is running." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
