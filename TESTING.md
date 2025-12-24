# Testing Guide - Shoppy E-Commerce

## Quick Test Checklist

### ✅ Backend API Testing

#### 1. Server Health Check
```bash
cd server
npm start
# Should see: "Server is now running on port 5001"
# Should see: "MongoDB connected" (if DB is accessible)
```

#### 2. Test Authentication Endpoints

**Register User**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected Response:
```json
{
  "success": true,
  "message": "Registration successful"
}
```

**Login User**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected Response:
```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "role": "user",
    "userName": "testuser"
  }
}
```

**Check Auth**
```bash
curl -X GET http://localhost:5001/api/auth/check-auth \
  -b cookies.txt
```

#### 3. Test Product Endpoints

**Get All Products**
```bash
curl -X GET http://localhost:5001/api/admin/products/get
```

**Add Product (Admin)**
```bash
curl -X POST http://localhost:5001/api/admin/products/add \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "description": "Test Description",
    "category": "men",
    "brand": "nike",
    "price": 100,
    "salePrice": 80,
    "totalStock": 50,
    "image": "https://example.com/image.jpg"
  }'
```

#### 4. Test Shop Endpoints

**Get Filtered Products**
```bash
curl -X GET "http://localhost:5001/api/shop/products/get?category=men&sortBy=price-lowtohigh"
```

**Search Products**
```bash
curl -X GET http://localhost:5001/api/shop/search/nike
```

#### 5. Test Cart Endpoints

**Add to Cart**
```bash
curl -X POST http://localhost:5001/api/shop/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "productId": "PRODUCT_ID_HERE",
    "quantity": 1
  }'
```

**Get Cart**
```bash
curl -X GET http://localhost:5001/api/shop/cart/get/USER_ID_HERE
```

### ✅ Frontend Testing

#### 1. Development Server
```bash
cd client
npm run dev
# Should see: "Local: http://localhost:5173"
```

#### 2. Build Test
```bash
cd client
npm run build
# Should complete without errors
# Should create dist/ folder
```

#### 3. Manual UI Testing

**Authentication Flow:**
1. Open http://localhost:5173
2. Navigate to register page
3. Create new account
4. Login with credentials
5. Verify redirect to shopping page

**Shopping Flow:**
1. Browse products
2. Use filters and search
3. Click product for details
4. Add to cart
5. Update quantity
6. Remove from cart

**Checkout Flow:**
1. Add items to cart
2. Click checkout
3. Add/select address
4. Proceed to payment
5. Complete PayPal payment

**Admin Flow:**
1. Login as admin user
2. Navigate to admin dashboard
3. Add new product
4. Upload image
5. Edit product
6. View orders
7. Update order status

### ✅ Database Testing

#### Using MongoDB Compass

1. Connect to your MongoDB instance
2. Select `ecommerce` database
3. Verify collections:
   - users
   - products
   - carts
   - orders
   - addresses
   - productreviews
   - features

#### Using MongoDB Shell

```bash
mongosh "YOUR_MONGO_URI"

# List all databases
show dbs

# Use ecommerce database
use ecommerce

# List collections
show collections

# Count documents
db.users.countDocuments()
db.products.countDocuments()
db.orders.countDocuments()

# Find documents
db.users.find().pretty()
db.products.find({category: "men"}).pretty()
```

### ✅ Integration Testing

#### Full User Journey Test

1. **Setup**
   - Clear browser cookies
   - Start both server and client
   - Have admin account ready

2. **User Registration & Login**
   - [ ] Register new user
   - [ ] Verify email uniqueness validation
   - [ ] Login with correct credentials
   - [ ] Verify authentication token

3. **Product Browsing**
   - [ ] View all products
   - [ ] Filter by category
   - [ ] Filter by brand
   - [ ] Sort by price
   - [ ] Search for products
   - [ ] View product details

4. **Shopping Cart**
   - [ ] Add product to cart
   - [ ] Update quantity
   - [ ] Remove from cart
   - [ ] Cart persists after logout/login

5. **Checkout**
   - [ ] Add delivery address
   - [ ] Select address
   - [ ] Proceed to payment
   - [ ] Complete PayPal payment (sandbox)
   - [ ] Verify order created

6. **Order Management**
   - [ ] View order history
   - [ ] View order details
   - [ ] Write product review (after purchase)

7. **Admin Functions**
   - [ ] Login as admin
   - [ ] Add new product
   - [ ] Upload product image
   - [ ] Edit product
   - [ ] Delete product
   - [ ] View all orders
   - [ ] Update order status
   - [ ] Add feature banner

### ✅ Error Handling Testing

#### Test Error Cases

**Invalid Login**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpassword"
  }'
