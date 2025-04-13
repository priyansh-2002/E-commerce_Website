require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminOrderRouter = require("../routes/admin-order-routes"); // Moved from original
const shopOrderRouter = require("../routes/shop-order-routes"); // Moved from original
const shopCartRouter = require("../routes/shop-cart-routes"); // Moved from original
const shopAddressRouter = require("../routes/shop-address-routes"); // Moved from original

const app = express();

// Database connection - Orders DB
mongoose.connect(process.env.ORDERS_DB_URI || 'mongodb://localhost:27017/orders-service')
  .then(() => console.log('Orders DB connected'))
  .catch(error => console.log('Orders DB connection error:', error));

// Middleware
app.use(
  cors({
    origin: "http://localhost:5171",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Order Routes
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'Orders Service Healthy' }));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Orders Service running on port ${PORT}`));