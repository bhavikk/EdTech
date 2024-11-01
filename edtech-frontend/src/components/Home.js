// src/components/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom';

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products
    axios.get('http://localhost:5000/products').then((res) => {
      setProducts(res.data);
    });
  }, []);


  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item._id === product._id);

    // If the product is not already in the cart, add it
    if (!productInCart) {
      setCart([...cart, product]);
      // Show success toast notification
      toast.success(`${product.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Optional: Show error toast if product is already in the cart
      toast.error(`${product.name} is already in the cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleBuyNow = (product) => {
    setCart([product]);
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to EdTech</h2>
        <p>Explore our top courses and enhance your learning journey with personalized recommendations from our AI agent.</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
