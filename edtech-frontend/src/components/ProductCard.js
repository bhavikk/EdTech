// src/components/ProductCard.js
import React from 'react';

function ProductCard({ product, handleAddToCart, handleBuyNow }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={`http://localhost:5000${product.image}`}  // Access the image from the backend
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-yellow-500 mb-2">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
        </p>
        <p className="text-green-600 font-bold mb-2">${product.price}</p>
        <div className="flex space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={() => handleBuyNow(product)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
