
# ALN SHOP Backend API

Express.js backend for ALN SHOP e-commerce application with MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your MongoDB connection string:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aln_shop
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

3. Start MongoDB service

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Products
- GET `/api/products` - Get all products (with filters, search, pagination)
- GET `/api/products/:id` - Get single product
- GET `/api/products/featured/list` - Get featured products

### Categories
- GET `/api/categories` - Get all categories
- GET `/api/categories/:slug` - Get single category

### Brands
- GET `/api/brands` - Get all brands
- GET `/api/brands/:slug` - Get single brand

### Orders
- POST `/api/orders` - Create order (protected)
- GET `/api/orders/:id` - Get order by ID (protected)
- GET `/api/orders/user/myorders` - Get user orders (protected)

### Users
- GET `/api/users/profile` - Get user profile (protected)
- PUT `/api/users/profile` - Update user profile (protected)

### Admin
- GET `/api/admin/stats` - Get dashboard stats (admin)
- GET `/api/admin/orders` - Get all orders (admin)
- PUT `/api/admin/orders/:id/status` - Update order status (admin)
- POST `/api/admin/products` - Create product (admin)
- PUT `/api/admin/products/:id` - Update product (admin)
- DELETE `/api/admin/products/:id` - Delete product (admin)

## Seeder Data

The seeder includes:
- 2 users (admin and regular user)
- 4 categories (Hats, T-Shirts, Sunglasses, Accessories)
- 5 brands
- 6 sample products

## Demo Credentials

- Admin: admin@demo.com / admin123
- User: user@demo.com / password123
