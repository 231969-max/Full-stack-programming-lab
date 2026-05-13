const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rustikplank';

const products = [
  // FEATURED
  { title: "Wooden Chair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop", category: "chairs", type: "featured" },
  { title: "Modern Bed", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&h=500&fit=crop", category: "beds", type: "featured" },
  { title: "Glass Table", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500&h=500&fit=crop", category: "tables", type: "featured" },
  
  // SPECIAL
  { title: "Lounge Chair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop", category: "chairs", type: "special" },
  { title: "Classic Bed", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=500&fit=crop", category: "beds", type: "special" },
  { title: "Coffee Table", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500&h=500&fit=crop", category: "tables", type: "special" },
  
  // POPULAR
  { title: "Armchair", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop", category: "chairs", type: "popular" },
  { title: "Bunk Bed", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop", category: "beds", type: "popular" },
  { title: "Dining Table", price: 124.99, imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=500&h=500&fit=crop", category: "tables", type: "popular" }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await Product.deleteMany({});
    console.log('Cleared existing products');
    await Product.insertMany(products);
    console.log('Dummy products inserted');
    process.exit();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
