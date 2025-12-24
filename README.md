# Shoppy - Full Stack E-Commerce Application

A complete MERN stack e-commerce platform with authentication, product management, shopping cart, and payment integration.

## 🚀 Features

### User Features
- ✅ User Registration & Login with JWT Authentication
- ✅ Browse Products with Filtering & Sorting
- ✅ Product Search Functionality
- ✅ Product Details with Reviews
- ✅ Shopping Cart Management
- ✅ Multiple Address Management
- ✅ PayPal Payment Integration
- ✅ Order History & Tracking
- ✅ Product Reviews (Purchase Required)

### Admin Features
- ✅ Product CRUD Operations
- ✅ Image Upload (Cloudinary)
- ✅ Order Management
- ✅ Order Status Updates
- ✅ Feature Banner Management

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit (State Management)
- React Router v6
- TailwindCSS
- shadcn/ui (Radix UI Components)
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- PayPal REST SDK
- Cloudinary (Image Storage)
- bcryptjs (Password Hashing)

## 📁 Project Structure

```
shoppy/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable UI Components
│   │   ├── pages/         # Page Components
│   │   ├── store/         # Redux Store & Slices
│   │   └── config/        # Configuration Files
│   └── package.json
├── server/                 # Express Backend
│   ├── controllers/       # Request Handlers
│   ├── models/           # Mongoose Models
│   ├── routes/           # API Routes
│   ├── helpers/          # Utility Functions
│   ├── middleware/       # Custom Middleware
│   └── server.js         # Entry Point
├── services/             # Microservices (Optional)
└── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account
- PayPal Developer Account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd shoppy
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5001

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Client URL
CLIENT_URL=http://localhost:5173
```

### 4. Run the Application

```bash
# Run Backend (from server directory)
cd server
npm start

# Run Frontend (from client directory, in new terminal)
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5001

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-auth` - Check authentication status

### Admin - Products
- `GET /api/admin/products/get` - Get all products
- `POST /api/admin/products/add` - Add new product
- `PUT /api/admin/products/edit/:id` - Update product
- `DELETE /api/admin/products/delete/:id` - Delete product
- `POST /api/admin/products/upload-image` - Upload product image

### Admin - Orders
- `GET /api/admin/orders/get` - Get all orders
- `GET /api/admin/orders/details/:id` - Get order details
- `PUT /api/admin/orders/update/:id` - Update order status

### Shop - Products
- `GET /api/shop/products/get` - Get filtered products
- `GET /api/shop/products/get/:id` - Get product details

### Shop - Cart
- `POST /api/shop/cart/add` - Add to cart
- `GET /api/shop/cart/get/:userId` - Get cart items
- `PUT /api/shop/cart/update-cart` - Update cart item quantity
- `DELETE /api/shop/cart/:userId/:productId` - Remove from cart

### Shop - Address
- `POST /api/shop/address/add` - Add address
- `GET /api/shop/address/get/:userId` - Get all addresses
- `PUT /api/shop/address/update/:userId/:addressId` - Update address
- `DELETE /api/shop/address/delete/:userId/:addressId` - Delete address

### Shop - Orders
- `POST /api/shop/order/create` - Create order
- `POST /api/shop/order/capture` - Capture payment
- `GET /api/shop/order/list/:userId` - Get user orders
- `GET /api/shop/order/details/:id` - Get order details

### Shop - Reviews
- `POST /api/shop/review/add` - Add product review
- `GET /api/shop/review/:productId` - Get product reviews

### Shop - Search
- `GET /api/shop/search/:keyword` - Search products

### Common - Features
- `POST /api/common/feature/add` - Add feature image
- `GET /api/common/feature/get` - Get feature images

## 🔐 Security Features

- JWT Token-based Authentication
- HTTP-only Cookies
- Password Hashing with bcrypt
- Environment Variables for Secrets
- CORS Configuration
- Input Validation
- Centralized Error Handling

## 🎨 Frontend Features

- Responsive Design
- Loading States & Skeletons
- Toast Notifications
- Form Validation
- Protected Routes
- Role-based Access Control
- Optimistic UI Updates

## 📦 Database Models

### User
- userName, email, password, role

### Product
- image, title, description, category, brand, price, salePrice, totalStock, averageReview

### Cart
- userId, items (productId, quantity)

### Order
- userId, cartId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, paymentId, payerId

### Address
- userId, address, city, pincode, phone, notes

### Review
- productId, userId, userName, reviewMessage, reviewValue

### Feature
- image

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set all environment variables
2. Update CORS origin to production URL
3. Deploy using Git

### Frontend Deployment (Vercel/Netlify)
1. Update API base URL in config
2. Build: `npm run build`
3. Deploy the `dist` folder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a full-stack e-commerce demonstration project.

## 🐛 Known Issues

- PayPal configuration uses sandbox mode (update for production)
- Review system requires purchase verification
- Stock management is basic (no reservation system)

## 🔮 Future Enhancements

- [ ] Stripe Payment Integration
- [ ] Email Notifications
- [ ] Order Tracking
- [ ] Wishlist Feature
- [ ] Product Recommendations
- [ ] Advanced Analytics Dashboard
- [ ] Multi-language Support
- [ ] Social Authentication

## 📞 Support

For issues and questions, please open an issue in the repository.
