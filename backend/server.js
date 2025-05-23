const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const entityRoutes = require('./routes/sqlEntities');
const { authenticateDatabase } = require('./sqlConfig/mysql');

require('./models/sqlAssociations');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true
}));

// SQL Connection
authenticateDatabase();


// Middleware to parse incoming JSON
app.use(express.json());
app.use(cookieParser());

// Route Setup
app.use(bodyParser.json()); 
const itemRoutes = require("./routes/routes");
const userRoutes = require('./routes/userRoutes');
app.use("/api", itemRoutes);
app.use("/users", userRoutes);

app.use("/sql", entityRoutes);

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