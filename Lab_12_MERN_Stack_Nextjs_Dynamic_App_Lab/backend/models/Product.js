const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet." },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true }, // 'beds', 'chairs', 'tables', 'cabinets', 'bookcases', 'boxes'
  type: { type: String, default: 'regular' } // 'featured', 'special', 'popular'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
