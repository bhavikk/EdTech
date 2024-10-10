// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item._id} className="border p-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className="bg-blue-500 text-white px-4 py-2 mt-4"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
