# 🌍 Bhraman Tours and Travels

A **production-ready Full Stack Tours & Travel Management System** built with the MERN Stack. This project demonstrates real-world web development skills including secure authentication, payment integration, advanced search, and cloud deployment.

---

## 🚀 Live Demo

| | URL |
|--|-----|
| 🌐 **Frontend** | [bhraman-tours.vercel.app](https://bhraman-tours.vercel.app) |
| ⚙️ **Backend API** | [bhraman-tours-api.onrender.com](https://bhraman-tours-api.onrender.com) |
| 💻 **GitHub** | [github.com/PrachiKS/Tours_and_Travel_Management](https://github.com/PrachiKS/Tours_and_Travel_Management) |

---

## 📌 Project Overview

Bhraman Tours and Travels is a complete travel booking platform where users can:
- Browse and search tour packages across India
- Book tours and make secure online payments
- Leave reviews and ratings
- Manage their bookings

Admins can:
- Manage all tours, users, and bookings
- View dashboard analytics and stats
- Monitor top-selling tours and revenue

---

## ✨ Key Features

### 🔐 Authentication & Security
- JWT-based login and registration with **refresh token** system
- Password hashing with **bcryptjs** (salt rounds: 12)
- Input validation using **express-validator**
- Password strength enforcement (uppercase, lowercase, number required)
- API **rate limiting** (10 auth attempts per 15 minutes)
- Security headers using **Helmet.js**
- Role-based access control (**Admin / User**)
- Logout with cookie clearing

### 🔍 Advanced Search & Filters
- Search tours by **city** (case-insensitive)
- Filter by **price range** (min/max)
- Filter by **group size** and **distance**
- Filter by **featured** tours
- **Sort** by price (low/high), distance, newest
- **Pagination** with total pages and count
- Get all unique **cities** and **price range** dynamically

### 📊 Admin Dashboard
- Total bookings, tours, users at a glance
- **Top 5 most booked** tours
- **Bookings by month** analytics
- Recent bookings list
- Delete bookings

### 💰 Razorpay Payment Integration
- Create Razorpay **payment orders** from backend
- **Signature verification** using HMAC SHA256
- Booking auto-created after **successful payment**
- Payment status tracking (pending / paid / failed)
- Test mode with dummy card support

### 🗺️ Tours Management
- Full CRUD for tours (Admin only)
- Featured tours listing
- Tour reviews with star ratings
- Total tour count API

### 👥 User Management
- User registration and login
- Profile update
- Admin can view all users
- User can view/delete their own bookings

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Bootstrap 5 | Responsive styling |
| Reactstrap | UI components |
| React Icons | Icons |
| Context API | State management |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Razorpay | Payment gateway |
| Helmet | Security headers |
| express-rate-limit | API rate limiting |
| express-validator | Input validation |
| cookie-parser | Cookie handling |
| cors | Cross-origin requests |

### DevOps & Deployment
| Tool | Purpose |
|------|---------|
| MongoDB Atlas | Cloud database |
| Render.com | Backend hosting |
| Vercel | Frontend hosting |
| GitHub | Version control |

---

## 📁 Project Structure

```
tour-management/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Login, register, logout
│   │   ├── tourController.js      # Tour CRUD + advanced search
│   │   ├── userController.js      # User management
│   │   ├── bookingController.js   # Booking + dashboard stats
│   │   ├── reviewController.js    # Reviews and ratings
│   │   └── paymentController.js   # Razorpay integration
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Tour.js                # Tour schema
│   │   ├── Booking.js             # Booking schema with payment fields
│   │   └── Review.js              # Review schema with ratings
│   ├── routes/
│   │   ├── auth.js                # Auth routes with rate limiting
│   │   ├── tours.js               # Tour routes
│   │   ├── users.js               # User routes
│   │   ├── bookings.js            # Booking routes
│   │   ├── reviews.js             # Review routes
│   │   └── payment.js             # Payment routes
│   ├── utils/
│   │   └── verifyToken.js         # JWT middleware
│   ├── seeds/
│   │   ├── seedTours.js           # Sample tour data
│   │   ├── seedUsers.js           # Sample user data
│   │   └── seedBookings.js        # Sample booking data
│   └── index.js                   # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/            # Reusable UI components
    │   ├── pages/                 # Page components
    │   ├── context/               # Auth context
    │   ├── hooks/                 # Custom hooks
    │   ├── assets/                # Images and media
    │   └── utils/                 # API config
    └── public/
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/auth/register` | Register new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| POST | `/api/v1/auth/logout` | Logout user | Public |

### Tour Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/v1/tours` | Get all tours | Public |
| GET | `/api/v1/tours/:id` | Get single tour | Public |
| GET | `/api/v1/tours/search/getTourBySearch` | Advanced search | Public |
| GET | `/api/v1/tours/search/getFeaturedTours` | Featured tours | Public |
| GET | `/api/v1/tours/search/getAllCities` | All cities | Public |
| GET | `/api/v1/tours/search/getPriceRange` | Price range | Public |
| POST | `/api/v1/tours` | Create tour | Admin |
| PUT | `/api/v1/tours/:id` | Update tour | Admin |
| DELETE | `/api/v1/tours/:id` | Delete tour | Admin |

### Booking Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/booking` | Create booking | User |
| GET | `/api/v1/booking/:id` | Get booking | User |
| GET | `/api/v1/booking` | Get all bookings | Admin |
| DELETE | `/api/v1/booking/:id` | Delete booking | Admin |
| GET | `/api/v1/booking/admin/dashboard` | Dashboard stats | Admin |

### Payment Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/v1/payment/create-order` | Create Razorpay order | User |
| POST | `/api/v1/payment/verify` | Verify payment | User |
| GET | `/api/v1/payment/:paymentId` | Get payment details | Admin |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Razorpay test account

### Backend Setup
```bash
# Clone the repo
git clone https://github.com/PrachiKS/Tours_and_Travel_Management.git

# Go to backend
cd tour-management/backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add to `.env`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET_KEY=your_jwt_secret
JWT_REFRESH_KEY=your_refresh_secret
NODE_ENV=development
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
```

```bash
# Seed the database
node seeds/seedTours.js
node seeds/seedUsers.js
node seeds/seedBookings.js

# Start backend
nodemon index.js
```

### Frontend Setup
```bash
# Go to frontend
cd ../frontend

# Install dependencies
npm install

# Start frontend
npm start
```

---

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | prachi@admin.com | Admin@1234 |
| User | rahul@gmail.com | Rahul@1234 |
| User | priya@gmail.com | Priya@1234 |

### Test Payment Card (Razorpay Test Mode)
| Field | Value |
|-------|-------|
| Card Number | 4111 1111 1111 1111 |
| Expiry | Any future date |
| CVV | Any 3 digits |

---

## 🔒 Security Features

- JWT tokens expire in **15 minutes** (short-lived)
- Refresh tokens expire in **7 days**
- Passwords hashed with **bcrypt salt rounds 12**
- Rate limiting: **10 auth attempts** per 15 minutes
- **Helmet.js** sets 11 security HTTP headers
- CORS configured for **specific origins only**
- Input sanitization on all auth routes


## 📄 License

This project is open source and available under the [MIT License](LICENSE).