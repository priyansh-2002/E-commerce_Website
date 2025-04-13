require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("../routes/auth-routes"); // Moved from original

const app = express();

// Database connection - Auth DB
mongoose.connect(process.env.AUTH_DB_URI || 'mongodb://localhost:27017/auth-service')
  .then(() => console.log('Auth DB connected'))
  .catch(error => console.log('Auth DB connection error:', error));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5171",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRouter);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'Auth Service Healthy' }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));