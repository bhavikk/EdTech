// src/components/Checkout.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, setCart }) {
  const [name, setName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!name || !shippingAddress || !billingAddress || !cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all the fields');
      return;
    }

    // Prepare order data
    const orderData = {
      products: cart.map(item => ({
        product: item._id || item.id,
        quantity: 1, // Assuming quantity 1 for simplicity
      })),
      shippingAddress,
      billingAddress,
      paymentDetails: `Card ending in ${cardNumber.slice(-4)}`,
      totalAmount,
    };

    axios
      .post('http://localhost:5000/orders/place', orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        setCart([]); // Clear the cart after checkout
        alert(`Thank you for your purchase! Your order number is: ${res.data.orderNumber}`);
        navigate('/'); // Navigate back to home after purchase
      })
      .catch((err) => {
        console.error('Failed to place order', err);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add some products before proceeding to checkout.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="border-b pb-4 mb-4">
                <h3 className="font-bold">{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            ))}
            <h3 className="text-lg font-bold">Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>

          <div className="border p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={e => setShippingAddress(e.target.value)}
            />

            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Billing Address"
              value={billingAddress}
              onChange={e => setBillingAddress(e.target.value)}
            />

            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-2 mb-4"
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
              />
              <input
                className="border p-2 mb-4"
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
              onClick={handleCheckout}
            >
              Complete Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
