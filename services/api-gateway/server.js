require('dotenv').config();
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
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

// Proxy Middleware
app.use('/api/auth', createProxyMiddleware({ 
  target: 'http://localhost:5001',
  changeOrigin: true
}));

app.use('/api/products', createProxyMiddleware({ 
  target: 'http://localhost:5002',
  changeOrigin: true
}));

app.use('/api/orders', createProxyMiddleware({ 
  target: 'http://localhost:5003',
  changeOrigin: true
}));

// Health check
app.get('/health', (req, res) => res.status(200).json({ 
  status: 'API Gateway Healthy',
  services: {
    auth: 'http://localhost:5001/health',
    products: 'http://localhost:5002/health',
    orders: 'http://localhost:5003/health'
  }
}));

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));