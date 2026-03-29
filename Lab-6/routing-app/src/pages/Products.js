import React, { useState } from 'react';

const productsData = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and crystal clear audio.',
    price: '$149.99',
    emoji: '🎧',
    bg: 'linear-gradient(135deg, #312e81, #4338ca)',
  },
  {
    id: 2,
    title: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and stay connected with this sleek smartwatch.',
    price: '$299.99',
    emoji: '⌚',
    bg: 'linear-gradient(135deg, #1e3a5f, #0ea5e9)',
  },
  {
    id: 3,
    title: 'Laptop Stand',
    description: 'Ergonomic adjustable laptop stand made from premium aluminum for better posture.',
    price: '$79.99',
    emoji: '💻',
    bg: 'linear-gradient(135deg, #064e3b, #10b981)',
  },
  {
    id: 4,
    title: 'Mechanical Keyboard',
    description: 'Compact 75% mechanical keyboard with RGB backlighting and hot-swappable switches.',
    price: '$129.99',
    emoji: '⌨️',
    bg: 'linear-gradient(135deg, #581c87, #a855f7)',
  },
  {
    id: 5,
    title: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery support.',
    price: '$49.99',
    emoji: '🔌',
    bg: 'linear-gradient(135deg, #7c2d12, #f97316)',
  },
  {
    id: 6,
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and multi-device connectivity.',
    price: '$59.99',
    emoji: '🖱️',
    bg: 'linear-gradient(135deg, #1e1b4b, #6366f1)',
  },
];

function Products() {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-desc">
          Browse our collection of premium tech products. 
          {cart.length > 0 && ` (${cart.length} item${cart.length > 1 ? 's' : ''} in cart)`}
        </p>
      </div>

      <div className="products-grid">
        {productsData.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image" style={{ background: product.bg }}>
              {product.emoji}
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="product-price">{product.price}</div>
              <button
                className={`btn-cart ${cart.includes(product.id) ? 'added' : ''}`}
                onClick={() => addToCart(product.id)}
              >
                {cart.includes(product.id) ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
