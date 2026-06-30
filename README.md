# L'essence - Full Stack MERN Perfume E-Commerce

A modern full-stack e-commerce platform built for showcasing and selling perfumes. This project was developed as a personal hobby and portfolio project to demonstrate full-stack web development skills using the MERN stack.

> **Note:** This is a portfolio project created for learning and demonstration purposes only. It is not a commercial business.

---

## 🚢 Deployment

The application is deployed on **Render** using a monorepo setup.

The Express server serves the React production build, allowing both frontend and backend to be deployed as a single service.

Since project is hosted on **Render's free tier**, the free services automatically spin down after periods of inactivity, the application may take approximately **10–15 seconds** to wake up and fully initialize on the first request.

---

## 🌐 Live Demo

🔗 **Live Website:** https://l-essence-fullstack.onrender.com

---

## 📖 Overview

L'essence is a feature-rich e-commerce application that provides a complete online shopping experience for perfumes. The application includes secure authentication, role-based authorization, product management, cart and wishlist functionality, order processing, payment integration, and an admin dashboard.

The application follows a **monorepo architecture**, where the Express server serves the React production build, simplifying deployment and maintenance.

---

## ✨ Features

### Customer Features

* User Registration & Login
* JWT + Cookie Based Authentication
* Forgot Password & Reset Password
* Refresh Token Mechanism
* Secure Logout
* Browse All Perfumes
* Search, Filter & Sort Products
* Wishlist Management
* Shopping Cart Management
* Coupon Application
* Address Management
* Order Placement
* Order History
* Fully Responsive UI

### Admin Features

* Secure Admin Dashboard
* Role-Based Access Control
* Add New Perfumes
* Update Existing Perfumes
* Delete Perfumes

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* React Hook Form
* Axios
* Axios Interceptors
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* HTTP Only Cookies
* Role-Based Authorization
* Protected Routes
* Refresh Tokens

### External Services

* Cloudinary (Image Storage & Management)
* Mailtrap + Nodemailer (Development Email Service)
* Cashfree Sandbox (Payment Gateway Simulation)
* Render (Deployment)

---

## 🏗️ Architecture

The project is currently maintained as a **monorepo** containing both the React frontend and Express backend.

```bash
L'essence-fullstack/
├── client/      # React frontend
├── server/      # Express backend
├── package.json # Backend dependencies + production scripts
└── README.md
```

---

## 🔑 Key Implementations

* RESTful API Design
* Custom React Hooks
* Centralized API Handling using Axios
* Axios Interceptors for seamless authentication flow
* Redux State Management
* Reusable Components
* Secure Cookie Management
* Global Error Handling Middleware
* Cloud-Based Image Upload & Optimization
* Responsive UI Design

---

## 🚀 Development Journey

This project was initially developed using **separate frontend and backend repositories**.

After learning deployment strategies and production best practices, the application was refactored into a **monorepo architecture**, where the Express server serves the React production build.

The original repositories containing the early development history and feature implementations can be found below:

* **Frontend Repository (Initial Development):** https://github.com/Krut-Aghera/l-essence-frontend
* **Backend Repository (Initial Development):** https://github.com/Krut-Aghera/l-essence-backend

These repositories preserve the complete commit history from the early stages of development before migrating to the current monorepo architecture.

---

## 👨‍💻 Author

**Krut Aghera**

BCA Final Year Student, Amity Online | Aspiring Full Stack Developer

GitHub: https://github.com/Krut-Aghera

---

Thank you for your patience.