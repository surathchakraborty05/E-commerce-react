# 🛒 E-Commerce Website

A modern e-commerce web application built using React and Supabase.  
Users can browse products, add items to cart or wishlist, and manage their profile.

## 🚀 Features

- User Authentication (Sign up / Login)
- Browse Products
- Add to Cart
- Wishlist System
- Order History
- User Profile Dropdown
- Responsive Design
- Real-time Database using Supabase

## 🛠️ Tech Stack

Frontend:
- React
- Tailwind CSS
- JavaScript

Backend / Database:
- Supabase

Deployment:
- Vercel / Netlify

## 📂 Project Structure
src/
├── components/
| ├──AnimatedBackground
│ ├── ProductCard
│ ├── ProfileDropdown
├── hooks/
| ├──useScrollReveal.ts
├── lib/
| ├──supabase.ts
| ├──supabaseClient.js
│
├── pages/
│ ├── login
│ ├── Cart
│ ├── Wishlist
│ ├── OrderHistory
| ├── OrderDetails
| ├── OrderSummary
| ├── Profile
| ├── ProfileUpdate
| ├── Settings
| ├── SignUp
| ├── ProductDetails
| ├── Witchlist
│
├── Home.tsx
├── index.css
├── main.tsx
├── Router.tsx
├── styles.css
└── App.js