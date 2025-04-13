require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminProductsRouter = require("../routes/admin-products-routes"); // Moved from original
const shopProductsRouter = require("../routes/shop-products-routes"); // Moved from original
const shopSearchRouter = require("../routes/shop-search-routes"); // Moved from original
const shopReviewRouter = require("../routes/shop-review-routes"); // Moved from original

const app = express();

// Database connection - Products DB
mongoose.connect(process.env.PRODUCTS_DB_URI || 'mongodb://localhost:27017/products-service')
  .then(() => console.log('Products DB connected'))
  .catch(error => console.log('Products DB connection error:', error));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5171",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Product Routes
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'Products Service Healthy' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Products Service running on port ${PORT}`));