```

Expected: `{ "success": false, "message": "User doesn't exists!" }`

**Duplicate Email Registration**
```bash
# Register same email twice
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser2",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected: `{ "success": false, "message": "User Already exists..." }`

**Invalid Product ID**
```bash
curl -X GET http://localhost:5001/api/shop/products/get/invalid-id
```

Expected: 400 or 404 error

**Unauthorized Access**
```bash
# Try to access protected route without token
curl -X GET http://localhost:5001/api/auth/check-auth
```

Expected: `{ "success": false, "message": "Unauthorised user!" }`

### ✅ Performance Testing

#### Load Testing (with Apache Bench)

```bash
# Test product listing endpoint
ab -n 1000 -c 10 http://localhost:5001/api/shop/products/get

# Test search endpoint
ab -n 500 -c 5 http://localhost:5001/api/shop/search/test
```

#### Response Time Monitoring

```javascript
// Add to server.js for development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

### ✅ Security Testing

#### Test Security Headers

```bash
curl -I http://localhost:5001/api/shop/products/get
```

Verify:
- CORS headers present
- No sensitive information in headers

#### Test Cookie Security

```bash
curl -v -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Verify:
- Set-Cookie header present
- HttpOnly flag set
- Secure flag (in production)

#### Test SQL Injection Prevention

```bash
curl -X GET "http://localhost:5001/api/shop/search/test'; DROP TABLE products; --"
```

Should handle safely without errors.

### ✅ Environment Testing

#### Development Environment
```bash
# .env settings
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/ecommerce
```

#### Production Environment
```bash
# .env settings
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://... (Atlas)
CLIENT_URL=https://your-frontend.com
```

### 🔧 Testing Tools

#### Recommended Tools

1. **Postman/Insomnia** - API testing
2. **MongoDB Compass** - Database GUI
3. **React DevTools** - React debugging
4. **Redux DevTools** - State debugging
5. **Chrome DevTools** - Network/Console
6. **Jest** - Unit testing (future)
7. **Cypress** - E2E testing (future)

### 📝 Test Data

#### Sample Admin User
```json
{
  "userName": "admin",
  "email": "admin@shoppy.com",
  "password": "admin123",
  "role": "admin"
}
```

#### Sample Product
```json
{
  "title": "Nike Air Max",
  "description": "Comfortable running shoes",
  "category": "men",
  "brand": "nike",
  "price": 150,
  "salePrice": 120,
  "totalStock": 100,
  "image": "https://via.placeholder.com/400"
}
```

#### Sample Address
```json
{
  "address": "123 Main St",
  "city": "New York",
  "pincode": "10001",
  "phone": "1234567890",
  "notes": "Leave at door"
}
```

### 🐛 Common Issues & Solutions

#### Issue: MongoDB Connection Failed
**Solution**: 
- Check MONGO_URI in .env
- Verify network connectivity
- Check MongoDB Atlas IP whitelist

#### Issue: CORS Error in Browser
**Solution**:
- Verify CLIENT_URL in .env
- Check CORS configuration in server.js
- Clear browser cache

#### Issue: Cookie Not Set
**Solution**:
- Check cookie-parser middleware
- Verify credentials: true in CORS
- Check browser cookie settings

#### Issue: Image Upload Failed
**Solution**:
- Verify Cloudinary credentials
- Check file size limits
- Check network connectivity

### ✅ Test Coverage Goals

- [ ] All API endpoints tested
- [ ] All user flows tested
- [ ] Error cases covered
- [ ] Security measures verified
- [ ] Performance benchmarked
- [ ] Database operations verified
- [ ] Frontend components tested
- [ ] Integration flows completed

### 📊 Test Results Template

```markdown
## Test Results - [Date]

### Environment
- Node Version: 
- MongoDB Version:
- Browser:

### Backend Tests
- [ ] Server starts: ✓/✗
- [ ] Auth endpoints: ✓/✗
- [ ] Product endpoints: ✓/✗
- [ ] Cart endpoints: ✓/✗
- [ ] Order endpoints: ✓/✗

### Frontend Tests
- [ ] Build successful: ✓/✗
- [ ] Dev server runs: ✓/✗
- [ ] UI renders: ✓/✗
- [ ] Navigation works: ✓/✗

### Integration Tests
- [ ] Full user journey: ✓/✗
- [ ] Admin functions: ✓/✗
- [ ] Payment flow: ✓/✗

### Issues Found
1. [Issue description]
2. [Issue description]

### Notes
[Any additional observations]
```

## 🎯 Continuous Testing

### Before Each Commit
```bash
# Run syntax checks
npm run lint

# Run unit tests
npm test

# Build client
cd client && npm run build
```

### Before Deployment
- [ ] All tests passing
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Documentation updated

---

Happy Testing! 🚀
