# ShopHub - Next.js E-commerce Application

A full-stack e-commerce application with authentication, product management, and modern UI.

🌐 **Live Site:** https://shop-up-neon.vercel.app/

## Setup & Installation

### 1. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 2. Environment Variables

Create `.env.local`:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_uri
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Run Application
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
npm run dev
```

Visit `http://localhost:3000`

## Routes

### Frontend Routes
- `/` - Landing page redirect
- `/home` - Home page with featured products
- `/about` - About page
- `/products` - All products with search/filter
- `/products/:id` - Product details
- `/add-product` - Add new product (protected)
- `/manage-products` - Manage products (protected)
- `/login` - Login page
- `/register` - Register page

### API Routes
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
