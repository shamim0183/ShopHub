# ShopHub - Next.js E-commerce Application

A modern, full-stack e-commerce application built with Next.js, featuring authentication, product management, and a beautiful UI powered by DaisyUI.

## 🚀 Features

- **Authentication**
  - Google OAuth integration
  - Email/Password authentication with NextAuth.js
  - Protected routes and session management

- **Product Management**
  - Browse products with search and category filters
  - Add, edit, and delete products
  - Product details with image gallery
  - Stock management

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - DaisyUI components for consistent theming
  - Light/Dark mode toggle
  - Smooth animations and transitions
  - Mobile-friendly interface

- **Backend API**
  - Express.js REST API
  - MongoDB database with Mongoose
  - JWT authentication
  - Image upload support

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** NextAuth.js
- **State Management:** React Hooks
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Carousel:** Swiper.js
- **Alerts:** SweetAlert2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **File Upload:** Multer
- **Validation:** express-validator

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Google OAuth credentials (optional)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd next
```

### 2. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Environment Setup

Create `.env.local` in the root directory:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Image Upload (Optional)
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
```

Create `backend/.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=your-mongodb-connection-string

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd backend
npm start
```

**Start Frontend (in a new terminal):**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
next/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── add-product/       # Add product page
│   ├── manage-products/   # Manage products page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── layout.js          # Root layout
├── components/            # React components
│   ├── layout/           # Layout components (Navbar, Footer)
│   └── products/         # Product components
├── backend/              # Express.js backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
└── public/              # Static assets
```

## 🔑 Key Features Explained

### Authentication Flow
1. Users can register with email/password or Google OAuth
2. NextAuth.js handles session management
3. Protected routes redirect unauthenticated users to login
4. JWT tokens secure backend API requests

### Product Management
1. Authenticated users can add products with images
2. Products support categories, pricing, and stock levels
3. Search and filter functionality for easy browsing
4. Admin users can edit and delete products

### Theme System
- DaisyUI provides light and dark themes
- Theme preference saved in localStorage
- Smooth transitions between themes
- Consistent color palette across the app

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Render)
1. Push backend code to GitHub
2. Create new service on Railway/Render
3. Add environment variables
4. Deploy

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Next.js and modern web technologies.
