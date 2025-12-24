# Development Guide - Shoppy E-Commerce

## 📋 Table of Contents
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

## 🚀 Getting Started

### Quick Start
```bash
# Clone and install
git clone <repo-url>
cd shoppy
npm run install-all

# Setup environment variables
cp server/.env.example server/.env
# Edit server/.env with your credentials

# Run in development mode
npm run dev
```

### Individual Services
```bash
# Run only backend
npm run server

# Run only frontend
npm run client
```

## 🏗️ Project Architecture

### Monorepo Structure
```
shoppy/
├── client/          → React Frontend (Vite)
├── server/          → Express Backend
└── services/        → Microservices (Optional)
```

### Backend Architecture
```
server/
├── controllers/     → Business Logic
│   ├── auth/       → Authentication
│   ├── admin/      → Admin Operations
│   ├── shop/       → Shop Operations
│   └── common/     → Shared Operations
├── models/         → Mongoose Schemas
├── routes/         → API Routes
├── middleware/     → Custom Middleware
├── helpers/        → Utility Functions
└── server.js       → Entry Point
```

### Frontend Architecture
```
client/src/
├── components/     → Reusable Components
│   ├── ui/        → Base UI Components
│   ├── auth/      → Auth Components
│   ├── admin-view/→ Admin Components
│   └── shopping-view/ → Shop Components
├── pages/         → Route Pages
├── store/         → Redux Store
│   ├── auth-slice/
│   ├── admin/
│   ├── shop/
│   └── common-slice/
├── config/        → Configuration
└── lib/          → Utilities
```

## 🔧 Backend Development

### Adding a New Model
1. Create model file in `server/models/`
```javascript
const mongoose = require('mongoose');

const YourModelSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('YourModel', YourModelSchema);
```

### Adding a New Controller
1. Create controller in `server/controllers/[domain]/`
```javascript
const Model = require('../../models/Model');

const getItems = async (req, res) => {
  try {
    const items = await Model.find({});
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching items'
    });
  }
};

module.exports = { getItems };
```

### Adding New Routes
1. Create route file in `server/routes/[domain]/`
```javascript
const express = require('express');
const { getItems } = require('../../controllers/domain/controller');
const router = express.Router();

router.get('/get', getItems);

module.exports = router;
```

2. Register route in `server.js`
```javascript
const domainRouter = require('./routes/domain/routes');
app.use('/api/domain', domainRouter);
```

### Adding Middleware
```javascript
// server/middleware/your-middleware.js
const yourMiddleware = (req, res, next) => {
  // Your logic
  next();
};

module.exports = yourMiddleware;
```

### Environment Variables
Always use environment variables for sensitive data:
```javascript
// Good
const secret = process.env.JWT_SECRET;

// Bad
const secret = "hardcoded-secret";
```

## ⚛️ Frontend Development

### Adding a New Redux Slice
1. Create slice file in `client/src/store/[domain]/`
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk(
  'domain/fetchData',
  async () => {
    const response = await axios.get('/api/domain/data');
    return response.data;
  }
);

const slice = createSlice({
  name: 'domain',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      });
  }
});

export default slice.reducer;
```

2. Register in store
```javascript
// store/store.js
import domainReducer from './domain/slice';

const store = configureStore({
  reducer: {
    domain: domainReducer
  }
});
```

### Adding a New Page
1. Create page component in `client/src/pages/[view]/`
2. Add route in `App.jsx`

### Using UI Components
Components from shadcn/ui are in `client/src/components/ui/`
```javascript
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
```

### API Calls
Use axios with base URL from config:
```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

axios.post(`${API_URL}/api/endpoint`, data);
```

## 📊 Database Schema

### Relationships
- User → Cart (1:1)
- User → Orders (1:Many)
- User → Addresses (1:Many)
- User → Reviews (1:Many)
- Product → Reviews (1:Many)
- Product → Cart Items (Many:Many via Cart)
- Product → Order Items (Many:Many via Order)

### Indexes
Consider adding indexes for:
- User.email (unique)
- Product.category
- Product.brand
- Order.userId
- Review.productId

## 📡 API Documentation

### Response Format
All API responses follow this structure:
```javascript
// Success
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}

// Error
{
  "success": false,
  "message": "Error description"
}
```

### Authentication
Protected routes require JWT token in cookie:
```javascript
// Set on login
res.cookie('token', token, { httpOnly: true, secure: false });

// Checked by authMiddleware
const token = req.cookies.token;
```

### Error Handling
- 200: Success
- 201: Created
- 400: Bad Request / Validation Error
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### API Testing with Postman/Thunder Client
Import collection from `docs/api-collection.json` (if exists)

## 🚢 Deployment

### Pre-Deployment Checklist
- [ ] Update CORS origin to production URL
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB
- [ ] Update PayPal to live mode
- [ ] Enable secure cookies
- [ ] Add rate limiting
- [ ] Setup logging service
- [ ] Configure CDN for assets
- [ ] Setup monitoring

### Backend Deployment (Railway/Render)
```bash
# Build command: npm install
# Start command: npm start
# Environment variables: Copy from .env
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build command: npm run build
# Output directory: dist
# Environment variables:
VITE_API_URL=https://your-api.com
```

### Database Backup
```bash
# MongoDB Atlas has automatic backups
# Manual backup:
mongodump --uri="mongodb+srv://..."
```

## 🔐 Security Best Practices

1. **Never commit sensitive data**
   - Use .env files
   - Add .env to .gitignore

2. **Validate all inputs**
   - Sanitize user input
   - Use validation libraries

3. **Use HTTPS in production**
   - Set secure: true for cookies
   - Enable HSTS headers

4. **Rate limiting**
   - Implement rate limiting for APIs
   - Protect against brute force

5. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

## 📝 Code Style

### Backend
- Use async/await over promises
- Use ES6+ syntax
- Use meaningful variable names
- Add error handling to all routes
- Use try-catch in async functions

### Frontend
- Use functional components with hooks
- Use PropTypes or TypeScript
- Keep components small and focused
- Use proper naming conventions
- Implement loading states

## 🐛 Debugging

### Backend
```bash
# Enable debug mode
DEBUG=* node server.js

# Or use nodemon
npm run dev
```

### Frontend
- Use React DevTools
- Use Redux DevTools
- Check Network tab for API calls
- Use console.log strategically

## 📚 Resources

### Documentation
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Mongoose](https://mongoosejs.com/)
- [TailwindCSS](https://tailwindcss.com/)

### Tools
- Postman - API Testing
- MongoDB Compass - Database GUI
- VS Code Extensions:
  - ESLint
  - Prettier
  - Thunder Client
  - MongoDB for VS Code

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request
5. Wait for review

## 📞 Support

For development questions:
1. Check this guide
2. Check existing issues
3. Create new issue with details
